import { ShieldX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, ROLE_LABELS } from '../context/AuthContext';

export default function AccessDenied({ requiredRole }) {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh] p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <ShieldX size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-sm text-slate-500 dark:text-brand-muted mb-2">
          Your role <span className="font-semibold text-slate-700 dark:text-slate-300">
            ({ROLE_LABELS[user?.role] || user?.role})
          </span> does not have permission to view this page.
        </p>
        {requiredRole && (
          <p className="text-xs text-slate-400 dark:text-brand-muted mb-6">
            Required: <span className="font-medium">{Array.isArray(requiredRole) ? requiredRole.map(r => ROLE_LABELS[r]).join(' or ') : ROLE_LABELS[requiredRole]}</span>
          </p>
        )}
        <Link to="/dashboard" className="inline-flex items-center gap-2 btn-primary text-sm">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
