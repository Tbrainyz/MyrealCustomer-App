import { Loader2, X } from 'lucide-react';

export function Spinner({ size = 20 }) {
  return <Loader2 size={size} className="animate-spin text-primary-400" />;
}

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <Spinner size={32} />
        <p className="text-sm text-slate-500 dark:text-brand-muted">Loading...</p>
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-brand-border/50 flex items-center justify-center mb-4">
        <Icon size={24} className="text-slate-400 dark:text-brand-muted" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-brand-muted max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const w = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }[size];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${w} animate-slide-up max-h-[90vh] overflow-y-auto rounded-3xl border p-6
        bg-white dark:bg-[#161628] border-slate-200 dark:border-white/10 shadow-2xl`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-slate-500 dark:text-brand-muted mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} className="btn-primary !bg-red-600 hover:!bg-red-700">
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

/* ─── STAT CARD ─── */
export function StatCard({ label, value, icon: Icon, trend, color = 'purple' }) {
  const iconClr = {
    purple: 'bg-primary-500/15 text-primary-500',
    green:  'bg-emerald-500/15 text-emerald-500',
    red:    'bg-red-500/15 text-red-500',
    blue:   'bg-blue-500/15 text-blue-500',
    yellow: 'bg-yellow-500/15 text-yellow-500',
    cyan:   'bg-cyan-500/15 text-cyan-500',
  }[color] || 'bg-primary-500/15 text-primary-500';

  return (
    <div className="
      relative overflow-hidden rounded-3xl p-5 transition-all duration-200
      bg-white border border-slate-200 shadow-sm
      dark:bg-white/[0.04] dark:border-white/[0.08] dark:shadow-none
      hover:-translate-y-1 hover:border-primary-500/30 hover:shadow-lg
    ">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClr}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.value >= 0 ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/15 text-red-600 dark:text-red-400'
          }`}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      {/* value — explicit colours, no dark: prefix ambiguity */}
      <p className="text-2xl font-bold mb-0.5 text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

/* ─── TABLE ─── */
export function Table({ headers, rows, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/[0.10]">
            {headers.map(h => (
              <th key={h} className="
                text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap
                text-slate-500 dark:text-slate-400
              ">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-12">
                <Spinner />
              </td>
            </tr>
          ) : rows.map((row, i) => (
            <tr key={i} className="
              border-b border-slate-100 dark:border-white/[0.06]
              hover:bg-slate-50 dark:hover:bg-white/[0.06]
              transition-colors
            ">
              {row.map((cell, j) => (
                <td key={j} className="py-3.5 px-4 text-slate-700 dark:text-slate-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-xs text-slate-400 dark:text-brand-muted">Page {page} of {pages}</p>
      <div className="flex gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="btn-ghost px-3 disabled:opacity-40">←</button>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${p === page ? 'bg-primary-600 text-white' : 'btn-ghost'}`}>
            {p}
          </button>
        ))}
        <button onClick={() => onPageChange(page + 1)} disabled={page === pages} className="btn-ghost px-3 disabled:opacity-40">→</button>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    sent:      'badge badge-green',
    paid:      'badge badge-green',
    success:   'badge badge-green',
    active:    'badge badge-green',
    incoming:  'badge badge-green',
    pending:   'badge badge-yellow',
    draft:     'badge badge-yellow',
    scheduled: 'badge badge-blue',
    failed:    'badge badge-red',
    overdue:   'badge badge-red',
    cancelled: 'badge badge-red',
    outgoing:  'badge badge-purple',
  };
  const cls = map[status?.toLowerCase()] || 'badge badge-blue';
  return <span className={cls}>{status}</span>;
}
