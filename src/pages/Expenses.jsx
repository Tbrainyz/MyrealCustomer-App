import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Wallet, Trash2, Edit2 } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, Modal, ConfirmDialog, EmptyState, Pagination, Spinner } from '../components/ui';
import { expensesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const CATS = ['Operations','Marketing','Salaries','Utilities','Rent','Transport','Equipment','Software','Other'];

function ExpenseModal({ expense, onClose, onSave }) {
  const [form, setForm] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Operations',
    date: expense?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!expense?._id;

  const handleSave = async () => {
    if (!form.description || !form.amount) return toast.error('Description and Amount are required');
    setLoading(true);
    try {
      if (isEdit) { await expensesAPI.update(expense._id, form); toast.success('Expense updated'); }
      else { await expensesAPI.create(form); toast.success('Expense created'); }
      onSave(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save expense'); }
    finally { setLoading(false); }
  };

  return (
    <Modal isOpen onClose={onClose} title={isEdit ? 'Edit Expense' : 'New Expense'} size="sm">
      <div className="space-y-4">
        <div><label className="label">Description *</label><input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input" placeholder="e.g. Office rent" /></div>
        <div><label className="label">Amount (₦) *</label><input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="input" placeholder="0" min="0" /></div>
        <div>
          <label className="label">Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input">
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><label className="label">Date</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input" /></div>
      </div>
      <div className="flex gap-3 justify-end mt-6">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={handleSave} disabled={loading} className="btn-primary">{loading ? <Spinner size={14} /> : 'Save Expense'}</button>
      </div>
    </Modal>
  );
}

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [catFilter, setCatFilter] = useState('all');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await expensesAPI.getAll({ page, limit: 20, category: catFilter !== 'all' ? catFilter : undefined });
      const data = res.data?.data || [];
      setExpenses(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch { setExpenses([]); }
    finally { setLoading(false); }
  }, [page, catFilter]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  const total = useMemo(() => expenses.reduce((s, e) => s + Number(e.amount || 0), 0), [expenses]);

  const handleDelete = async (id) => {
    try { await expensesAPI.delete(id); toast.success('Expense deleted'); fetchExpenses(); }
    catch { toast.error('Failed to delete'); }
  };

  const rows = expenses.map(e => [
    <span className="text-slate-800 dark:text-white font-medium">{e.description}</span>,
    <span className="badge badge-blue">{e.category}</span>,
    <span className="text-slate-700 dark:text-white font-semibold">₦{Number(e.amount).toLocaleString()}</span>,
    <span className="text-slate-500 dark:text-brand-muted">{e.date ? format(new Date(e.date), 'MMM d, yyyy') : '—'}</span>,
    <div className="flex gap-2">
      <button onClick={() => setModal(e)} className="p-1.5 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all"><Edit2 size={14} /></button>
      <button onClick={() => setDeleteTarget(e._id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={14} /></button>
    </div>
  ]);

  return (
    <>
      <Header title="Expenses" subtitle="Track your business spending" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="admin-stat-card p-5">
            <Wallet size={18} className="text-red-400 mb-3" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">₦{total.toLocaleString()}</p>
            <p className="text-xs text-brand-muted mt-0.5">Total Expenses (this page)</p>
          </div>
          <div className="admin-stat-card p-5">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{expenses.length}</p>
            <p className="text-xs text-brand-muted mt-0.5">Records Shown</p>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-200 dark:border-brand-border">
            <h2 className="section-title">All Expenses</h2>
            <div className="flex gap-2 flex-wrap">
              <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }} className="input !py-1.5 !text-sm w-auto">
                <option value="all">All Categories</option>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => setModal({})} className="btn-primary gap-2"><Plus size={15} /> Add Expense</button>
            </div>
          </div>
          <div className="p-4">
            {expenses.length === 0 && !loading
              ? <EmptyState icon={Wallet} title="No expenses yet" description="Add your first expense to start tracking spending." action={<button onClick={() => setModal({})} className="btn-primary gap-2"><Plus size={14} /> Add Expense</button>} />
              : <Table headers={['Description', 'Category', 'Amount', 'Date', '']} rows={rows} loading={loading} />
            }
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </div>
        </div>
      </div>

      {modal !== null && <ExpenseModal expense={modal?._id ? modal : undefined} onClose={() => setModal(null)} onSave={fetchExpenses} />}
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => handleDelete(deleteTarget)} title="Delete Expense" message="Are you sure you want to delete this expense?" confirmText="Delete" />
    </>
  );
}
