import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Send, Calendar, FileText, BarChart3, Receipt, Wallet, TrendingUp, Package, ArrowLeftRight, Settings, LogOut, Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const NAV = [{
  group: 'Overview',
  items: [{
    to: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard'
  }]
}, {
  group: 'Messaging',
  items: [{
    to: '/contacts',
    icon: Users,
    label: 'Contacts'
  }, {
    to: '/compose',
    icon: Send,
    label: 'Compose'
  }, {
    to: '/scheduled',
    icon: Calendar,
    label: 'Scheduled'
  }, {
    to: '/templates',
    icon: FileText,
    label: 'Templates'
  }, {
    to: '/logs',
    icon: BarChart3,
    label: 'Message Logs'
  }]
}, {
  group: 'Finance',
  items: [{
    to: '/invoices',
    icon: Receipt,
    label: 'Invoices'
  }, {
    to: '/expenses',
    icon: Wallet,
    label: 'Expenses'
  }, {
    to: '/cashflow',
    icon: TrendingUp,
    label: 'Cash Flow'
  }]
}, {
  group: 'Inventory',
  items: [{
    to: '/inventory',
    icon: Package,
    label: 'Products'
  }, {
    to: '/stock-movements',
    icon: ArrowLeftRight,
    label: 'Stock Movements'
  }]
}, {
  group: 'System',
  items: [{
    to: '/settings',
    icon: Settings,
    label: 'Settings'
  }]
}];
function NavItems({
  collapsed,
  onClose
}) {
  const {
    user,
    logout
  } = useAuth();
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col h-full",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3 px-4 py-5 border-b border-brand-border",
      children: [/*#__PURE__*/_jsx("div", {
        className: "w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0",
        children: /*#__PURE__*/_jsx(Zap, {
          size: 16,
          className: "text-white"
        })
      }), !collapsed && /*#__PURE__*/_jsx("span", {
        className: "font-display font-bold text-white text-lg",
        children: "MessagePro"
      })]
    }), /*#__PURE__*/_jsx("nav", {
      className: "flex-1 overflow-y-auto py-4 px-2 space-y-6",
      children: NAV.map(group => /*#__PURE__*/_jsxs("div", {
        children: [!collapsed && /*#__PURE__*/_jsx("p", {
          className: "text-[10px] font-semibold uppercase tracking-widest text-brand-muted px-3 mb-2",
          children: group.group
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-0.5",
          children: group.items.map(item => /*#__PURE__*/_jsxs(NavLink, {
            to: item.to,
            onClick: onClose,
            className: ({
              isActive
            }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-brand-muted hover:text-white hover:bg-brand-border'}`,
            children: [/*#__PURE__*/_jsx(item.icon, {
              size: 16,
              className: "flex-shrink-0"
            }), !collapsed && /*#__PURE__*/_jsx("span", {
              children: item.label
            })]
          }, item.to))
        })]
      }, group.group))
    }), /*#__PURE__*/_jsx("div", {
      className: "border-t border-brand-border p-4 mt-auto",
      children: /*#__PURE__*/_jsxs("div", {
        className: `flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`,
        children: [/*#__PURE__*/_jsx("div", {
          className: "w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold",
          children: user?.name?.[0]?.toUpperCase() || 'U'
        }), !collapsed && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex-1 min-w-0",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-sm font-medium text-white truncate",
              children: user?.name
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-brand-muted capitalize",
              children: user?.role || 'User'
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: logout,
            className: "p-2 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400",
            children: /*#__PURE__*/_jsx(LogOut, {
              size: 16
            })
          })]
        })]
      })
    })]
  });
}
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("button", {
      onClick: () => setMobileOpen(true),
      className: "fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-brand-card border border-brand-border text-white lg:hidden",
      children: /*#__PURE__*/_jsx(Menu, {
        size: 20
      })
    }), mobileOpen && /*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 bg-black/70 z-40 lg:hidden",
      onClick: () => setMobileOpen(false)
    }), /*#__PURE__*/_jsxs("aside", {
      className: `fixed inset-y-0 left-0 z-50 w-72 bg-brand-card border-r border-brand-border transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`,
      children: [/*#__PURE__*/_jsx("button", {
        onClick: () => setMobileOpen(false),
        className: "absolute top-4 right-4 p-2 text-brand-muted hover:text-white",
        children: /*#__PURE__*/_jsx(X, {
          size: 20
        })
      }), /*#__PURE__*/_jsx(NavItems, {
        collapsed: false,
        onClose: () => setMobileOpen(false)
      })]
    }), /*#__PURE__*/_jsxs("aside", {
      className: `hidden lg:flex flex-col h-screen bg-brand-card border-r border-brand-border transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-64'}`,
      children: [/*#__PURE__*/_jsx(NavItems, {
        collapsed: collapsed
      }), /*#__PURE__*/_jsx("button", {
        onClick: () => setCollapsed(!collapsed),
        className: "absolute top-6 -right-4 z-20 w-8 h-8 rounded-full bg-brand-card border-2 border-brand-border flex items-center justify-center text-white hover:bg-primary-600 hover:border-primary-500 shadow-lg transition-all hover:scale-110",
        title: collapsed ? "Expand Sidebar" : "Collapse Sidebar",
        children: collapsed ? '→' : '←'
      })]
    })]
  });
}
