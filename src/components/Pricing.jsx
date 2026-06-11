import { useState } from 'react';
import { CheckCircle, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { SectionBadge, SectionTitle } from './ui/SectionTitle';
import { GradientBlur } from './ui/GradientBlur';
import { pricingPlans } from '../data/pricing';
import { subscriptionAPI } from '../api';
import toast from 'react-hot-toast';

// ─── Load Paystack inline script ──────────────────────────────────────────────
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

// ─── Subscription checkout modal ─────────────────────────────────────────────
function CheckoutModal({ plan, yearly, onClose }) {
  const { dark } = useTheme();
  const navigate  = useNavigate();
  const [email,   setEmail]   = useState('');
  const [name,    setName]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const price   = yearly ? plan.yearly   : plan.monthly;
  const billing = yearly ? 'yearly'      : 'monthly';
  const saving  = yearly ? `Save ₦${((plan.monthly - plan.yearly) * 12).toLocaleString()}/yr` : null;

  const handlePay = async () => {
    setError('');
    if (!name.trim())  return setError('Please enter your full name');
    if (!email.trim()) return setError('Please enter your email address');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email');

    setLoading(true);
    try {
      await loadPaystack();
    } catch {
      setLoading(false);
      setError('Could not load payment. Check your connection and try again.');
      return;
    }
    setLoading(false);

    const reference = `SUB-${plan.name.toUpperCase()}-${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email:    email.trim(),
      amount:   price * 100,   // kobo
      currency: 'NGN',
      ref:      reference,
      metadata: {
        custom_fields: [
          { display_name: 'Plan',    variable_name: 'plan',    value: plan.name },
          { display_name: 'Billing', variable_name: 'billing', value: billing   },
          { display_name: 'Name',    variable_name: 'name',    value: name      },
        ],
      },
      callback: async (response) => {
        // Try to activate subscription via backend (if logged in)
        try {
          await subscriptionAPI.activate({
            reference: response.reference,
            plan:      plan.name,
            billing,
          });
          toast.success('Subscription activated!');
          setSelected(null);
          navigate('/dashboard');
          return;
        } catch {
          // Not logged in — redirect to register to create account
        }

        // Redirect to register with pre-filled info
        navigate('/register', {
          state: {
            name:      name.trim(),
            email:     email.trim(),
            plan:      plan.name,
            billing,
            reference: response.reference,
            paid:      true,
          },
        });
      },
      onClose: () => {},
    });

    handler.openIframe();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md rounded-3xl border p-6 shadow-2xl z-10
        ${dark ? 'bg-[#0e0e1c] border-white/10' : 'bg-white border-slate-200'}`}>

        {/* Close */}
        <button onClick={onClose} className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors
          ${dark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}>
          <X size={16} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
            Subscribe to
          </p>
          <h3 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
            {plan.name} Plan
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
              ₦{price.toLocaleString()}
            </span>
            <span className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              /{billing === 'yearly' ? 'yr' : 'mo'}
            </span>
            {saving && (
              <span className="text-xs font-bold bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded-full">
                {saving}
              </span>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-5">
          <div>
            <label className={`text-xs font-medium block mb-1.5 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all
                ${dark
                  ? 'bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white'
                }`}
            />
          </div>
          <div>
            <label className={`text-xs font-medium block mb-1.5 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Email Address *
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl text-sm outline-none border transition-all
                ${dark
                  ? 'bg-white/[0.05] border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white'
                }`}
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all
            bg-gradient-to-r from-indigo-600 to-violet-600
            hover:from-indigo-500 hover:to-violet-500
            hover:shadow-xl hover:shadow-indigo-500/30
            active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </span>
          ) : (
            `Pay ₦${price.toLocaleString()} & Create Account`
          )}
        </button>

        <p className={`text-center text-xs mt-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          🔒 Secured by Paystack · No card stored on our servers
        </p>
      </div>
    </div>
  );
}

// ─── Single pricing card ──────────────────────────────────────────────────────
function PricingCard({ plan, yearly, dark, onSelect }) {
  const price   = yearly ? plan.yearly  : plan.monthly;
  const perYear = plan.monthly * 12;
  const saved   = (plan.monthly - plan.yearly) * 12;

  return (
    <div className={`relative flex flex-col rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-2
      ${plan.popular
        ? dark
          ? 'bg-white/[0.07] border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.2)]'
          : 'bg-white border-indigo-500 shadow-[0_20px_60px_rgba(79,70,229,0.15)]'
        : dark
          ? 'bg-white/[0.04] border-white/[0.08]'
          : 'bg-white border-black/[0.07] shadow-sm'
      }`}>

      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[11px] font-bold text-white whitespace-nowrap shadow-lg"
          style={{ background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', boxShadow: '0 4px 20px rgba(79,70,229,0.5)' }}>
          ⭐ Most Popular
        </div>
      )}

      {/* Plan name */}
      <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: plan.color }}>
        {plan.name}
      </p>

      {/* Price */}
      <div className="mb-1">
        <span className={`text-4xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
          ₦{price.toLocaleString()}
        </span>
        <span className={`text-sm ml-1.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          /{yearly ? 'yr' : 'mo'}
        </span>
      </div>

      {yearly && (
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs line-through ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
            ₦{perYear.toLocaleString()}/yr
          </span>
          <span className="text-xs font-bold bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded-full">
            Save ₦{saved.toLocaleString()}
          </span>
        </div>
      )}

      {!yearly && <div className="mb-4" />}

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-7">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
            <span className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-[0.98]
          ${plan.popular
            ? 'text-white hover:opacity-90 hover:shadow-lg'
            : dark
              ? 'bg-transparent border border-white/[0.12] text-slate-300 hover:border-indigo-400 hover:text-white'
              : 'bg-transparent border border-black/[0.1] text-slate-700 hover:border-indigo-400 hover:text-indigo-600'
          }`}
        style={plan.popular
          ? { background: 'linear-gradient(135deg,#4F46E5,#6366F1)', boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }
          : {}}
      >
        {plan.name === 'Enterprise' ? 'Get Started →' : 'Subscribe →'}
      </button>
    </div>
  );
}

// ─── Main Pricing section ─────────────────────────────────────────────────────
export default function Pricing() {
  const { dark } = useTheme();
  const [yearly,  setYearly]  = useState(false);
  const [selected, setSelected] = useState(null);   // plan being checked out

  return (
    <section id="pricing" className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
      ${dark ? 'bg-[#06080f]' : 'bg-slate-50'}`}>

      <GradientBlur
        color={dark ? 'rgba(79,70,229,0.1)' : 'rgba(79,70,229,0.05)'}
        size={600}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Pricing</SectionBadge>
        </div>
        <SectionTitle subtitle="Choose a plan and get instant access. Cancel anytime.">
          Simple, <span className="gradient-text">transparent pricing</span>
        </SectionTitle>

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-semibold ${!yearly ? (dark ? 'text-white' : 'text-slate-900') : dark ? 'text-slate-500' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setYearly(y => !y)}
            className={`w-12 h-6 rounded-full transition-colors duration-300 relative
              ${yearly ? 'bg-indigo-600' : dark ? 'bg-white/15 border border-white/10' : 'bg-black/10 border border-black/10'}`}
          >
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300"
              style={{ left: yearly ? '26px' : '2px' }} />
          </button>
          <span className={`text-sm font-semibold flex items-center gap-2
            ${yearly ? (dark ? 'text-white' : 'text-slate-900') : dark ? 'text-slate-500' : 'text-slate-400'}`}>
            Yearly
            <span className="text-[11px] font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {pricingPlans.map((plan, i) => (
            <PricingCard
              key={i}
              plan={plan}
              yearly={yearly}
              dark={dark}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-10 text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          {['🔒 Secured by Paystack', '↩ Cancel anytime', '📧 Instant access after payment', '🇳🇬 NGN billing'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Checkout modal */}
      {selected && (
        <CheckoutModal
          plan={selected}
          yearly={yearly}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
