import { useEffect, useState, useCallback, useMemo } from 'react';
import { ArrowLeftRight, Package, TrendingDown, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, EmptyState, Pagination } from '../components/ui';
import { inventoryAPI } from '../api';
import { format } from 'date-fns';

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
      console.error('Failed to fetch stock movements:', err);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const stats = useMemo(() => {
    const incoming = movements.filter(m => m.type === 'incoming').length;
    const outgoing = movements.filter(m => m.type === 'outgoing').length;

    return { incoming, outgoing, total: movements.length };
  }, [movements]);

  const rows = useMemo(
    () =>
      movements.map(m => {
        const product = m.product || {};

        return [
          <div className="flex flex-col">
            <span className="text-white font-medium">
              {product.name || 'Unknown Product'}
            </span>
            <span className="text-xs text-brand-muted font-mono">
              {product.sku || '—'}
            </span>
          </div>,

          <span
            className={`inline-flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full ${
              m.type === 'incoming'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {m.type === 'incoming' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {m.type}
          </span>,

          <span
            className={`font-bold text-lg ${
              m.type === 'incoming' ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {m.type === 'incoming' ? '+' : '−'}
            {m.quantity}
          </span>,

          <span className="text-primary-400 font-mono text-xs">
            {m.reference || '—'}
          </span>,

          <span className="text-sm text-brand-muted">
            {m.notes || '—'}
          </span>,

          <span className="text-xs text-brand-muted">
            {m.createdAt
              ? format(new Date(m.createdAt), 'MMM d, yyyy • h:mm a')
              : '—'}
          </span>
        ];
      }),
    [movements]
  );

  return (
    <>
      <Header
        title="Stock Movements"
        subtitle="Track all inventory inflow and outflow activity"
      />

      <div className="p-6 space-y-6 animate-fade-in">

        {/* PREMIUM STATS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-muted">Total Movements</p>
              <h3 className="text-xl font-bold text-white">{stats.total}</h3>
            </div>
            <Package className="text-primary-400" />
          </div>

          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-muted">Incoming</p>
              <h3 className="text-xl font-bold text-emerald-400">
                {stats.incoming}
              </h3>
            </div>
            <TrendingUp className="text-emerald-400" />
          </div>

          <div className="card p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-muted">Outgoing</p>
              <h3 className="text-xl font-bold text-red-400">
                {stats.outgoing}
              </h3>
            </div>
            <TrendingDown className="text-red-400" />
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="card p-3 flex gap-2">
          {['all', 'incoming', 'outgoing'].map(t => (
            <button
              key={t}
              onClick={() => {
                setTypeFilter(t);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                typeFilter === t
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-transparent text-brand-muted hover:bg-brand-border'
              }`}
            >
              {t === 'all' ? 'All Movements' : t}
            </button>
          ))}
        </div>

        {/* TABLE CARD */}
        <div className="card overflow-hidden">
          <Table
            headers={[
              'Product',
              'Type',
              'Quantity',
              'Reference',
              'Notes',
              'Date'
            ]}
            rows={rows}
            loading={loading}
          />

          {!loading && movements.length === 0 && (
            <div className="py-10">
              <EmptyState
                icon={ArrowLeftRight}
                title="No stock activity yet"
                description="Incoming and outgoing inventory movements will appear here."
              />
            </div>
          )}

          <div className="px-4 pb-4 pt-2 border-t border-brand-border">
            <Pagination
              page={page}
              pages={pages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}