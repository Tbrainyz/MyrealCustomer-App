import { useTheme } from '../../context/ThemeContext';

export function AuthInput({ label, rightLabel, icon: Icon, rightIcon, onRightIconClick, className = '', ...props }) {
  const { dark } = useTheme();
  return (
    <div>
      {(label || rightLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{label}</label>}
          {rightLabel}
        </div>
      )}
      <div className="relative">
        {Icon && <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-slate-500' : 'text-slate-400'}`} />}
        <input
          className={`w-full rounded-2xl text-[15px] outline-none transition-all duration-200 placeholder:opacity-50
            ${Icon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-11' : 'pr-4'} py-3.5
            ${dark
              ? 'bg-white/[0.05] border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
              : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 focus:bg-white'
            } ${className}`}
          {...props}
        />
        {rightIcon && (
          <button type="button" onClick={onRightIconClick}
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthButton({ children, loading, className = '', ...props }) {
  return (
    <button
      className={`w-full py-3.5 rounded-2xl font-semibold text-[15px] transition-all duration-200
        bg-gradient-to-r from-indigo-600 to-violet-600 text-white
        hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/30
        active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing...
        </span>
      ) : children}
    </button>
  );
}
