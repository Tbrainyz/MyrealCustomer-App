import { useTheme } from '../context/ThemeContext'
import { companies } from '../data/features'

const DOUBLED = [...companies, ...companies]

export default function TrustedCompanies() {
  const { dark } = useTheme()

  return (
    <section
      className={`relative overflow-hidden py-10 sm:py-12
        ${
          dark
            ? 'border-y border-white/[0.06] bg-[#06080f]'
            : 'border-y border-black/[0.06] bg-slate-50'
        }`}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 w-[420px] h-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none"
        style={{
          background: dark
            ? 'rgba(99,102,241,0.07)'
            : 'rgba(99,102,241,0.035)',
        }}
      />

      {/* Heading */}
      <div className="relative z-10 text-center mb-7">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border
            text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]
            ${
              dark
                ? 'bg-white/[0.035] border-white/[0.07] text-slate-500'
                : 'bg-white border-black/[0.07] text-slate-400 shadow-sm'
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              dark ? 'bg-indigo-400' : 'bg-indigo-500'
            }`}
          />

          Trusted by 100+ Businesses Worldwide
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden group">
        {/* Left fade */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none ${
            dark
              ? 'bg-gradient-to-r from-[#06080f] to-transparent'
              : 'bg-gradient-to-r from-slate-50 to-transparent'
          }`}
        />

        {/* Right fade */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none ${
            dark
              ? 'bg-gradient-to-l from-[#06080f] to-transparent'
              : 'bg-gradient-to-l from-slate-50 to-transparent'
          }`}
        />

        <div className="trusted-marquee">
          {DOUBLED.map((name, index) => (
            <CompanyPill
              key={`${name}-${index}`}
              name={name}
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        .trusted-marquee {
          display: flex;
          width: max-content;
          align-items: center;
          animation: trusted-scroll 32s linear infinite;
          will-change: transform;
        }

        .group:hover .trusted-marquee {
          animation-play-state: paused;
        }

        @keyframes trusted-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .trusted-marquee {
            animation-duration: 26s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trusted-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}


function CompanyPill({ name, dark }) {
  return (
    <div
      className={`
        relative group/company
        flex items-center gap-2.5
        px-6 sm:px-8
        py-2.5 sm:py-3
        mx-1.5 sm:mx-2
        rounded-full
        whitespace-nowrap
        border
        font-display
        font-bold
        text-sm sm:text-base
        tracking-tight
        transition-all duration-300
        cursor-default
        hover:-translate-y-1
        hover:scale-[1.03]
        ${
          dark
            ? `
              bg-white/[0.025]
              border-white/[0.07]
              text-slate-600
              hover:text-white
              hover:border-indigo-400/30
              hover:bg-white/[0.055]
              hover:shadow-[0_12px_35px_rgba(79,70,229,0.14)]
            `
            : `
              bg-white
              border-black/[0.07]
              text-slate-400
              hover:text-slate-800
              hover:border-indigo-300
              hover:shadow-[0_12px_35px_rgba(79,70,229,0.12)]
            `
        }
      `}
    >
      {/* Company status dot */}
      <span
        className={`
          relative w-1.5 h-1.5 rounded-full
          transition-all duration-300
          ${
            dark
              ? 'bg-slate-700 group-hover/company:bg-indigo-400'
              : 'bg-slate-300 group-hover/company:bg-indigo-500'
          }
        `}
      />

      {/* Subtle hover glow */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover/company:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: dark
            ? 'radial-gradient(circle at center, rgba(99,102,241,0.08), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(99,102,241,0.05), transparent 70%)',
        }}
      />

      <span className="relative z-10">{name}</span>
    </div>
  )
}