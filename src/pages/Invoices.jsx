import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Receipt, Edit2, Trash2, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, StatusBadge, Modal, ConfirmDialog, EmptyState, Pagination, Spinner } from '../components/ui';
import { invoicesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function InvoiceModal({
  invoice,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    client: invoice?.client || '',
    clientEmail: invoice?.clientEmail || '',
    dueDate: invoice?.dueDate?.slice(0, 10) || '',
    tax: invoice?.tax || 0,
    items: invoice?.items || [{
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    }]
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!invoice?._id;
  const addItem = () => setForm(f => ({
    ...f,
    items: [...f.items, {
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    }]
  }));
  const removeItem = i => setForm(f => ({
    ...f,
    items: f.items.filter((_, idx) => idx !== i)
  }));
  const setItem = (i, k, v) => setForm(f => ({
    ...f,
    items: f.items.map((item, idx) => idx === i ? {
      ...item,
      [k]: k === 'description' ? v : Number(v)
    } : item)
  }));
  const subtotal = form.items.reduce((s, item) => s + item.quantity * item.price, 0);
  const total = subtotal + subtotal * (Number(form.tax) / 100);
  const handleSave = async () => {
    if (!form.client) return toast.error('Client name is required');
    if (form.items.length === 0) return toast.error('Add at least one item');
    setLoading(true);
    try {
      const payload = {
        ...form,
        subtotal,
        total
      };
      if (isEdit) {
        await invoicesAPI.update(invoice._id, payload);
        toast.success('Invoice updated successfully');
      } else {
        await invoicesAPI.create(payload);
        toast.success('Invoice created successfully');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: isEdit ? 'Edit Invoice' : 'New Invoice',
    size: "xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-2 gap-4",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "label",
            children: "Client Name *"
          }), /*#__PURE__*/_jsx("input", {
            value: form.client,
            onChange: e => setForm(f => ({
              ...f,
              client: e.target.value
            })),
            className: "input",
            placeholder: "Client name"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "label",
            children: "Client Email"
          }), /*#__PURE__*/_jsx("input", {
            type: "email",
            value: form.clientEmail,
            onChange: e => setForm(f => ({
              ...f,
              clientEmail: e.target.value
            })),
            className: "input",
            placeholder: "client@email.com"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "label",
            children: "Due Date"
          }), /*#__PURE__*/_jsx("input", {
            type: "date",
            value: form.dueDate,
            onChange: e => setForm(f => ({
              ...f,
              dueDate: e.target.value
            })),
            className: "input"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("label", {
            className: "label",
            children: "Tax (%)"
          }), /*#__PURE__*/_jsx("input", {
            type: "number",
            value: form.tax,
            onChange: e => setForm(f => ({
              ...f,
              tax: Number(e.target.value)
            })),
            className: "input",
            min: "0",
            max: "100"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between mb-2",
          children: [/*#__PURE__*/_jsx("label", {
            className: "label mb-0",
            children: "Items"
          }), /*#__PURE__*/_jsx("button", {
            onClick: addItem,
            className: "text-xs text-primary-400 hover:underline",
            children: "+ Add Item"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-2",
          children: form.items.map((item, i) => /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-12 gap-2",
            children: [/*#__PURE__*/_jsx("input", {
              value: item.description,
              onChange: e => setItem(i, 'description', e.target.value),
              placeholder: "Description",
              className: "input col-span-6 text-xs"
            }), /*#__PURE__*/_jsx("input", {
              type: "number",
              value: item.quantity,
              onChange: e => setItem(i, 'quantity', e.target.value),
              placeholder: "Qty",
              className: "input col-span-2 text-xs",
              min: "1"
            }), /*#__PURE__*/_jsx("input", {
              type: "number",
              value: item.price,
              onChange: e => setItem(i, 'price', e.target.value),
              placeholder: "Price",
              className: "input col-span-3 text-xs",
              min: "0"
            }), /*#__PURE__*/_jsx("button", {
              onClick: () => removeItem(i),
              className: "col-span-1 text-red-400 hover:text-red-300 text-sm flex items-center justify-center",
              children: "\u2715"
            })]
          }, i))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "bg-brand-darker rounded-lg p-4 flex flex-col items-end gap-1 text-sm",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex gap-4",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-brand-muted",
            children: "Subtotal:"
          }), /*#__PURE__*/_jsxs("span", {
            className: "text-white",
            children: ["\u20A6", subtotal.toLocaleString()]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-4",
          children: [/*#__PURE__*/_jsxs("span", {
            className: "text-brand-muted",
            children: ["Tax (", form.tax, "%):"]
          }), /*#__PURE__*/_jsxs("span", {
            className: "text-white",
            children: ["\u20A6", (subtotal * Number(form.tax) / 100).toLocaleString()]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-4 text-base font-bold",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-brand-muted",
            children: "Total:"
          }), /*#__PURE__*/_jsxs("span", {
            className: "text-primary-400",
            children: ["\u20A6", total.toLocaleString()]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex gap-3 justify-end mt-4",
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
        }) : isEdit ? 'Update Invoice' : 'Create Invoice'
      })]
    })]
  });
}
export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await invoicesAPI.getAll({
        page
      });
      const data = res.data?.data || [];
      setInvoices(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
      setInvoices([]);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [page]);
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await invoicesAPI.delete(deleteId);
      toast.success('Invoice deleted successfully');
      fetchInvoices();
    } catch {
      toast.error('Failed to delete invoice');
    } finally {
      setDeleteId(null);
    }
  };
  const markPaid = async id => {
    try {
      await invoicesAPI.markPaid(id);
      toast.success('Invoice marked as paid');
      fetchInvoices();
    } catch {
      toast.error('Failed to mark invoice as paid');
    }
  };
  const rows = useMemo(() => invoices.map(inv => [/*#__PURE__*/_jsx("span", {
    className: "font-mono text-xs text-primary-400",
    children: inv.invoiceNumber
  }), /*#__PURE__*/_jsx("span", {
    className: "text-white font-medium",
    children: inv.client
  }), /*#__PURE__*/_jsxs("span", {
    className: "font-display font-semibold text-white",
    children: ["\u20A6", inv.total.toLocaleString()]
  }), /*#__PURE__*/_jsx(StatusBadge, {
    status: inv.status
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs text-brand-muted",
    children: format(new Date(inv.dueDate), 'MMM d, yyyy')
  }), /*#__PURE__*/_jsxs("div", {
    className: "flex items-center gap-1",
    children: [inv.status !== 'paid' && /*#__PURE__*/_jsx("button", {
      onClick: () => markPaid(inv._id),
      className: "p-1.5 rounded hover:bg-emerald-500/20 text-brand-muted hover:text-emerald-400",
      title: "Mark Paid",
      children: /*#__PURE__*/_jsx(CheckCircle, {
        size: 13
      })
    }), /*#__PURE__*/_jsx("button", {
      onClick: () => {
        setEditInvoice(inv);
        setShowModal(true);
      },
      className: "p-1.5 rounded hover:bg-primary-500/20 text-brand-muted hover:text-primary-400",
      children: /*#__PURE__*/_jsx(Edit2, {
        size: 13
      })
    }), /*#__PURE__*/_jsx("button", {
      onClick: () => setDeleteId(inv._id),
      className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400",
      children: /*#__PURE__*/_jsx(Trash2, {
        size: 13
      })
    })]
  })]), [invoices]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Invoices",
      subtitle: "Manage client invoices and payments"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-4",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex justify-end",
        children: /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setEditInvoice(null);
            setShowModal(true);
          },
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " New Invoice"]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Invoice #', 'Client', 'Total', 'Status', 'Due Date', 'Actions'],
          rows: rows,
          loading: loading
        }), !loading && invoices.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: Receipt,
          title: "No invoices yet",
          description: "Create your first invoice for clients",
          action: /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowModal(true),
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " New Invoice"]
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
    }), showModal && /*#__PURE__*/_jsx(InvoiceModal, {
      invoice: editInvoice,
      onClose: () => {
        setShowModal(false);
        setEditInvoice(null);
      },
      onSave: fetchInvoices
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleDelete,
      title: "Delete Invoice",
      message: "This invoice will be permanently deleted."
    })]
  });
}
