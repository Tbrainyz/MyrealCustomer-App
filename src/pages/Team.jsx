import { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  UserPlus, MoreVertical, ShieldCheck, ShieldOff, KeyRound,
  Trash2, Users, UserCog, RefreshCw, Search, Crown,
  Package, Wallet, MessageSquare, ChevronDown,
} from 'lucide-react';
import Header from '../components/layout/Header';
import { Modal, ConfirmDialog, Spinner, EmptyState } from '../components/ui';
import { usersAPI } from '../api';
import { useTheme } from '../context/ThemeContext';
import { ROLE_LABELS } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

// ─── Role display config ────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  admin: {
    label: 'Administrator',
    icon: Crown,
    badge: 'bg-primary-500/15 text-primary-600 dark:text-primary-400',
    desc:  'Full access to all features',
  },
  inventory_manager: {
    label: 'Inventory Manager',
    icon: Package,
    badge: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
    desc:  'Products & stock movements only',
  },
  finance_manager: {
    label: 'Finance Manager',
    icon: Wallet,
    badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    desc:  'Invoices, expenses & cash flow only',
  },
  messaging_manager: {
    label: 'Messaging Manager',
    icon: MessageSquare,
    badge: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    desc:  'Contacts, messaging & templates only',
  },
};

// ─── Create / Edit user modal ─────────────────────────────────────────────────
function UserModal({ user, roles, onClose, onSave }) {
  const { dark } = useTheme();
  const isEdit = !!user?._id;
  const [form, setForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    role:  user?.role  || (roles[0]?.value || 'inventory_manager'),
  });
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim())  return toast.error('Name is required');
    if (!form.email.trim()) return toast.error('Email is required');
    if (!form.role)         return toast.error('Role is required');
    setLoading(true);
    try {
      if (isEdit) {
        await usersAPI.update(user._id, { name: form.name, email: form.email, role: form.role });
        toast.success('User updated');
      } else {
        await usersAPI.create(form);
        toast.success('User created — login credentials sent by email');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save user');
    } finally { setLoading(false); }
  };

  const selectedRoleCfg = ROLE_CONFIG[form.role];

  return (
    <Modal isOpen onClose={onClose} title={isEdit ? 'Edit Team Member' : 'Add Team Member'} size="md">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="label">Full Name *</label>
          <input className="input" placeholder="e.g. Ngozi Adeyemi" value={form.name} onChange={set('name')} />
        </div>

        {/* Email — read-only when editing */}
        <div>
          <label className="label">Email Address *</label>
          <input
            className="input"
            type="email"
            placeholder="ngozi@company.com"
            value={form.email}
            onChange={set('email')}
            disabled={isEdit}
          />
          {!isEdit && (
            <p className="text-xs text-brand-muted mt-1">
              A temporary password will be emailed to this address.
            </p>
          )}
        </div>

        {/* Role picker */}
        <div>
          <label className="label">Role *</label>
          <div className="space-y-2">
            {roles.map(role => {
              const cfg = ROLE_CONFIG[role.value] || {};
              const Icon = cfg.icon || UserCog;
              const active = form.role === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, role: role.value }))}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all
                    ${active
                      ? 'border-primary-500 bg-primary-500/8 dark:bg-primary-500/10'
                      : dark
                        ? 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]'
                        : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/50'
                    }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.badge || 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>{role.label}</p>
                    <p className="text-xs text-brand-muted truncate">{role.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                    active ? 'border-primary-500 bg-primary-500' : dark ? 'border-white/20' : 'border-slate-300'
                  }`}>
                    {active && <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto mt-[3px]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected role summary */}
        {selectedRoleCfg && (
          <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedRoleCfg.badge}`}>
              <selectedRoleCfg.icon size={15} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${dark ? 'text-white' : 'text-slate-700'}`}>{selectedRoleCfg.label}</p>
              <p className="text-xs text-brand-muted">{selectedRoleCfg.desc}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary flex items-center gap-2" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size={14} /> : <UserPlus size={14} />}
            {isEdit ? 'Update Member' : 'Create & Send Invite'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── User row actions dropdown ────────────────────────────────────────────────
function ActionsMenu({ user, onEdit, onToggle, onResetPwd, onDelete }) {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top:   rect.bottom + window.scrollY + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(v => !v);
  };

  const menuBg = dark
    ? 'bg-[#0e0e1c] border-white/[0.12] shadow-2xl shadow-black/60'
    : 'bg-white border-slate-200 shadow-2xl shadow-slate-300/40';

  const actions = [
    {
      icon: UserCog,
      label: 'Edit',
      onClick: onEdit,
      cls: dark ? 'text-slate-200' : 'text-slate-700',
    },
    {
      icon: user.isActive ? ShieldOff : ShieldCheck,
      label: user.isActive ? 'Deactivate' : 'Activate',
      onClick: onToggle,
      cls: user.isActive ? 'text-yellow-400' : 'text-emerald-500',
    },
    {
      icon: KeyRound,
      label: 'Reset Password',
      onClick: onResetPwd,
      cls: 'text-blue-400',
    },
    {
      icon: Trash2,
      label: 'Delete User',
      onClick: onDelete,
      cls: 'text-red-500',
    },
  ];

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className={`p-2 rounded-xl transition-all
          ${open
            ? dark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'
            : dark ? 'text-slate-500 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
        title="Actions"
      >
        <MoreVertical size={16} />
      </button>

      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <>
          <div
            className="fixed inset-0"
            style={{ zIndex: 99998 }}
            onClick={() => setOpen(false)}
          />
          <div
            className={`fixed w-48 rounded-2xl border overflow-hidden py-1 ${menuBg}`}
            style={{ top: pos.top, right: pos.right, zIndex: 99999 }}
          >
            {actions.map(({ icon: Icon, label, onClick, cls }) => (
              <button
                key={label}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                  setOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors
                  ${cls}
                  ${dark ? 'hover:bg-white/[0.08]' : 'hover:bg-slate-50'}`}
              >
                <Icon size={14} className="flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </>
  );
}


// ─── Role stats card ──────────────────────────────────────────────────────────
function RoleStat({ role, count }) {
  const cfg = ROLE_CONFIG[role];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <div className="admin-stat-card p-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${cfg.badge}`}>
        <Icon size={16} />
      </div>
      <p className="text-xl font-bold text-slate-900 dark:text-white">{count}</p>
      <p className="text-xs text-brand-muted mt-0.5 leading-tight">{cfg.label}</p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Team() {
  const { dark } = useTheme();
  const [users,   setUsers]   = useState([]);
  const [roles,   setRoles]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modals
  const [showCreate,   setShowCreate]   = useState(false);
  const [editUser,     setEditUser]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toggleTarget, setToggleTarget] = useState(null);
  const [resetTarget,  setResetTarget]  = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        usersAPI.getAll({ search, role: roleFilter !== 'all' ? roleFilter : undefined }),
        usersAPI.getRoles(),
      ]);
      setUsers(usersRes.data?.data || []);
      setRoles(rolesRes.data?.data || []);
    } catch (err) {
      toast.error('Failed to load team');
    } finally { setLoading(false); }
  }, [search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleToggle = async (user) => {
    try {
      await usersAPI.toggleStatus(user._id);
      toast.success(`${user.name} ${user.isActive ? 'deactivated' : 'activated'}`);
      fetchUsers();
    } catch { toast.error('Failed to update status'); }
  };

  const handleResetPassword = async (user) => {
    try {
      await usersAPI.resetPassword(user._id);
      toast.success(`Password reset — new credentials sent to ${user.email}`);
    } catch { toast.error('Failed to reset password'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await usersAPI.delete(deleteTarget._id);
      toast.success('User deleted');
      fetchUsers();
    } catch { toast.error('Failed to delete user'); }
  };

  // Role counts
  const roleCounts = roles.reduce((acc, r) => {
    acc[r.value] = users.filter(u => u.role === r.value).length;
    return acc;
  }, {});

  const divider = dark ? 'border-white/[0.08]' : 'border-slate-200';

  return (
    <>
      <Header title="Team Management" subtitle="Manage user accounts and role permissions" />
      <div className="p-5 lg:p-6 space-y-6 animate-fade-in">

        {/* Role overview cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(ROLE_CONFIG).filter(r => r !== 'admin').map(role => (
            <RoleStat key={role} role={role} count={roleCounts[role] || 0} />
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
              <input
                className="input pl-9 w-full sm:w-64"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Role filter */}
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="input w-full sm:w-auto"
            >
              <option value="all">All Roles</option>
              {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <UserPlus size={15} /> Add Team Member
          </button>
        </div>

        {/* Users table */}
        <div className="admin-table">
          {loading ? (
            <div className="flex items-center justify-center py-16"><Spinner size={28} /></div>
          ) : users.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No team members yet"
              description="Add your first team member to delegate access."
              action={<button className="btn-primary flex items-center gap-2" onClick={() => setShowCreate(true)}><UserPlus size={14} /> Add Team Member</button>}
            />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${divider}`}>
                  {['Member', 'Role', 'Status', 'Last Login', 'Created', ''].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  const cfg = ROLE_CONFIG[user.role] || ROLE_CONFIG.admin;
                  const Icon = cfg.icon || UserCog;
                  return (
                    <tr key={user._id} className={`border-b ${divider} hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors`}>
                      {/* Member */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                            {user.avatar
                              ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              : user.name?.[0]?.toUpperCase()
                            }
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-brand-muted">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                          <Icon size={11} /> {cfg.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
                          ${user.isActive
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/15 text-red-600 dark:text-red-400'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-sm">
                        {user.lastLogin ? format(new Date(user.lastLogin), 'MMM d, yyyy') : 'Never'}
                      </td>

                      {/* Created */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-500 text-sm">
                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4">
                        <ActionsMenu
                          user={user}
                          onEdit={() => setEditUser(user)}
                          onToggle={() => handleToggle(user)}
                          onResetPwd={() => {
                            setResetTarget(user);
                          }}
                          onDelete={() => setDeleteTarget(user)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Permissions reference card */}
        <div className="card p-5">
          <h3 className="section-title mb-4 text-slate-900 dark:text-white">Role Permissions Reference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {roles.map(role => {
              const cfg = ROLE_CONFIG[role.value];
              if (!cfg) return null;
              const Icon = cfg.icon;
              return (
                <div key={role.value} className={`p-4 rounded-2xl border ${dark ? 'border-white/[0.08] bg-white/[0.02]' : 'border-slate-100 bg-slate-50'}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cfg.badge}`}>
                      <Icon size={15} />
                    </div>
                    <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>{cfg.label}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {(role.permissions || []).map(p => (
                      <li key={p} className="flex items-center gap-2 text-xs text-brand-muted">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.badge.includes('cyan') ? 'bg-cyan-500' : cfg.badge.includes('emerald') ? 'bg-emerald-500' : 'bg-violet-500'}`} />
                        {p.replace(/_/g, ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      {(showCreate || editUser) && (
        <UserModal
          user={editUser}
          roles={roles}
          onClose={() => { setShowCreate(false); setEditUser(null); }}
          onSave={fetchUsers}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This cannot be undone.`}
        confirmText="Delete User"
      />

      <ConfirmDialog
        isOpen={!!resetTarget}
        onClose={() => setResetTarget(null)}
        onConfirm={() => handleResetPassword(resetTarget)}
        title="Reset Password"
        message={`A new temporary password will be generated and emailed to ${resetTarget?.email}. They will need to change it on next login.`}
        confirmText="Reset Password"
      />
    </>
  );
}
