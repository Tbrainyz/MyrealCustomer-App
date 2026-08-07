import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  BookOpen, TrendingUp, TrendingDown, Wallet, Download,
  Calendar, Filter, ArrowUpRight, ArrowDownRight, Package
} from 'lucide-react';
import Header from '../components/layout/Header';
import { Pagination, Spinner, EmptyState } from '../components/ui';
import { bookkeepingAPI, downloadBlob } from '../api';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function SummaryCard({ label, value, icon: Icon, color, dark }) {
  const cls = {
    green: 'bg-emerald-500/15 text-emerald-500',
    red:   'bg-red-500/15 text-red-500',
    blue:  'bg-primary-500/15 text-primary-500',
  }[color];

  return (
    <div className="admin-stat-card p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${cls}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        ₦{value.toLocaleString()}
      </p>
      <p className="text-xs text-brand-muted mt-0.5">{label}</p>
    </div>
  );
}

export default function BookKeeping() {
  const { dark } = useTheme();

  const [entries, setEntries]   = useState([]);
  const [summary, setSummary]   = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0, totalEntries: 0 });
  const [inventorySummary, setInventorySummary] = useState({ totalProducts: 0, totalStockValue: 0, totalRetailValue: 0, potentialProfit: 0, lowStockCount: 0 });
  const [loading, setLoading]   = useState(true);
  const [exporting, setExporting] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate]     = useState('');

  const fetchLedger = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (typeFilter !== 'all') params.type = typeFilter;
      if (fromDate) params.from = fromDate;
      if (toDate)   params.to   = toDate;

      const res = await bookkeepingAPI.getLedger(params);
      setEntries(res.data?.data || []);
      setSummary(res.data?.summary || { totalIncome: 0, totalExpenses: 0, netBalance: 0, totalEntries: 0 });
      setInventorySummary(res.data?.inventorySummary || { totalProducts: 0, totalStockValue: 0, totalRetailValue: 0, potentialProfit: 0, lowStockCount: 0 });
      setPages(res.data?.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load ledger');
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter, fromDate, toDate]);

  useEffect(() => { fetchLedger(); }, [fetchLedger]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = {};
      if (typeFilter !== 'all') params.type = typeFilter;
      if (fromDate) params.from = fromDate;
      if (toDate)   params.to   = toDate;

      const res = await bookkeepingAPI.exportCSV(params);
      downloadBlob(res.data, `bookkeeping_ledger_${new Date().toISOString().slice(0, 10)}.xlsx`);
      toast.success('Ledger exported');
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

  return (
    <>
      <Header title="Book Keeping" subtitle="Unified ledger — Finance & Inventory" />
      <div className="p-5 lg:p-6 space-y-6 animate-fade-in">

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Income"   value={summary.totalIncome}   icon={TrendingUp}   color="green" dark={dark} />
          <SummaryCard label="Total Expenses" value={summary.totalExpenses} icon={TrendingDown} color="red"   dark={dark} />
          <SummaryCard label="Net Balance"    value={summary.netBalance}    icon={Wallet}       color="blue"  dark={dark} />
          <div className="admin-stat-card p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-violet-500/15 text-violet-500">
              <BookOpen size={18} />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{summary.totalEntries}</p>
            <p className="text-xs text-brand-muted mt-0.5">Total Entries</p>
          </div>
        </div>

        {/* Inventory summary */}
        <div className="card p-5">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <Package size={16} /> Inventory Overview
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

        {/* Filters + Export */}
        <div className="card p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-brand-muted" />
              <select
                value={typeFilter}
                onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
                className="input !py-1.5 !text-sm w-auto"
              >
                <option value="all">All Entries</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-brand-muted" />
              <input
                type="date"
                value={fromDate}
                onChange={e => { setFromDate(e.target.value); setPage(1); }}
                className="input !py-1.5 !text-sm w-auto"
                placeholder="From"
              />
              <span className="text-brand-muted text-sm">to</span>
              <input
                type="date"
                value={toDate}
                onChange={e => { setToDate(e.target.value); setPage(1); }}
                className="input !py-1.5 !text-sm w-auto"
                placeholder="To"
              />
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-primary-400 hover:text-primary-300 font-medium">
                Clear filters
              </button>
            )}

            <button
              onClick={handleExport}
              disabled={exporting}
              className="btn-primary flex items-center gap-2 ml-auto"
            >
              <Download size={14} /> {exporting ? 'Exporting...' : 'Export Ledger'}
            </button>
          </div>
        </div>

        {/* Ledger table */}
        <div className="admin-table">
          {loading ? (
            <div className="flex items-center justify-center py-16"><Spinner size={28} /></div>
          ) : entries.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No ledger entries found"
              description={hasFilters ? "Try adjusting your filters." : "Paid invoices and expenses will appear here automatically."}
            />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${dark ? 'border-white/[0.08]' : 'border-slate-200'}`}>
                  {['Date', 'Type', 'Category', 'Description', 'Reference', 'Income', 'Expense', 'Balance'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id} className={`border-b ${dark ? 'border-white/[0.06]' : 'border-slate-100'} hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors`}>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {format(new Date(entry.date), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                        ${entry.type === 'income'
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : 'bg-red-500/15 text-red-500'}`}>
                        {entry.type === 'income' ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                        {entry.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{entry.category}</td>
                    <td className="py-3 px-4 text-slate-800 dark:text-white font-medium max-w-xs truncate">{entry.description}</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-500 font-mono text-xs">{entry.reference}</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">
                      {entry.type === 'income' ? `₦${entry.amount.toLocaleString()}` : ''}
                    </td>
                    <td className="py-3 px-4 text-red-500 font-semibold">
                      {entry.type === 'expense' ? `₦${entry.amount.toLocaleString()}` : ''}
                    </td>
                    <td className="py-3 px-4 text-slate-800 dark:text-white font-bold whitespace-nowrap">
                      ₦{entry.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && entries.length > 0 && (
            <div className="p-4">
              <Pagination page={page} pages={pages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
