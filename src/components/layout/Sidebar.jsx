import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Send,
  Calendar,
  FileText,
  BarChart3,
  Receipt,
  Wallet,
  TrendingUp,
  Package,
  ArrowLeftRight,
  Settings,
  LogOut,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  {
    group: 'Overview',
    items: [
      {
        to: '/dashboard',
        icon: LayoutDashboard,
        label: 'Dashboard'
      }
    ]
  },
  {
    group: 'Messaging',
    items: [
      {
        to: '/contacts',
        icon: Users,
        label: 'Contacts'
      },
      {
        to: '/compose',
        icon: Send,
        label: 'Compose'
      },
      {
        to: '/scheduled',
        icon: Calendar,
        label: 'Scheduled'
      },
      {
        to: '/templates',
        icon: FileText,
        label: 'Templates'
      },
      {
        to: '/logs',
        icon: BarChart3,
        label: 'Message Logs'
      }
    ]
  },
  {
    group: 'Finance',
    items: [
      {
        to: '/invoices',
        icon: Receipt,
        label: 'Invoices'
      },
      {
        to: '/expenses',
        icon: Wallet,
        label: 'Expenses'
      },
      {
        to: '/cashflow',
        icon: TrendingUp,
        label: 'Cash Flow'
      }
    ]
  },
  {
    group: 'Inventory',
    items: [
      {
        to: '/inventory',
        icon: Package,
        label: 'Products'
      },
      {
        to: '/stock-movements',
        icon: ArrowLeftRight,
        label: 'Stock Movements'
      }
    ]
  },
  {
    group: 'System',
    items: [
      {
        to: '/settings',
        icon: Settings,
        label: 'Settings'
      }
    ]
  }
];

function NavItems({ collapsed, onClose }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div
          className="
            w-10 h-10
            rounded-2xl
            bg-gradient-to-br
            from-primary-500
            via-primary-600
            to-purple-600
            flex
            items-center
            justify-center
            shadow-lg
            shadow-primary-500/20
          "
        >
          <Zap size={18} className="text-white" />
        </div>

        {!collapsed && (
          <div>
            <h2 className="font-display font-bold text-xl text-white">
              MessagePro
            </h2>
            <p className="text-xs text-brand-muted">
              Business Suite
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV.map(group => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted px-3 mb-3">
                {group.group}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `admin-nav-link text-sm font-medium ${
                      isActive
                        ? 'active text-white'
                        : 'text-brand-muted hover:text-white'
                    }`
                  }
                >
                  <item.icon
                    size={18}
                    className="flex-shrink-0"
                  />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-4">
        <div
          className={`admin-card p-3 flex items-center gap-3 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="relative">
            <div
              className="
                w-10 h-10
                rounded-full
                bg-gradient-to-br
                from-primary-500
                to-purple-500
                flex
                items-center
                justify-center
                text-white
                text-sm
                font-semibold
              "
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>

            <div
              className="
                absolute
                bottom-0
                right-0
                w-3
                h-3
                rounded-full
                bg-green-500
                border-2
                border-[#161628]
              "
            />
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-brand-muted capitalize">
                  {user?.role || 'User'}
                </p>
              </div>

              <button
                onClick={logout}
                className="
                  p-2
                  rounded-xl
                  text-brand-muted
                  hover:text-red-400
                  hover:bg-red-500/10
                  transition-all
                "
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="
          fixed
          top-4
          left-4
          z-50
          p-3
          rounded-xl
          glass-dark
          border
          border-white/10
          text-white
          lg:hidden
        "
      >
        <Menu size={20} />
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 admin-sidebar transform transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="
            absolute
            top-4
            right-4
            p-2
            text-brand-muted
            hover:text-white
          "
        >
          <X size={20} />
        </button>

        <NavItems
          collapsed={false}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`admin-sidebar hidden lg:flex flex-col h-[calc(100vh-24px)] transition-all duration-300 flex-shrink-0 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        <NavItems collapsed={collapsed} />

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute
            top-8
            -right-4
            z-20
            w-9
            h-9
            rounded-full
            bg-[#1d1d31]
            border
            border-white/10
            flex
            items-center
            justify-center
            text-white
            shadow-xl
            transition-all
            hover:bg-primary-600
            hover:scale-110
          "
          title={
            collapsed
              ? 'Expand Sidebar'
              : 'Collapse Sidebar'
          }
        >
          {collapsed ? '→' : '←'}
        </button>
      </aside>
    </>
  );
}