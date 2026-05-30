import { Loader2 } from 'lucide-react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Spinner({
  size = 20
}) {
  return /*#__PURE__*/_jsx(Loader2, {
    size: size,
    className: "animate-spin text-primary-400"
  });
}
export function LoadingScreen() {
  return /*#__PURE__*/_jsx("div", {
    className: "flex items-center justify-center h-64",
    children: /*#__PURE__*/_jsxs("div", {
      className: "flex flex-col items-center gap-3",
      children: [/*#__PURE__*/_jsx(Spinner, {
        size: 32
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm text-brand-muted",
        children: "Loading..."
      })]
    })
  });
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col items-center justify-center py-16 text-center",
    children: [/*#__PURE__*/_jsx("div", {
      className: "w-14 h-14 rounded-full bg-brand-border flex items-center justify-center mb-4",
      children: /*#__PURE__*/_jsx(Icon, {
        size: 24,
        className: "text-brand-muted"
      })
    }), /*#__PURE__*/_jsx("h3", {
      className: "text-white font-medium mb-1",
      children: title
    }), /*#__PURE__*/_jsx("p", {
      className: "text-sm text-brand-muted max-w-sm",
      children: description
    }), action && /*#__PURE__*/_jsx("div", {
      className: "mt-4",
      children: action
    })]
  });
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) {
  if (!isOpen) return null;
  const w = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
  }[size];
  return /*#__PURE__*/_jsxs("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    children: [/*#__PURE__*/_jsx("div", {
      className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
      onClick: onClose
    }), /*#__PURE__*/_jsxs("div", {
      className: `relative w-full ${w} card p-6 animate-slide-up max-h-[90vh] overflow-y-auto`,
      children: [/*#__PURE__*/_jsx("h2", {
        className: "section-title mb-4",
        children: title
      }), children]
    })]
  });
}
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete'
}) {
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: isOpen,
    onClose: onClose,
    title: title,
    size: "sm",
    children: [/*#__PURE__*/_jsx("p", {
      className: "text-sm text-brand-muted mb-6",
      children: message
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex gap-3 justify-end",
      children: [/*#__PURE__*/_jsx("button", {
        onClick: onClose,
        className: "btn-secondary",
        children: "Cancel"
      }), /*#__PURE__*/_jsx("button", {
        onClick: () => {
          onConfirm();
          onClose();
        },
        className: "btn-primary bg-red-600 hover:bg-red-700",
        children: confirmText
      })]
    })]
  });
}
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = 'purple'
}) {
  const clr = {
    purple: 'bg-primary-500/10 text-primary-400',
    green: 'bg-emerald-500/10 text-emerald-400',
    red: 'bg-red-500/10 text-red-400',
    blue: 'bg-blue-500/10 text-blue-400',
    yellow: 'bg-yellow-500/10 text-yellow-400'
  }[color];
  return /*#__PURE__*/_jsxs("div", {
    className: "stat-card",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-start justify-between mb-3",
      children: [/*#__PURE__*/_jsx("div", {
        className: `w-9 h-9 rounded-lg flex items-center justify-center ${clr}`,
        children: /*#__PURE__*/_jsx(Icon, {
          size: 18
        })
      }), trend && /*#__PURE__*/_jsxs("span", {
        className: `text-xs font-medium ${trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`,
        children: [trend.value >= 0 ? '+' : '', trend.value, "%"]
      })]
    }), /*#__PURE__*/_jsx("p", {
      className: "text-2xl font-display font-bold text-white mb-0.5",
      children: value
    }), /*#__PURE__*/_jsx("p", {
      className: "text-xs text-brand-muted",
      children: label
    })]
  });
}
export function Table({
  headers,
  rows,
  loading
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "overflow-x-auto",
    children: /*#__PURE__*/_jsxs("table", {
      className: "w-full text-sm",
      children: [/*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsx("tr", {
          className: "border-b border-brand-border",
          children: headers.map(h => /*#__PURE__*/_jsx("th", {
            className: "text-left py-3 px-4 text-xs font-semibold text-brand-muted uppercase tracking-wider whitespace-nowrap",
            children: h
          }, h))
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: loading ? /*#__PURE__*/_jsx("tr", {
          children: /*#__PURE__*/_jsx("td", {
            colSpan: headers.length,
            className: "text-center py-12",
            children: /*#__PURE__*/_jsx(Spinner, {})
          })
        }) : rows.map((row, i) => /*#__PURE__*/_jsx("tr", {
          className: "border-b border-brand-border/50 hover:bg-brand-border/30 transition-colors",
          children: row.map((cell, j) => /*#__PURE__*/_jsx("td", {
            className: "py-3 px-4 text-white/80",
            children: cell
          }, j))
        }, i))
      })]
    })
  });
}
export function Pagination({
  page,
  pages,
  onPageChange
}) {
  if (pages <= 1) return null;
  return /*#__PURE__*/_jsxs("div", {
    className: "flex items-center justify-between pt-4",
    children: [/*#__PURE__*/_jsxs("p", {
      className: "text-xs text-brand-muted",
      children: ["Page ", page, " of ", pages]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex gap-1",
      children: [/*#__PURE__*/_jsx("button", {
        onClick: () => onPageChange(page - 1),
        disabled: page === 1,
        className: "btn-ghost px-3 disabled:opacity-40",
        children: "\u2190"
      }), Array.from({
        length: Math.min(pages, 5)
      }, (_, i) => i + 1).map(p => /*#__PURE__*/_jsx("button", {
        onClick: () => onPageChange(p),
        className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${p === page ? 'bg-primary-600 text-white' : 'btn-ghost'}`,
        children: p
      }, p)), /*#__PURE__*/_jsx("button", {
        onClick: () => onPageChange(page + 1),
        disabled: page === pages,
        className: "btn-ghost px-3 disabled:opacity-40",
        children: "\u2192"
      })]
    })]
  });
}
export function StatusBadge({
  status
}) {
  const map = {
    sent: 'badge-green',
    paid: 'badge-green',
    success: 'badge-green',
    active: 'badge-green',
    incoming: 'badge-green',
    pending: 'badge-yellow',
    draft: 'badge-yellow',
    failed: 'badge-red',
    overdue: 'badge-red',
    cancelled: 'badge-red',
    outgoing: 'badge-purple'
  };
  return /*#__PURE__*/_jsx("span", {
    className: map[status] || 'badge badge-blue',
    children: status
  });
}
