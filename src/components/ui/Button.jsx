import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  ...props
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden " +
    "font-semibold rounded-xl cursor-pointer select-none " +
    "transition-all duration-300 ease-out " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 " +
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none " +
    "active:scale-[0.97]";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 " +
      "bg-[length:200%_100%] shadow-lg shadow-indigo-500/25 " +
      "hover:bg-[position:100%_0] hover:-translate-y-0.5 " +
      "hover:shadow-xl hover:shadow-indigo-500/35",

    outline:
      "bg-white/[0.04] dark:bg-white/[0.04] " +
      "text-slate-700 dark:text-slate-200 " +
      "border border-black/[0.09] dark:border-white/[0.10] " +
      "hover:border-indigo-400/70 hover:text-indigo-600 dark:hover:text-indigo-300 " +
      "hover:bg-indigo-500/[0.06] hover:-translate-y-0.5",

    outlineLight:
      "bg-black/[0.03] text-slate-700 border border-black/[0.09] " +
      "hover:border-indigo-500/60 hover:text-indigo-600 " +
      "hover:bg-indigo-500/[0.04] hover:-translate-y-0.5",

    ghost:
      "bg-transparent text-slate-500 dark:text-slate-400 " +
      "border border-transparent " +
      "hover:bg-black/[0.04] dark:hover:bg-white/[0.05] " +
      "hover:text-slate-900 dark:hover:text-white",

    cta:
      "text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 " +
      "bg-[length:200%_100%] shadow-xl shadow-indigo-500/25 " +
      "hover:bg-[position:100%_0] hover:-translate-y-1 " +
      "hover:shadow-2xl hover:shadow-indigo-500/35",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-4 text-lg",
    bold: "px-6 py-3 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Shine */}
      <span
        className="
          pointer-events-none absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/15 to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </button>
  );
}