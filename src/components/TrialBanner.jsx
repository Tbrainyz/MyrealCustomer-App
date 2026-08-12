import { useNavigate } from 'react-router-dom'
import { Clock, X, Zap, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useSubscription } from '../context/SubscriptionContext'
import { useState } from 'react'

export default function TrialBanner() {
  const { dark } = useTheme()
  const navigate = useNavigate()

  const {
    isTrialActive,
    isSubscribed,
    trialDaysLeft,
    bypassTrial,
  } = useSubscription()

  const [dismissed, setDismissed] = useState(false)

  // Don't render when trial banner isn't needed
  if (
    isSubscribed ||
    bypassTrial ||
    dismissed ||
    !isTrialActive
  ) {
    return null
  }

  const urgent = trialDaysLeft <= 1
  const warning = trialDaysLeft === 2

  const label =
    trialDaysLeft <= 0
      ? 'Your trial expires today'
      : trialDaysLeft === 1
        ? '1 day left in your trial'
        : `${trialDaysLeft} days left in your trial`

  const subtitle =
    trialDaysLeft <= 0
      ? 'Subscribe now to keep uninterrupted access.'
      : 'Subscribe to keep full access after your trial ends.'

  const theme = urgent
    ? {
        darkBg:
          'bg-gradient-to-r from-red-500/[0.12] via-red-500/[0.07] to-transparent',
        lightBg:
          'bg-gradient-to-r from-red-50 via-red-50/70 to-white',
        border: dark
          ? 'border-red-500/30'
          : 'border-red-200',
        icon: 'text-red-400',
        text: dark
          ? 'text-red-200'
          : 'text-red-700',
        muted: dark
          ? 'text-red-300/60'
          : 'text-red-600/70',
        glow: 'rgba(239,68,68,0.18)',
      }
    : warning
      ? {
          darkBg:
            'bg-gradient-to-r from-amber-500/[0.10] via-amber-500/[0.05] to-transparent',
          lightBg:
            'bg-gradient-to-r from-amber-50 via-amber-50/70 to-white',
          border: dark
            ? 'border-amber-500/25'
            : 'border-amber-200',
          icon: 'text-amber-400',
          text: dark
            ? 'text-amber-200'
            : 'text-amber-700',
          muted: dark
            ? 'text-amber-300/60'
            : 'text-amber-600/70',
          glow: 'rgba(245,158,11,0.16)',
        }
      : {
          darkBg:
            'bg-gradient-to-r from-indigo-500/[0.10] via-violet-500/[0.06] to-transparent',
          lightBg:
            'bg-gradient-to-r from-indigo-50 via-violet-50/70 to-white',
          border: dark
            ? 'border-indigo-500/20'
            : 'border-indigo-200',
          icon: 'text-indigo-400',
          text: dark
            ? 'text-indigo-200'
            : 'text-indigo-700',
          muted: dark
            ? 'text-slate-400'
            : 'text-slate-500',
          glow: 'rgba(99,102,241,0.16)',
        }

  const handleSubscribe = () => {
    navigate('/?scroll=pricing')
  }

  return (
    <div
      className={`
        relative z-[900]
        w-full
        border-b
        overflow-hidden
        ${theme.border}
        ${dark ? theme.darkBg : theme.lightBg}
      `}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none w-72 h-24 rounded-full blur-3xl -left-20 top-1/2 -translate-y-1/2"
        style={{
          background: theme.glow,
        }}
      />

      {/* Animated shine */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)',
          animation: 'trialBannerShine 5s ease-in-out infinite',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Icon */}
            <div
              className={`
                relative flex-shrink-0
                w-8 h-8
                rounded-xl
                flex items-center justify-center
                border
                ${dark
                  ? 'bg-white/[0.06] border-white/[0.08]'
                  : 'bg-white/70 border-black/[0.06]'
                }
              `}
            >
              <Clock
                size={15}
                className={theme.icon}
              />

              {urgent && (
                <span
                  className={`
                    absolute -top-0.5 -right-0.5
                    w-2 h-2
                    rounded-full
                    ${trialDaysLeft <= 0
                      ? 'bg-red-400'
                      : 'bg-amber-400'
                    }
                  `}
                >
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{
                      background:
                        trialDaysLeft <= 0
                          ? '#f87171'
                          : '#fbbf24',
                    }}
                  />
                </span>
              )}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-bold ${theme.text}`}
                >
                  {label}
                </span>

                {urgent && (
                  <span
                    className={`
                      hidden sm:inline-flex
                      items-center gap-1
                      px-2 py-0.5
                      rounded-full
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      ${dark
                        ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                        : 'bg-red-100 text-red-600 border border-red-200'
                      }
                    `}
                  >
                    <Sparkles size={9} />
                    Action required
                  </span>
                )}
              </div>

              <p
                className={`
                  hidden sm:block
                  text-xs
                  mt-0.5
                  truncate
                  ${theme.muted}
                `}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">

            <button
              type="button"
              onClick={handleSubscribe}
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-1.5
                px-3.5
                py-1.5
                rounded-xl
                text-xs
                font-bold
                text-white
                overflow-hidden
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-indigo-600
                bg-[length:200%_100%]
                hover:bg-[position:100%_0]
                hover:shadow-lg
                hover:shadow-indigo-500/25
                active:scale-95
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              <Zap
                size={11}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              Subscribe Now

              <ArrowRight
                size={11}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss trial banner"
              className={`
                flex-shrink-0
                w-7 h-7
                rounded-lg
                flex items-center justify-center
                transition-all duration-200
                active:scale-90
                ${
                  dark
                    ? 'text-slate-500 hover:text-white hover:bg-white/[0.08]'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-black/[0.05]'
                }
              `}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trialBannerShine {
          0% {
            transform: translateX(-100%);
          }
          45% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}