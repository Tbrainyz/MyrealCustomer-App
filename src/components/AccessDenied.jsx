import { ShieldX, ArrowLeft, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, ROLE_LABELS } from '../context/AuthContext';

export default function AccessDenied({ requiredRole }) {
  const { user } = useAuth();

  const currentRole =
    ROLE_LABELS[user?.role] || user?.role || 'Unknown Role';

  const requiredRoles = Array.isArray(requiredRole)
    ? requiredRole
        .map((role) => ROLE_LABELS[role] || role)
        .join(' or ')
    : requiredRole
      ? ROLE_LABELS[requiredRole] || requiredRole
      : null;

  return (
    <div className="relative flex items-center justify-center min-h-[60vh] p-6 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="
          absolute top-1/2 left-1/2
          w-[320px] h-[320px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-red-500/10
          blur-[100px]
          pointer-events-none
        "
      />

      {/* Main card */}
      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          border
          p-7 sm:p-9
          text-center
          backdrop-blur-xl
          transition-all duration-300
          bg-white border-slate-200
          shadow-[0_20px_70px_rgba(15,23,42,0.08)]
          dark:bg-white/[0.035]
          dark:border-white/[0.08]
          dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
        "
      >
        {/* Decorative corner glow */}
        <div
          className="
            absolute top-0 left-1/2
            -translate-x-1/2
            w-32 h-px
            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
          "
        />

        {/* Icon */}
        <div className="relative mx-auto mb-6 w-fit">
          <div
            className="
              absolute inset-0
              rounded-2xl
              bg-red-500/20
              blur-xl
              animate-pulse
            "
          />

          <div
            className="
              relative
              w-16 h-16
              rounded-2xl
              flex items-center justify-center
              border
              bg-red-500/10
              border-red-500/20
              shadow-lg shadow-red-500/10
            "
          >
            <ShieldX
              size={31}
              strokeWidth={1.8}
              className="text-red-500"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <LockKeyhole
            size={14}
            className="text-red-400"
          />

          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-400">
            Restricted Area
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 dark:text-brand-muted">
          Your current role{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            ({currentRole})
          </span>{' '}
          doesn't have permission to view this page.
        </p>

        {/* Required role */}
        {requiredRoles && (
          <div
            className="
              mt-5
              rounded-2xl
              border
              px-4 py-3
              text-left
              bg-slate-50
              border-slate-200
              dark:bg-white/[0.025]
              dark:border-white/[0.07]
            "
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">
              Required Permission
            </p>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {requiredRoles}
            </p>
          </div>
        )}

        {/* Return button */}
        <Link
          to="/dashboard"
          className="
            group
            inline-flex items-center justify-center gap-2
            mt-7
            w-full
            rounded-2xl
            px-5 py-3.5
            text-sm font-bold
            text-white
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            shadow-lg
            shadow-indigo-500/20
            transition-all duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-indigo-500/30
            active:scale-[0.98]
          "
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Dashboard
        </Link>

        {/* Small security message */}
        <p className="mt-4 text-[11px] text-slate-400 dark:text-slate-600">
          Your account permissions are managed by your workspace administrator.
        </p>
      </div>
    </div>
  );
}