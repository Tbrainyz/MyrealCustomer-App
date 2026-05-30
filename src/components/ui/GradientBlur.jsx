export function GradientBlur({ color = 'rgba(79,70,229,0.18)', size = 400, style = {}, className = '' }) {
  return (
    <div
      className={`blob pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        ...style,
      }}
    />
  )
}
