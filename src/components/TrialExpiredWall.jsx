import { useState } from 'react';
import { Lock, Zap, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { pricingPlans } from '../data/pricing';
import { useSubscription } from '../context/SubscriptionContext';
import { subscriptionAPI } from '../api';
import toast from 'react-hot-toast';

// ─────────────────────────────────────────────────────────────
// Paystack loader
// ─────────────────────────────────────────────────────────────
function waitForPaystack(maxWaitMs = 5000) {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const start = Date.now();

    const check = setInterval(() => {
      if (window.PaystackPop) {
        clearInterval(check);
        resolve();
      } else if (Date.now() - start > maxWaitMs) {
        clearInterval(check);
        reject(new Error('Paystack timeout'));
      }
    }, 100);
  });
}


// ─────────────────────────────────────────────────────────────
// Premium pricing card
// ─────────────────────────────────────────────────────────────
function PlanCard({ plan, yearly, onSelect, index }) {
  const { dark } = useTheme();

  const [hovered, setHovered] = useState(false);

  const price = yearly ? plan.yearly : plan.monthly;

  return (
    <div
      onClick={() => onSelect(plan)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative cursor-pointer
        rounded-[28px]
        p-5 sm:p-6
        border
        overflow-hidden
        transition-all duration-500 ease-out
        transform-gpu
        ${plan.popular
          ? dark
            ? 'bg-white/[0.075] border-indigo-500/70'
            : 'bg-white border-indigo-400'
          : dark
            ? 'bg-white/[0.035] border-white/[0.08]'
            : 'bg-white border-slate-200'
        }
      `}
      style={{
        transform: hovered
          ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-10px) scale(1.025)'
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)',

        boxShadow: hovered
          ? plan.popular
            ? `0 30px 80px rgba(79,70,229,${dark ? '0.35' : '0.18'}),
               0 0 50px ${plan.color}20`
            : dark
              ? '0 30px 70px rgba(0,0,0,0.45)'
              : '0 25px 60px rgba(15,23,42,0.12)'
          : plan.popular
            ? '0 15px 50px rgba(79,70,229,0.12)'
            : dark
              ? '0 10px 40px rgba(0,0,0,0.15)'
              : '0 8px 30px rgba(15,23,42,0.05)',
      }}
    >
      {/* Animated glow */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{
          background: plan.color,
          opacity: hovered ? 0.18 : 0.06,
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute -bottom-28 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{
          background: plan.color,
          opacity: hovered ? 0.12 : 0.03,
        }}
      />

      {/* Popular badge */}
      {plan.popular && (
        <div
          className="
            absolute -top-3 left-1/2 -translate-x-1/2
            flex items-center gap-1.5
            px-4 py-1.5
            rounded-full
            text-[10px]
            font-bold
            tracking-wide
            text-white
            whitespace-nowrap
            shadow-lg
          "
          style={{
            background:
              'linear-gradient(135deg, #4F46E5, #7C3AED, #8B5CF6)',
            boxShadow: '0 6px 25px rgba(79,70,229,0.45)',
          }}
        >
          <Sparkles size={11} />
          MOST POPULAR
        </div>
      )}

      <div className="relative z-10">

        {/* Plan header */}
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: plan.color }}
          >
            {plan.name}
          </p>

          {index === 1 && (
            <span
              className={`
                text-[9px] px-2 py-1 rounded-full font-semibold
                ${dark
                  ? 'bg-white/5 text-slate-400'
                  : 'bg-slate-100 text-slate-500'
                }
              `}
            >
              RECOMMENDED
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-1">
          <span
            className={`
              text-3xl sm:text-4xl
              font-bold
              tracking-tight
              ${dark ? 'text-white' : 'text-slate-900'}
            `}
          >
            ₦{price.toLocaleString()}
          </span>

          <span
            className={`
              text-xs
              ${dark ? 'text-slate-500' : 'text-slate-400'}
            `}
          >
            /{yearly ? 'yr' : 'mo'}
          </span>
        </div>

        {yearly && (
          <p className="text-[11px] text-emerald-500 font-semibold mb-4">
            Save 20% with yearly billing
          </p>
        )}

        {!yearly && (
          <div className="h-[20px] mb-2" />
        )}

        {/* Divider */}
        <div
          className={`
            h-px mb-5
            ${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}
          `}
        />

        {/* Features */}
        <ul className="space-y-2.5 mb-6">
          {plan.features.slice(0, 5).map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5"
            >
              <span
                className="flex-shrink-0 mt-0.5"
              >
                <CheckCircle
                  size={14}
                  style={{ color: plan.color }}
                />
              </span>

              <span
                className={`
                  text-xs leading-relaxed
                  ${dark ? 'text-slate-300' : 'text-slate-600'}
                `}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`
            relative
            w-full
            py-3
            rounded-2xl
            text-xs
            font-bold
            text-white
            overflow-hidden
            transition-all duration-300
            active:scale-[0.97]
          `}
          style={{
            background: plan.popular
              ? 'linear-gradient(135deg,#4F46E5,#7C3AED,#8B5CF6)'
              : `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,

            boxShadow: hovered
              ? `0 10px 30px ${plan.color}45`
              : 'none',
          }}
        >
          {/* Button shine */}
          <span
            className="
              absolute inset-0
              -translate-x-full
              group-hover:translate-x-full
              transition-transform duration-700
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
            "
          />

          <span className="relative z-10 flex items-center justify-center gap-2">
            <Zap size={13} />
            Choose {plan.name}
          </span>
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function TrialExpiredWall() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const { fetchStatus } = useSubscription();

  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────
  // Payment
  // ─────────────────────────────────────────────────────────
  const handleSelectPlan = async (plan) => {
    if (loading) return;

    setLoading(true);

    try {
      await waitForPaystack();
    } catch {
      toast.error(
        'Could not load payment. Check your internet connection.'
      );

      setLoading(false);
      return;
    }

    setLoading(false);

    const billing = yearly ? 'yearly' : 'monthly';
    const price = yearly ? plan.yearly : plan.monthly;

    const reference =
      `SUB-${plan.name.toUpperCase()}-${Date.now()}`;

    try {
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,

        email: user?.email,

        amount: price * 100,

        currency: 'NGN',

        ref: reference,

        metadata: {
          custom_fields: [
            {
              display_name: 'Plan',
              variable_name: 'plan',
              value: plan.name,
            },
            {
              display_name: 'Billing',
              variable_name: 'billing',
              value: billing,
            },
          ],
        },

        callback: async (response) => {
          const toastId = toast.loading(
            'Activating your subscription...'
          );

          try {
            await subscriptionAPI.activate({
              reference: response.reference,
              plan: plan.name,
              billing,
            });

            toast.success(
              'Subscription activated! Welcome aboard.',
              { id: toastId }
            );

            await fetchStatus();

          } catch (err) {
            toast.error(
              err?.response?.data?.message ||
              'Activation failed. Please contact support.',
              { id: toastId }
            );
          }
        },

        onClose: () => {
          // Payment window closed.
        },
      });

      handler.openIframe();

    } catch (err) {
      toast.error(
        err?.message || 'Unable to initialize payment.'
      );
    }
  };


  return (
    <div
      className={`
        fixed inset-0
        z-[9990]
        overflow-y-auto
        overflow-x-hidden
        ${dark
          ? 'bg-[#03050d]'
          : 'bg-slate-50'
        }
      `}
    >

      {/* ═══════════════════════════════════════════════════
          BACKGROUND
      ═══════════════════════════════════════════════════ */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Grid */}
        <div
          className={`
            absolute inset-0
            opacity-[0.035]
            ${dark ? 'block' : 'opacity-[0.025]'}
          `}
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(99,102,241,0.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(99,102,241,0.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '45px 45px',
          }}
        />

        {/* Purple orb */}
        <div
          className="
            absolute
            -top-40
            left-[10%]
            w-[420px]
            h-[420px]
            rounded-full
            blur-[120px]
            animate-pulse
          "
          style={{
            background: dark
              ? 'rgba(79,70,229,0.18)'
              : 'rgba(99,102,241,0.10)',
          }}
        />

        {/* Cyan orb */}
        <div
          className="
            absolute
            top-[35%]
            -right-40
            w-[400px]
            h-[400px]
            rounded-full
            blur-[120px]
          "
          style={{
            background: dark
              ? 'rgba(6,182,212,0.10)'
              : 'rgba(6,182,212,0.06)',
          }}
        />

        {/* Bottom orb */}
        <div
          className="
            absolute
            -bottom-40
            left-[35%]
            w-[450px]
            h-[450px]
            rounded-full
            blur-[130px]
          "
          style={{
            background: dark
              ? 'rgba(139,92,246,0.10)'
              : 'rgba(139,92,246,0.05)',
          }}
        />
      </div>


      {/* ═══════════════════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════════════════ */}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-14">

        {/* ────────────────────────────────────────────────
            Header
        ──────────────────────────────────────────────── */}

        <div className="text-center max-w-2xl mb-8 sm:mb-10">

          {/* Lock */}
          <div className="relative inline-flex mb-6">

            <div
              className="
                absolute
                inset-[-12px]
                rounded-[28px]
                blur-2xl
                animate-pulse
              "
              style={{
                background: dark
                  ? 'rgba(239,68,68,0.16)'
                  : 'rgba(239,68,68,0.10)',
              }}
            />

            <div
              className="
                relative
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-[24px]
                flex
                items-center
                justify-center
                border
              "
              style={{
                background: dark
                  ? 'linear-gradient(145deg, rgba(239,68,68,.15), rgba(239,68,68,.05))'
                  : 'linear-gradient(145deg, #fff, #fff5f5)',

                borderColor: dark
                  ? 'rgba(239,68,68,.25)'
                  : 'rgba(239,68,68,.18)',

                boxShadow:
                  '0 20px 60px rgba(239,68,68,0.12)',
              }}
            >
              <Lock
                size={30}
                className="text-red-400"
              />
            </div>
          </div>


          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-full
                text-[10px]
                font-bold
                tracking-widest
                uppercase
                border
                ${dark
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-red-50 border-red-100 text-red-500'
                }
              `}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Trial Expired
            </span>
          </div>


          <h1
            className={`
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              tracking-tight
              leading-tight
              mb-4
              ${dark
                ? 'text-white'
                : 'text-slate-900'
              }
            `}
          >
            Your Free Trial
            <br />

            <span className="gradient-text">
              Has Ended
            </span>
          </h1>


          <p
            className={`
              text-sm
              sm:text-base
              leading-relaxed
              max-w-xl
              mx-auto
              ${dark
                ? 'text-slate-400'
                : 'text-slate-500'
              }
            `}
          >
            Hi{' '}
            <strong
              className={
                dark
                  ? 'text-white'
                  : 'text-slate-800'
              }
            >
              {user?.name?.split(' ')[0] || 'there'}
            </strong>
            , your 30-day trial has ended.
            Choose a plan below to restore full access
            to your workspace.
          </p>
        </div>


        {/* ────────────────────────────────────────────────
            Billing toggle
        ──────────────────────────────────────────────── */}

        <div
          className={`
            relative
            flex
            items-center
            gap-3
            mb-9
            p-1.5
            rounded-2xl
            border
            ${dark
              ? 'bg-white/[0.035] border-white/[0.08]'
              : 'bg-white border-slate-200 shadow-sm'
            }
          `}
        >

          <span
            className={`
              px-3
              py-1.5
              text-xs
              font-semibold
              ${!yearly
                ? dark
                  ? 'text-white'
                  : 'text-slate-900'
                : dark
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }
            `}
          >
            Monthly
          </span>


          <button
            type="button"
            onClick={() => setYearly(y => !y)}
            aria-label="Toggle yearly billing"
            className={`
              relative
              w-12
              h-6
              rounded-full
              transition-colors
              duration-300
              ${yearly
                ? 'bg-indigo-600'
                : dark
                  ? 'bg-white/15'
                  : 'bg-slate-300'
              }
            `}
          >
            <span
              className="
                absolute
                top-0.5
                w-5
                h-5
                rounded-full
                bg-white
                shadow-md
                transition-all
                duration-300
              "
              style={{
                left: yearly ? '26px' : '2px',
              }}
            />
          </button>


          <span
            className={`
              flex
              items-center
              gap-2
              px-3
              py-1.5
              text-xs
              font-semibold
              ${yearly
                ? dark
                  ? 'text-white'
                  : 'text-slate-900'
                : dark
                  ? 'text-slate-500'
                  : 'text-slate-400'
              }
            `}
          >
            Yearly

            <span
              className="
                text-[9px]
                font-bold
                bg-emerald-500/15
                text-emerald-500
                px-2
                py-1
                rounded-full
              "
            >
              SAVE 20%
            </span>
          </span>
        </div>


        {/* ────────────────────────────────────────────────
            Pricing cards
        ──────────────────────────────────────────────── */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            w-full
            max-w-5xl
          "
          style={{
            perspective: '1400px',
          }}
        >
          {pricingPlans.map((plan, index) => (
            <PlanCard
              key={plan.name || index}
              plan={plan}
              yearly={yearly}
              index={index}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>


        {/* ────────────────────────────────────────────────
            Trust indicators
        ──────────────────────────────────────────────── */}

        <div
          className={`
            flex
            flex-wrap
            items-center
            justify-center
            gap-5
            sm:gap-8
            mt-9
            text-[11px]
            ${dark
              ? 'text-slate-500'
              : 'text-slate-400'
            }
          `}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} />
            Secured by Paystack
          </span>

          <span className="flex items-center gap-1.5">
            <CheckCircle size={14} />
            Cancel anytime
          </span>

          <span className="flex items-center gap-1.5">
            <Zap size={14} />
            Instant activation
          </span>
        </div>


        {/* Loading indicator */}
        {loading && (
          <div
            className={`
              fixed
              bottom-5
              left-1/2
              -translate-x-1/2
              px-4
              py-2.5
              rounded-xl
              border
              shadow-xl
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              ${dark
                ? 'bg-[#101522]/90 border-white/10 text-white'
                : 'bg-white/95 border-slate-200 text-slate-700'
              }
            `}
          >
            <span
              className="
                w-3.5
                h-3.5
                border-2
                border-indigo-500/30
                border-t-indigo-500
                rounded-full
                animate-spin
              "
            />

            Preparing secure payment...
          </div>
        )}

      </div>
    </div>
  );
}