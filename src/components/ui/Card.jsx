import { useTheme } from "../../context/ThemeContext";

export function Card({
  children,
  className = "",
  hover = true,
  glowColor = null,
  style = {},
}) {
  const { dark } = useTheme();

  const base = dark
    ? `
      bg-white/[0.035]
      border border-white/[0.08]
      shadow-[0_12px_45px_rgba(0,0,0,0.18)]
      backdrop-blur-xl
    `
    : `
      bg-white
      border border-slate-200/80
      shadow-[0_10px_35px_rgba(15,23,42,0.06)]
    `;

  const hoverClass = hover
    ? `
      transition-all duration-500 ease-out
      hover:-translate-y-1
      hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]
      dark:hover:shadow-[0_25px_70px_rgba(0,0,0,0.30)]
    `
    : "";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        ${base}
        ${hoverClass}
        ${className}
      `}
      style={{
        ...(glowColor
          ? {
              "--hover-glow": glowColor,
            }
          : {}),
        ...style,
      }}
    >
      {hover && (
        <div
          className="
            pointer-events-none absolute inset-0 opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
          style={{
            background: glowColor
              ? `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 60%)`
              : undefined,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}