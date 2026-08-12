import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        group relative flex items-center gap-2
        px-3 py-2 rounded-xl border
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-0.5
        ${dark
          ? `
            bg-white/[0.06]
            border-white/[0.10]
            text-slate-400
            hover:text-white
            hover:border-indigo-400/60
            hover:bg-indigo-500/[0.08]
          `
          : `
            bg-black/[0.035]
            border-black/[0.08]
            text-slate-500
            hover:text-slate-900
            hover:border-indigo-400/60
            hover:bg-indigo-500/[0.05]
          `
        }
        ${className}
      `}
    >
      <span
        className="
          absolute inset-0
          bg-gradient-to-r
          from-indigo-500/0
          via-indigo-500/10
          to-cyan-500/0
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <span className="relative z-10">
        {dark ? (
          <Sun size={15} className="transition-transform duration-500 group-hover:rotate-45" />
        ) : (
          <Moon size={15} className="transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </span>

      <span className="relative z-10 text-xs font-semibold">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );
}