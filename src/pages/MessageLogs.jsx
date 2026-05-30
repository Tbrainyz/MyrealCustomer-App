import { useEffect, useState, useCallback, useMemo } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, StatusBadge, EmptyState, Pagination } from '../components/ui';
import { messagesAPI } from '../api';
import { format } from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export default function MessageLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await messagesAPI.getLogs({
        page,
        limit: 20,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        platform: platformFilter !== 'all' ? platformFilter : undefined
      });
      const data = res.data?.data || [];
      setLogs(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch message logs:", err);
      setLogs([]);
      // toast.error("Failed to load message logs");  // Optional
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, platformFilter]);
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);
  const platformColor = {
    whatsapp: 'text-emerald-400',
    facebook: 'text-blue-400',
    instagram: 'text-pink-400',
    sms: 'text-yellow-400'
  };
  const summary = useMemo(() => [{
    label: 'Total',
    value: logs.length,
    color: 'text-white'
  }, {
    label: 'Sent',
    value: logs.filter(l => l.status === 'sent').length,
    color: 'text-emerald-400'
  }, {
    label: 'Pending',
    value: logs.filter(l => l.status === 'pending').length,
    color: 'text-yellow-400'
  }, {
    label: 'Failed',
    value: logs.filter(l => l.status === 'failed').length,
    color: 'text-red-400'
  }], [logs]);
  const rows = useMemo(() => logs.map(l => {
    const contact = l.contact || {};
    return [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("p", {
        className: "text-sm font-medium text-white",
        children: contact.name || 'Unknown'
      }), contact.company && /*#__PURE__*/_jsx("p", {
        className: "text-xs text-brand-muted",
        children: contact.company
      })]
    }), /*#__PURE__*/_jsx("span", {
      className: `text-xs font-semibold ${platformColor[l.platform] || 'text-white'}`,
      children: l.platform || '—'
    }), /*#__PURE__*/_jsx("p", {
      className: "text-sm text-brand-muted max-w-xs truncate",
      children: l.content || ''
    }), /*#__PURE__*/_jsx(StatusBadge, {
      status: l.status
    }), l.error ? /*#__PURE__*/_jsx("span", {
      className: "text-xs text-red-400",
      children: l.error
    }) : /*#__PURE__*/_jsx("span", {
      className: "text-brand-muted text-xs",
      children: "\u2014"
    }), /*#__PURE__*/_jsx("span", {
      className: "text-xs text-brand-muted",
      children: l.sentAt ? format(new Date(l.sentAt), 'MMM d, h:mm a') : '—'
    })];
  }), [logs]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Message Logs",
      subtitle: "Track all message delivery status"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-4",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex gap-3 flex-wrap",
        children: summary.map(s => /*#__PURE__*/_jsxs("div", {
          className: "card px-4 py-3 flex items-center gap-2",
          children: [/*#__PURE__*/_jsxs("span", {
            className: "text-sm text-brand-muted",
            children: [s.label, ":"]
          }), /*#__PURE__*/_jsx("span", {
            className: `text-lg font-display font-bold ${s.color}`,
            children: s.value
          })]
        }, s.label))
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex flex-wrap gap-3 items-center justify-between",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex gap-2 flex-wrap",
          children: ['all', 'sent', 'pending', 'failed'].map(s => /*#__PURE__*/_jsx("button", {
            onClick: () => {
              setStatusFilter(s);
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${statusFilter === s ? 'bg-primary-600 text-white' : 'btn-ghost'}`,
            children: s
          }, s))
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-2",
          children: [/*#__PURE__*/_jsxs("select", {
            value: platformFilter,
            onChange: e => {
              setPlatformFilter(e.target.value);
              setPage(1);
            },
            className: "input w-36 text-xs",
            children: [/*#__PURE__*/_jsx("option", {
              value: "all",
              children: "All Platforms"
            }), /*#__PURE__*/_jsx("option", {
              value: "whatsapp",
              children: "WhatsApp"
            }), /*#__PURE__*/_jsx("option", {
              value: "facebook",
              children: "Facebook"
            }), /*#__PURE__*/_jsx("option", {
              value: "instagram",
              children: "Instagram"
            }), /*#__PURE__*/_jsx("option", {
              value: "sms",
              children: "SMS"
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: fetchLogs,
            className: "btn-secondary",
            children: /*#__PURE__*/_jsx(RefreshCw, {
              size: 14
            })
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Contact', 'Platform', 'Message', 'Status', 'Error', 'Time'],
          rows: rows,
          loading: loading
        }), !loading && logs.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: BarChart3,
          title: "No message logs yet",
          description: "Your sent messages will appear here"
        }), /*#__PURE__*/_jsx("div", {
          className: "px-4 pb-4",
          children: /*#__PURE__*/_jsx(Pagination, {
            page: page,
            pages: pages,
            onPageChange: setPage
          })
        })]
      })]
    })]
  });
}
