import { useEffect, useState, useCallback } from 'react';
import {
  BookOpen, TrendingUp, TrendingDown, Wallet, Download,
  Calendar, Filter, ArrowUpRight, ArrowDownRight, Package,
  ArrowLeftRight, Boxes
} from 'lucide-react';
import Header from '../components/layout/Header';
import { Pagination, Spinner, EmptyState } from '../components/ui';
import { bookkeepingAPI, downloadBlob } from '../api';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function SummaryCard({ label, value, icon: Icon, color }) {
  const cls = {
    green:  'bg-emerald-500/15 text-emerald-500',
    red:    'bg-red-500/15 text-red-500',
    blue:   'bg-primary-500/15 text-primary-500',
    violet: 'bg-violet-500/15 text-violet-500',
  }[color];

  return (
    <div className="admin-stat-card p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${cls}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {typeof value === 'number' && value > 999 ? `₦${value.toLocaleString()}` : value}
      </p>
      <p className="text-xs text-brand-muted mt-0.5">{label}</p>
    </div>
  );
}

const TABS = [
  { id: 'ledger',    label: 'Reporting',       icon: BookOpen },
  { id: 'movements', label: 'Stock Movements', icon: ArrowLeftRight },
  { id: 'products',  label: 'Products',        icon: Boxes },
];

