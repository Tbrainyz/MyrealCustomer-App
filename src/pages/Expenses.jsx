import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Wallet, Trash2, Edit2 } from 'lucide-react';
import Header from '../components/layout/Header';
import {
  Table,
  Modal,
  ConfirmDialog,
  EmptyState,
  Pagination,
  Spinner
} from '../components/ui';
import { expensesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CATS = [
  'Operations',
  'Marketing',
  'Salaries',
  'Utilities',
  'Rent',
  'Transport',
  'Equipment',
  'Software',
  'Other'
];

const COLORS = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#3b82f6',
  '#a855f7',
  '#14b8a6',
  '#f97316',
  '#94a3b8'
];

function ExpenseModal({ expense, onClose, onSave }) {
  const [form, setForm] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Operations',
    date:
      expense?.date?.slice(0, 10) ||
      new Date().toISOString().slice(0, 10)
  });

  const [loading, setLoading] = useState(false);
  const isEdit = !!expense?._id;

  const handleSave = async () => {
    if (!form.description || !form.amount) {
      return toast.error('Description and Amount are required');
    }

    setLoading(true);
    try {
      if (isEdit) {
        await expensesAPI.update(expense._id, form);
        toast.success('Expense updated');
      } else {
        await expensesAPI.create(form);
        toast.success('Expense created');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error('Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title={isEdit ? 'Edit Expense' : 'New Expense'} size="sm">
      <div className="space-y-4">

        <input
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          className="input"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <select
          className="input"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          {CATS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? <Spinner size={14} /> : 'Save'}
          </button>
        </div>

      </div>
    </Modal>
  );
}

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await expensesAPI.getAll({ page });
      const data = res.data?.data || [];
      setExpenses(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load expenses');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const total = useMemo(
    () => expenses.reduce((a, b) => a + Number(b.amount || 0), 0),
    [expenses]
  );

  const avg = useMemo(
    () => (expenses.length ? total / expenses.length : 0),
    [total, expenses]
  );

  const chartData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });

    return Object.keys(map).map((key, i) => ({
      name: key,
      value: map[key],
      color: COLORS[i % COLORS.length]
    }));
  }, [expenses]);

  const rows = useMemo(
    () =>
      expenses.map((e) => [
        <span className="text-white font-medium">{e.description}</span>,
        <span className="text-red-400 font-semibold">
          ₦{Number(e.amount).toLocaleString()}
        </span>,
        <span className="badge badge-blue">{e.category}</span>,
        <span className="text-xs text-brand-muted">
          {format(new Date(e.date), 'MMM d, yyyy')}
        </span>,
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditExpense(e);
              setShowModal(true);
            }}
          >
            <Edit2 size={13} />
          </button>

          <button onClick={() => setDeleteId(e._id)}>
            <Trash2 size={13} />
          </button>
        </div>
      ]),
    [expenses]
  );

  return (
    <>
      <Header
        title="Expenses Dashboard"
        subtitle="Track & analyze your business spending"
      />

      <div className="p-6 space-y-6">

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="card p-5">
            <p className="text-xs text-brand-muted">Total Spend</p>
            <h2 className="text-2xl font-bold text-red-400">
              ₦{total.toLocaleString()}
            </h2>
          </div>

          <div className="card p-5">
            <p className="text-xs text-brand-muted">Average Expense</p>
            <h2 className="text-2xl font-bold text-white">
              ₦{avg.toLocaleString()}
            </h2>
          </div>

          <div className="card p-5">
            <p className="text-xs text-brand-muted">Transactions</p>
            <h2 className="text-2xl font-bold text-primary-400">
              {expenses.length}
            </h2>
          </div>

        </div>

        {/* PIE CHART */}
        <div className="card p-5">
          <h3 className="section-title mb-4">
            Expense Breakdown
          </h3>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap gap-3 mt-4">
            {chartData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: c.color }}
                />
                <span className="text-brand-muted">
                  {c.name} • ₦{c.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">
          <Table
            headers={['Description', 'Amount', 'Category', 'Date', 'Actions']}
            rows={rows}
            loading={loading}
          />

          {!loading && expenses.length === 0 && (
            <EmptyState
              icon={Wallet}
              title="No expenses yet"
              description="Start tracking your business spending"
              action={
                <button
                  className="btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <Plus size={14} /> Add Expense
                </button>
              }
            />
          )}

          <div className="px-4 pb-4">
            <Pagination
              page={page}
              pages={pages}
              onPageChange={setPage}
            />
          </div>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <ExpenseModal
          expense={editExpense}
          onClose={() => {
            setShowModal(false);
            setEditExpense(null);
          }}
          onSave={fetchExpenses}
        />
      )}

      {/* DELETE */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await expensesAPI.delete(deleteId);
          fetchExpenses();
          setDeleteId(null);
        }}
        title="Delete Expense"
        message="This action cannot be undone."
      />
    </>
  );
}