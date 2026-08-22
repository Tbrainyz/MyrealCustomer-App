import { useTheme } from '../context/ThemeContext'
import { companies } from '../data/features'

const DOUBLED = [...companies, ...companies]

export default function TrustedCompanies() {
  const { dark } = useTheme()

  return (
    <section
      className={`py-10 overflow-hidden
        ${dark ? 'border-y border-white/[0.06]' : 'border-y border-black/[0.06]'}`}
    >
      <p className={`text-center text-xs font-semibold uppercase tracking-widest mb-6
        ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
        Trusted by 100+ Businesses Worldwide
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${dark ? '#06080f' : '#f8fafc'}, transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(-90deg, ${dark ? '#06080f' : '#f8fafc'}, transparent)`,
          }}
        />

        <div className="marquee-track">
          {DOUBLED.map((name, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-2 mx-2 rounded-full border whitespace-nowrap
                font-display font-bold text-sm sm:text-base tracking-tight
                transition-all duration-200 cursor-default
                ${dark
                  ? 'bg-white/[0.03] border-white/[0.07] text-slate-600 hover:text-slate-300 hover:border-white/[0.15]'
                  : 'bg-white border-black/[0.08] text-slate-400 hover:text-slate-700 shadow-sm'
                }`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
