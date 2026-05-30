import { useTheme } from '../../context/ThemeContext'

export function Card({ children, className = '', hover = true, glowColor = null, style = {} }) {
  const { dark } = useTheme()

  const base = dark
    ? 'bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm'
    : 'bg-white border border-black/[0.07] shadow-sm'

  const hoverClass = hover
    ? 'transition-all duration-300 hover:-translate-y-1.5 cursor-default'
    : ''

  return (
    <div
      className={`rounded-2xl ${base} ${hoverClass} ${className}`}
      style={{
        ...(hover && glowColor
          ? { '--hover-glow': glowColor }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
