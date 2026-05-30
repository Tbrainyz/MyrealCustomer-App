import { useTheme } from '../../context/ThemeContext'

export function SectionBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] block" />
      {children}
    </div>
  )
}

export function SectionTitle({ children, subtitle, center = true, className = '' }) {
  const { dark } = useTheme()

  return (
    <div className={`mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <h2
        className={`font-display font-bold leading-tight tracking-tight mb-4
          text-[clamp(28px,4.5vw,52px)]
          ${dark ? 'text-slate-50' : 'text-slate-900'}`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`text-[clamp(15px,1.6vw,17px)] leading-relaxed max-w-xl
            ${center ? 'mx-auto' : ''}
            ${dark ? 'text-slate-400' : 'text-slate-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
