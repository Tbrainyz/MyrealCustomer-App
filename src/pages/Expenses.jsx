import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Wallet, Trash2, Edit2 } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, Modal, ConfirmDialog, EmptyState, Pagination, Spinner } from '../components/ui';
import { expensesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const CATS = ['Operations', 'Marketing', 'Salaries', 'Utilities', 'Rent', 'Transport', 'Equipment', 'Software', 'Other'];
function ExpenseModal({
  expense,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Operations',
    date: expense?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10)
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!expense?._id;
  const handleSave = async () => {
    if (!form.description || !form.amount) return toast.error('Description and Amount are required');
    setLoading(true);
    try {
      if (isEdit) {
        await expensesAPI.update(expense._id, form);
        toast.success('Expense updated successfully');
      } else {
        await expensesAPI.create(form);
        toast.success('Expense created successfully');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: isEdit ? 'Edit Expense' : 'New Expense',
    size: "sm",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Description *"
        }), /*#__PURE__*/_jsx("input", {
          value: form.description,
          onChange: e => setForm(f => ({
            ...f,
            description: e.target.value
          })),
          className: "input",
          placeholder: "e.g. Office rent"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Amount (\u20A6) *"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.amount,
          onChange: e => setForm(f => ({
            ...f,
            amount: e.target.value
          })),
          className: "input",
          placeholder: "0",
          min: "0"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Category"
        }), /*#__PURE__*/_jsx("select", {
          value: form.category,
          onChange: e => setForm(f => ({
            ...f,
            category: e.target.value
          })),
          className: "input",
          children: CATS.map(c => /*#__PURE__*/_jsx("option", {
            value: c,
            children: c
          }, c))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Date"
        }), /*#__PURE__*/_jsx("input", {
          type: "date",
          value: form.date,
          onChange: e => setForm(f => ({
            ...f,
            date: e.target.value
          })),
          className: "input"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex gap-3 justify-end mt-6",
      children: [/*#__PURE__*/_jsx("button", {
        onClick: onClose,
        className: "btn-secondary",
        children: "Cancel"
      }), /*#__PURE__*/_jsx("button", {
        onClick: handleSave,
        disabled: loading,
        className: "btn-primary",
        children: loading ? /*#__PURE__*/_jsx(Spinner, {
          size: 14
        }) : 'Save Expense'
      })]
    })]
  });
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
      const res = await expensesAPI.getAll({
        page
      });
      const data = res.data?.data || [];
      setExpenses(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setExpenses([]);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, [page]);
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await expensesAPI.delete(deleteId);
      toast.success('Expense deleted successfully');
      fetchExpenses();
    } catch {
      toast.error('Failed to delete expense');
    } finally {
      setDeleteId(null);
    }
  };
  const total = useMemo(() => expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0), [expenses]);
  const rows = useMemo(() => expenses.map(e => [/*#__PURE__*/_jsx("span", {
    className: "text-white font-medium",
    children: e.description
  }), /*#__PURE__*/_jsxs("span", {
    className: "font-display font-semibold text-red-400",
    children: ["\u20A6", Number(e.amount).toLocaleString()]
  }), /*#__PURE__*/_jsx("span", {
    className: "badge badge-blue",
    children: e.category
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs text-brand-muted",
    children: format(new Date(e.date), 'MMM d, yyyy')
  }), /*#__PURE__*/_jsxs("div", {
    className: "flex gap-1",
    children: [/*#__PURE__*/_jsx("button", {
      onClick: () => {
        setEditExpense(e);
        setShowModal(true);
      },
      className: "p-1.5 rounded hover:bg-primary-500/20 text-brand-muted hover:text-primary-400",
      children: /*#__PURE__*/_jsx(Edit2, {
        size: 13
      })
    }), /*#__PURE__*/_jsx("button", {
      onClick: () => setDeleteId(e._id),
      className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400",
      children: /*#__PURE__*/_jsx(Trash2, {
        size: 13
      })
    })]
  })]), [expenses]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Expenses",
      subtitle: "Track business expenses and costs"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between flex-wrap gap-3",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "card px-5 py-3",
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-xs text-brand-muted",
            children: "Total Expenses"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-2xl font-display font-bold text-red-400",
            children: ["\u20A6", total.toLocaleString()]
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setEditExpense(null);
            setShowModal(true);
          },
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " Add Expense"]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Description', 'Amount', 'Category', 'Date', 'Actions'],
          rows: rows,
          loading: loading
        }), !loading && expenses.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: Wallet,
          title: "No expenses recorded",
          description: "Start tracking your business expenses",
          action: /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowModal(true),
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " Add Expense"]
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "px-4 pb-4",
          children: /*#__PURE__*/_jsx(Pagination, {
            page: page,
            pages: pages,
            onPageChange: setPage
          })
        })]
      })]
    }), showModal && /*#__PURE__*/_jsx(ExpenseModal, {
      expense: editExpense,
      onClose: () => {
        setShowModal(false);
        setEditExpense(null);
      },
      onSave: fetchExpenses
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleDelete,
      title: "Delete Expense",
      message: "Are you sure you want to delete this expense?"
    })]
  });
}
