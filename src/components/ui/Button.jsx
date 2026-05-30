export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 btn-glow'

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 animate-pulse-glow',
    outline:
      'bg-white/5 dark:bg-white/5 text-white border border-white/15 hover:border-indigo-400 hover:text-indigo-300',
    outlineLight:
      'bg-black/5 text-slate-800 border border-black/10 hover:border-indigo-500 hover:text-indigo-600',
    ghost:
      'bg-transparent text-slate-400 border border-slate-700 hover:border-indigo-500 hover:text-indigo-400',
    cta:
      'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-4 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
