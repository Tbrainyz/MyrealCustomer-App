import { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, EmptyState, Pagination, StatusBadge } from '../components/ui';
import { inventoryAPI } from '../api';
import { format } from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export default function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const fetchMovements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await inventoryAPI.getMovements({
        page,
        type: typeFilter !== 'all' ? typeFilter : undefined
      });
      const data = res.data?.data || [];
      setMovements(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch stock movements:", err);
      setMovements([]);
      // toast.error("Failed to load stock movements"); // Optional
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter]);
  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);
  const rows = useMemo(() => movements.map(m => {
    const product = m.product || {};
    return [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("p", {
        className: "text-white font-medium",
        children: product.name || 'Unknown Product'
      }), /*#__PURE__*/_jsx("p", {
        className: "text-xs font-mono text-brand-muted",
        children: product.sku || ''
      })]
    }), /*#__PURE__*/_jsx(StatusBadge, {
      status: m.type
    }), /*#__PURE__*/_jsxs("span", {
      className: `font-display font-bold text-lg ${m.type === 'incoming' ? 'text-emerald-400' : 'text-red-400'}`,
      children: [m.type === 'incoming' ? '+' : '−', m.quantity]
    }), /*#__PURE__*/_jsx("span", {
      className: "font-mono text-xs text-primary-400",
      children: m.reference || '—'
    }), /*#__PURE__*/_jsx("span", {
      className: "text-sm text-brand-muted",
      children: m.notes || '—'
    }), /*#__PURE__*/_jsx("span", {
      className: "text-xs text-brand-muted",
      children: m.createdAt ? format(new Date(m.createdAt), 'MMM d, yyyy h:mm a') : '—'
    })];
  }), [movements]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Stock Movements",
      subtitle: "All incoming and outgoing stock records"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-4",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex gap-2",
        children: ['all', 'incoming', 'outgoing'].map(t => /*#__PURE__*/_jsx("button", {
          onClick: () => {
            setTypeFilter(t);
            setPage(1);
          },
          className: `px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${typeFilter === t ? 'bg-primary-600 text-white' : 'btn-ghost'}`,
          children: t === 'all' ? 'All Movements' : t
        }, t))
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Product', 'Type', 'Quantity', 'Reference', 'Notes', 'Date'],
          rows: rows,
          loading: loading
        }), !loading && movements.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: ArrowLeftRight,
          title: "No stock movements yet",
          description: "Stock movements will appear here when you adjust inventory"
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
