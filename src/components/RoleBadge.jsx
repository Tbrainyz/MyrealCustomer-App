import { ROLE_LABELS } from "../context/AuthContext";

const STYLES = {
  admin:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",

  inventory_manager:
    "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",

  finance_manager:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",

  messaging_manager:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
};

const DOTS = {
  admin: "bg-violet-500",
  inventory_manager: "bg-cyan-500",
  finance_manager: "bg-emerald-500",
  messaging_manager: "bg-blue-500",
};

export default function RoleBadge({
  role,
  showDot = true,
  size = "sm",
}) {
  if (!role) return null;

  const cls =
    STYLES[role] ||
    "bg-slate-500/10 text-slate-500 border-slate-500/20";

  const dot = DOTS[role] || "bg-slate-500";
  const text = ROLE_LABELS[role] || role;

  const pad =
    size === "xs"
      ? "px-2 py-0.5 text-[11px]"
      : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-semibold rounded-full border
        backdrop-blur-sm
        transition-all duration-200
        hover:-translate-y-0.5
        ${cls}
        ${pad}
      `}
    >
      {showDot && (
        <span
          className={`
            relative w-1.5 h-1.5 rounded-full
            flex-shrink-0 ${dot}
          `}
        >
          <span
            className={`
              absolute inset-0 rounded-full
              animate-ping opacity-40 ${dot}
            `}
          />
        </span>
      )}

      {text}
    </span>
  );
}