import { useNavigate } from 'react-router-dom';
import { Lock, Zap, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { pricingPlans } from '../data/pricing';
import { useState } from 'react';
import { subscriptionAPI } from '../api';
import { useSubscription } from '../context/SubscriptionContext';
import toast from 'react-hot-toast';

// Load Paystack
function loadPaystack() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function PlanCard({ plan, yearly, onSelect }) {
  const { dark } = useTheme();
  const price = yearly ? plan.yearly : plan.monthly;

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative cursor-pointer rounded-2xl p-5 border transition-all hover:-translate-y-1
        ${plan.popular
          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
          : dark ? 'border-white/10 bg-white/[0.03] hover:border-white/20' : 'border-slate-200 bg-white hover:border-indigo-300 shadow-sm'
        }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white bg-indigo-600">
          Most Popular
        </span>
      )}
      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: plan.color }}>{plan.name}</p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className={`text-2xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>₦{price.toLocaleString()}</span>
        <span className="text-xs text-brand-muted">/{yearly ? 'yr' : 'mo'}</span>
      </div>
      <ul className="space-y-1.5">
        {plan.features.slice(0, 4).map((f, i) => (
          <li key={i} className="flex items-center gap-1.5 text-xs text-brand-muted">
            <CheckCircle size={11} style={{ color: plan.color }} className="flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
        style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` }}>
        Choose {plan.name}
      </button>
    </div>
  );
}

export default function TrialExpiredWall() {
  const { dark }   = useTheme();
  const { user }   = useAuth();
  const { fetchStatus } = useSubscription();
  const [yearly, setYearly]   = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    setLoading(true);
    try {
      await loadPaystack();
    } catch {
      toast.error('Could not load payment. Check your connection.');
      setLoading(false);
      return;
    }
    setLoading(false);

    const billing   = yearly ? 'yearly' : 'monthly';
    const price     = yearly ? plan.yearly : plan.monthly;
    const reference = `SUB-${plan.name.toUpperCase()}-${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email:    user.email,
      amount:   price * 100,
      currency: 'NGN',
      ref:      reference,
      metadata: {
        custom_fields: [
          { display_name: 'Plan',    variable_name: 'plan',    value: plan.name },
          { display_name: 'Billing', variable_name: 'billing', value: billing   },
        ],
      },
      callback: async (response) => {
        const toastId = toast.loading('Activating subscription...');
        try {
          await subscriptionAPI.activate({
            reference: response.reference,
            plan:      plan.name,
            billing,
          });
          toast.success('Subscription activated! Welcome aboard.', { id: toastId });
          await fetchStatus();   // refresh subscription state → wall disappears
        } catch (err) {
          toast.error(err?.response?.data?.message || 'Activation failed', { id: toastId });
        }
      },
      onClose: () => {},
    });

    handler.openIframe();
  };

  return (
    <div className={`fixed inset-0 z-[9990] flex flex-col items-center justify-center p-4 overflow-y-auto
      ${dark ? 'bg-[#050816]/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'}`}>

      {/* Lock icon */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <Lock size={28} className="text-red-400" />
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
          Your free trial has ended
        </h1>
        <p className={`text-sm max-w-md mx-auto ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Hi <strong>{user?.name?.split(' ')[0]}</strong>, your 3-day trial has expired.
          Subscribe to a plan to restore full access to your workspace.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-sm font-medium ${!yearly ? (dark ? 'text-white' : 'text-slate-900') : 'text-brand-muted'}`}>Monthly</span>
        <button
          onClick={() => setYearly(y => !y)}
          className={`w-11 h-6 rounded-full relative transition-colors ${yearly ? 'bg-indigo-600' : dark ? 'bg-white/15' : 'bg-slate-200'}`}
        >
          <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
            style={{ left: yearly ? '22px' : '2px' }} />
        </button>
        <span className={`text-sm font-medium flex items-center gap-1.5 ${yearly ? (dark ? 'text-white' : 'text-slate-900') : 'text-brand-muted'}`}>
          Yearly <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-500 px-1.5 py-0.5 rounded-full">Save 20%</span>
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {pricingPlans.map((plan, i) => (
          <PlanCard key={i} plan={plan} yearly={yearly} onSelect={handleSelectPlan} />
        ))}
      </div>

      <p className={`mt-6 text-xs ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
        🔒 Secured by Paystack · Cancel anytime · Instant activation
      </p>
    </div>
  );
}
