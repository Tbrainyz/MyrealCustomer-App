import { useTheme } from "../../context/ThemeContext";

export function AuthInput({
  label,
  rightLabel,
  icon: Icon,
  rightIcon,
  onRightIconClick,
  className = "",
  ...props
}) {
  const { dark } = useTheme();

  return (
    <div>
      {(label || rightLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label
              className={`
                text-sm font-semibold
                ${dark ? "text-slate-300" : "text-slate-600"}
              `}
            >
              {label}
            </label>
          )}

          {rightLabel}
        </div>
      )}

      <div className="relative group">
        {Icon && (
          <Icon
            size={16}
            className={`
              absolute left-3.5 top-1/2
              -translate-y-1/2 pointer-events-none
              transition-colors duration-200
              ${dark
                ? "text-slate-500 group-focus-within:text-indigo-400"
                : "text-slate-400 group-focus-within:text-indigo-500"
              }
            `}
          />
        )}

        <input
          className={`
            w-full rounded-2xl text-[15px]
            outline-none
            transition-all duration-300
            placeholder:opacity-50
            ${Icon ? "pl-10" : "pl-4"}
            ${rightIcon ? "pr-11" : "pr-4"}
            py-3.5

            ${dark
              ? `
                bg-white/[0.045]
                border border-white/[0.09]
                text-white
                placeholder:text-slate-500
                hover:border-white/[0.16]
                focus:border-indigo-400/70
                focus:bg-indigo-500/[0.035]
                focus:ring-4
                focus:ring-indigo-500/10
              `
              : `
                bg-slate-50
                border border-slate-200
                text-slate-900
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-indigo-400
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
              `
            }

            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={`
              absolute right-3.5 top-1/2
              -translate-y-1/2
              transition-all duration-200
              hover:scale-110
              ${dark
                ? "text-slate-500 hover:text-indigo-300"
                : "text-slate-400 hover:text-indigo-600"
              }
            `}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthButton({
  children,
  loading,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        group relative overflow-hidden
        w-full py-3.5 rounded-2xl
        font-semibold text-[15px]
        text-white
        bg-gradient-to-r
        from-indigo-600
        via-violet-600
        to-indigo-600
        bg-[length:200%_100%]
        shadow-lg shadow-indigo-500/20
        transition-all duration-300
        hover:bg-[position:100%_0]
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-indigo-500/30
        active:scale-[0.99]
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      <span
        className="
          absolute inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent via-white/15 to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}