export default function BookKeeping() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState('ledger');

  const [ledger, setLedger]         = useState([]);
  const [movements, setMovements]   = useState([]);
  const [products, setProducts]     = useState([]);
  const [summary, setSummary]       = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0, totalEntries: 0 });
  const [inventorySummary, setInventorySummary] = useState({ totalProducts: 0, totalStockValue: 0, totalRetailValue: 0, potentialProfit: 0, lowStockCount: 0 });
  const [pagination, setPagination] = useState({});
  const [loading, setLoading]       = useState(true);
  const [exporting, setExporting]   = useState(false);

  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate]     = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (typeFilter !== 'all') params.type = typeFilter;
      if (fromDate) params.from = fromDate;
      if (toDate)   params.to   = toDate;

      const res = await bookkeepingAPI.getLedger(params);
      const d = res.data;
      setLedger(d?.data?.ledger || []);
      setMovements(d?.data?.movements || []);
      setProducts(d?.data?.products || []);
      setSummary(d?.summary || { totalIncome: 0, totalExpenses: 0, netBalance: 0, totalEntries: 0 });
      setInventorySummary(d?.inventorySummary || { totalProducts: 0, totalStockValue: 0, totalRetailValue: 0, potentialProfit: 0, lowStockCount: 0 });
      setPagination(d?.pagination || {});
    } catch {
      toast.error('Failed to load book keeping data');
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter, fromDate, toDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = {};
      if (typeFilter !== 'all') params.type = typeFilter;
      if (fromDate) params.from = fromDate;
      if (toDate)   params.to   = toDate;

      const res = await bookkeepingAPI.exportCSV(params);
      downloadBlob(res.data, `bookkeeping_full_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
      toast.success('Full report exported (Ledger + Stock Movements + Products)');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setFromDate('');
    setToDate('');
    setPage(1);
  };

  const hasFilters = typeFilter !== 'all' || fromDate || toDate;
  const currentPages = pagination[activeTab]?.pages || 1;

  const border = dark ? 'border-white/[0.08]' : 'border-slate-200';
  const rowBorder = dark ? 'border-white/[0.06]' : 'border-slate-100';
  const rowHover = dark ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50';
  const th = 'text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap';

  return (
    <>
      <Header title="Book Keeping" subtitle="Unified records — Finance & Inventory" />
      <div className="p-5 lg:p-6 space-y-6 animate-fade-in">

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Income"   value={summary.totalIncome}   icon={TrendingUp}   color="green" />
          <SummaryCard label="Total Expenses" value={summary.totalExpenses} icon={TrendingDown} color="red" />
          <SummaryCard label="Net Balance"    value={summary.netBalance}    icon={Wallet}       color="blue" />
          <SummaryCard label="Stock Value"    value={inventorySummary.totalStockValue} icon={Package} color="violet" />
        </div>

        {/* Inventory quick stats */}
        <div className="card p-5">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <Boxes size={16} /> Inventory Overview
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{inventorySummary.totalProducts}</p>
              <p className="text-xs text-brand-muted">Total Products</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">₦{inventorySummary.totalStockValue.toLocaleString()}</p>
              <p className="text-xs text-brand-muted">Stock Value (Cost)</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">₦{inventorySummary.totalRetailValue.toLocaleString()}</p>
              <p className="text-xs text-brand-muted">Retail Value</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-500">₦{inventorySummary.potentialProfit.toLocaleString()}</p>
              <p className="text-xs text-brand-muted">Potential Profit</p>
            </div>
            <div>
              <p className={`text-lg font-bold ${inventorySummary.lowStockCount > 0 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                {inventorySummary.lowStockCount}
              </p>
              <p className="text-xs text-brand-muted">Low Stock Items</p>
            </div>
          </div>
        </div>

        {/* Tabs + Filters + Export */}
        <div className="card p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all
                    ${activeTab === tab.id
                      ? 'bg-primary-500/15 text-primary-500'
                      : dark ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            <button onClick={handleExport} disabled={exporting} className="btn-primary flex items-center gap-2">
              <Download size={14} /> {exporting ? 'Exporting...' : 'Export Full Report'}
            </button>
          </div>

          {activeTab === 'ledger' && (
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-brand-muted" />
                <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }} className="input !py-1.5 !text-sm w-auto">
                  <option value="all">All Entries</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-brand-muted" />
                <input type="date" value={fromDate} onChange={e => { setFromDate(e.target.value); setPage(1); }} className="input !py-1.5 !text-sm w-auto" />
                <span className="text-brand-muted text-sm">to</span>
                <input type="date" value={toDate} onChange={e => { setToDate(e.target.value); setPage(1); }} className="input !py-1.5 !text-sm w-auto" />
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-primary-400 hover:text-primary-300 font-medium">
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content tables */}
        <div className="admin-table">
          {loading ? (
            <div className="flex items-center justify-center py-16"><Spinner size={28} /></div>
          ) : (
            <>
              {/* LEDGER TAB */}
              {activeTab === 'ledger' && (
                ledger.length === 0 ? (
                  <EmptyState icon={BookOpen} title="No reporting entries" description="Paid invoices and expenses will appear here." />
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${border}`}>
                        {['Date', 'Type', 'Category', 'Description', 'Reference', 'Income', 'Expense', 'Balance'].map(h => <th key={h} className={th}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {ledger.map(e => (
                        <tr key={e.id} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{format(new Date(e.date), 'MMM d, yyyy')}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${e.type === 'income' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'}`}>
                              {e.type === 'income' ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                              {e.type === 'income' ? 'Income' : 'Expense'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{e.category}</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-medium max-w-xs truncate">{e.description}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-xs">{e.reference}</td>
                          <td className="py-3 px-4 text-emerald-500 font-semibold">{e.type === 'income' ? `₦${e.amount.toLocaleString()}` : ''}</td>
                          <td className="py-3 px-4 text-red-500 font-semibold">{e.type === 'expense' ? `₦${e.amount.toLocaleString()}` : ''}</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-bold whitespace-nowrap">₦{e.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {/* STOCK MOVEMENTS TAB */}
              {activeTab === 'movements' && (
                movements.length === 0 ? (
                  <EmptyState icon={ArrowLeftRight} title="No stock movements" description="Stock in/out records will appear here." />
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${border}`}>
                        {['Date', 'Product', 'SKU', 'Type', 'Qty', 'Prev → New', 'Value', 'Recorded By'].map(h => <th key={h} className={th}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {movements.map(m => (
                        <tr key={m.id} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{format(new Date(m.date), 'MMM d, yyyy')}</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-medium">{m.product}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-xs">{m.sku}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                              ${m.type === 'incoming' ? 'bg-emerald-500/15 text-emerald-500' : m.type === 'outgoing' ? 'bg-red-500/15 text-red-500' : 'bg-yellow-500/15 text-yellow-500'}`}>
                              {m.type === 'incoming' ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
                              {m.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{m.quantity}</td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-500 text-xs">{m.previousQuantity} → {m.newQuantity}</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-semibold">₦{m.totalValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{m.recordedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}

              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                products.length === 0 ? (
                  <EmptyState icon={Package} title="No products" description="Products will appear here once added to Inventory." />
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${border}`}>
                        {['Product', 'SKU', 'Category', 'Qty', 'Cost Price', 'Selling Price', 'Stock Value', 'Status'].map(h => <th key={h} className={th}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-medium">{p.name}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{p.category}</td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{p.quantity}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">₦{p.costPrice.toLocaleString()}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">₦{p.sellingPrice.toLocaleString()}</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-white font-semibold">₦{p.stockValue.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.status === 'low_stock' ? 'bg-red-500/15 text-red-500' : 'bg-emerald-500/15 text-emerald-500'}`}>
                              {p.status === 'low_stock' ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </>
          )}

          {!loading && (
            (activeTab === 'ledger' && ledger.length > 0) ||
            (activeTab === 'movements' && movements.length > 0) ||
            (activeTab === 'products' && products.length > 0)
          ) && (
            <div className="p-4">
              <Pagination page={page} pages={currentPages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
