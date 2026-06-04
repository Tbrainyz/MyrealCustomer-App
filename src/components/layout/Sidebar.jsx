import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Send, Calendar, FileText, BarChart3,
  Receipt, Wallet, TrendingUp, Package, ArrowLeftRight,
  Settings, LogOut, Menu, X, Zap, ChevronLeft, ChevronRight,
  UserCog,
} from 'lucide-react';
import { useAuth, ROLE_LABELS } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// ─── Full nav definition ───────────────────────────────────────────────────────
// Each item has an optional `roles` array — if present, only those roles see it.
// Admin always sees everything. If no `roles` key → visible to all authenticated users.
const NAV = [
  {
    group: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    group: 'Messaging',
    roles: ['messaging_manager'],          // group only shown to these roles (+ admin)
    items: [
      { to: '/contacts',  icon: Users,      label: 'Contacts'      },
      { to: '/compose',   icon: Send,        label: 'Compose'       },
      { to: '/scheduled', icon: Calendar,    label: 'Scheduled'     },
      { to: '/templates', icon: FileText,    label: 'Templates'     },
      { to: '/logs',      icon: BarChart3,   label: 'Message Logs'  },
    ],
  },
  {
    group: 'Finance',
    roles: ['finance_manager'],
    items: [
      { to: '/invoices', icon: Receipt,   label: 'Invoices'  },
      { to: '/expenses', icon: Wallet,    label: 'Expenses'  },
      { to: '/cashflow', icon: TrendingUp, label: 'Cash Flow' },
    ],
  },
  {
    group: 'Inventory',
    roles: ['inventory_manager'],
    items: [
      { to: '/inventory',       icon: Package,        label: 'Products'        },
      { to: '/stock-movements', icon: ArrowLeftRight, label: 'Stock Movements' },
    ],
  },
  {
    group: 'System',
    items: [
      { to: '/team',     icon: UserCog,  label: 'Team',     adminOnly: true },
      { to: '/settings', icon: Settings, label: 'Settings'  },
    ],
  },
];

const ROLE_BADGE = {
  admin:              { label: 'Admin',     cls: 'bg-primary-500/15 text-primary-500' },
  inventory_manager:  { label: 'Inventory', cls: 'bg-cyan-500/15 text-cyan-500'       },
  finance_manager:    { label: 'Finance',   cls: 'bg-emerald-500/15 text-emerald-500' },
  messaging_manager:  { label: 'Messaging', cls: 'bg-violet-500/15 text-violet-500'   },
};

function NavItems({ collapsed, onClose }) {
  const { user, logout } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();
  const role = user?.role;

  const divider     = dark ? 'border-white/[0.07]' : 'border-slate-200';
  const groupLabel  = dark ? 'text-slate-600'       : 'text-slate-400';
  const linkDefault = dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900';
  const userBg      = dark ? 'bg-white/[0.04] border-white/[0.07]' : 'bg-slate-50 border-slate-200';
  const badge       = ROLE_BADGE[role] || ROLE_BADGE.admin;

  // Filter groups by role
  const visibleGroups = NAV.map(group => {
    // Group-level role filter
    const groupVisible = !group.roles || role === 'admin' || group.roles.includes(role);
    if (!groupVisible) return null;

    // Item-level filters
    const items = group.items.filter(item => {
      if (item.adminOnly) return role === 'admin';
      return true;
    });
    if (!items.length) return null;

    return { ...group, items };
  }).filter(Boolean);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b ${divider} shrink-0`}>
        <div className="w-9 h-9 rounded-[14px] bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20 shrink-0">
          <Zap size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <h2 className={`font-display font-bold text-[15px] leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
              My Real Customer
            </h2>
            <p className={`text-[11px] ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Business Suite</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {visibleGroups.map(group => (
          <div key={group.group}>
            {!collapsed && (
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] px-3 mb-1.5 ${groupLabel}`}>
                {group.group}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `admin-nav-link text-sm font-medium ${collapsed ? 'justify-center px-2' : ''} ${
                      isActive
                        ? 'active ' + (dark ? 'text-white' : 'text-primary-700')
                        : linkDefault
                    }`
                  }
                >
                  <item.icon size={17} className="flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User info + logout */}
      <div className={`border-t p-3 shrink-0 ${divider}`}>
        <div className={`rounded-2xl p-3 border flex items-center gap-3 ${userBg} ${collapsed ? 'justify-center' : ''}`}>
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
              {user?.avatar
                ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                : user?.name?.[0]?.toUpperCase()
              }
            </div>
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${dark ? 'border-[#0a0f1e]' : 'border-white'} ${user?.isActive ? 'bg-green-500' : 'bg-slate-400'}`} />
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${dark ? 'text-white' : 'text-slate-800'}`}>{user?.name}</p>
                <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-1.5 rounded-xl transition-all text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                title="Sign out"
              >
                <LogOut size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { dark } = useTheme();
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const collapseBtn = dark
    ? 'bg-[#1d1d31] border-white/10 text-white hover:bg-primary-600'
    : 'bg-white border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-700 shadow-sm';

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`fixed top-4 left-4 z-50 p-2.5 rounded-xl border lg:hidden
          ${dark ? 'bg-white/[0.07] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}
      >
        <Menu size={18} />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 admin-sidebar transform transition-transform duration-300 lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
        >
          <X size={18} />
        </button>
        <NavItems collapsed={false} onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className={`admin-sidebar hidden lg:flex flex-col h-[calc(100vh-24px)] relative transition-all duration-300 flex-shrink-0
        ${collapsed ? 'w-[68px]' : 'w-[230px]'}`}>
        <NavItems collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(v => !v)}
          className={`absolute top-[72px] -right-3.5 z-20 w-7 h-7 rounded-full border flex items-center justify-center shadow transition-all ${collapseBtn}`}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </aside>
    </>
  );
}
