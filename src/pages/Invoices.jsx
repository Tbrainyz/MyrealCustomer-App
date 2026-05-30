import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle
} from 'lucide-react';

import Header from '../components/layout/Header';
import {
  Table,
  StatusBadge,
  Modal,
  ConfirmDialog,
  Pagination
} from '../components/ui';

import { invoicesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

/* ---------------- KPI COMPONENT ---------------- */
function Kpi({ label, value }) {
  return (
    <div className="card p-4">
      <p className="text-xs text-brand-muted">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}

/* ---------------- INVOICE MODAL ---------------- */
function InvoiceModal({ invoice, onClose, onSave }) {
  const [form, setForm] = useState({
    client: invoice?.client || '',
    clientEmail: invoice?.clientEmail || '',
    dueDate: invoice?.dueDate?.slice(0, 10) || '',
    tax: invoice?.tax || 0,
    items: invoice?.items || [{ description: '', quantity: 1, price: 0 }]
  });

  const [loading, setLoading] = useState(false);
  const isEdit = !!invoice?._id;

  const subtotal = useMemo(
    () =>
      form.items.reduce(
        (s, i) => s + (i.quantity || 0) * (i.price || 0),
        0
      ),
    [form.items]
  );

  const taxAmount = (subtotal * Number(form.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  const setItem = (i, key, value) => {
    setForm(f => ({
      ...f,
      items: f.items.map((item, idx) =>
        idx === i
          ? {
              ...item,
              [key]:
                key === 'description' ? value : Number(value)
            }
          : item
      )
    }));
  };

  const addItem = () => {
    setForm(f => ({
      ...f,
      items: [...f.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (i) => {
    setForm(f => ({
      ...f,
      items: f.items.filter((_, idx) => idx !== i)
    }));
  };

  const handleSave = async () => {
    if (!form.client) return toast.error('Client required');
    if (!form.items.length) return toast.error('Add items');

    setLoading(true);
    try {
      const payload = { ...form, subtotal, total };

      if (isEdit) {
        await invoicesAPI.update(invoice._id, payload);
        toast.success('Invoice updated');
      } else {
        await invoicesAPI.create(payload);
        toast.success('Invoice created');
      }

      onSave();
      onClose();
    } catch {
      toast.error('Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={isEdit ? 'Edit Invoice' : 'New Invoice'}
      size="xl"
    >
      <div className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <input
            className="input"
            placeholder="Client Name"
            value={form.client}
            onChange={e => setForm({ ...form, client: e.target.value })}
          />

          <input
            className="input"
            placeholder="Client Email"
            value={form.clientEmail}
            onChange={e => setForm({ ...form, clientEmail: e.target.value })}
          />

          <input
            type="date"
            className="input"
            value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
          />

          <input
            type="number"
            className="input"
            placeholder="Tax %"
            value={form.tax}
            onChange={e => setForm({ ...form, tax: e.target.value })}
          />
        </div>

        {/* ITEMS */}
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-brand-muted">Items</p>
            <button onClick={addItem} className="text-primary-400 text-xs">
              + Add Item
            </button>
          </div>

          {form.items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input
                className="input col-span-6 text-xs"
                placeholder="Description"
                value={item.description}
                onChange={e => setItem(i, 'description', e.target.value)}
              />

              <input
                className="input col-span-2 text-xs"
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={e => setItem(i, 'quantity', e.target.value)}
              />

              <input
                className="input col-span-3 text-xs"
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={e => setItem(i, 'price', e.target.value)}
              />

              <button
                className="text-red-400 col-span-1"
                onClick={() => removeItem(i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="bg-brand-darker p-3 rounded-lg text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₦{taxAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-primary-400">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- MAIN PAGE ---------------- */
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
      const res = await invoicesAPI.getAll({ page });
      setInvoices(res.data?.data || []);
      setPages(res.data?.pagination?.pages || 1);
    } catch {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  /* ---------------- RESTORED PAYMENT FUNCTION ---------------- */
  const markPaid = async (id) => {
    try {
      await invoicesAPI.markPaid(id);
      toast.success('Marked as paid');
      fetchInvoices();
    } catch {
      toast.error('Failed to update payment');
    }
  };

  const stats = useMemo(() => {
    const total = invoices.reduce((s, i) => s + (i.total || 0), 0);
    const paid = invoices.filter(i => i.status === 'paid').length;
    const pending = invoices.filter(i => i.status !== 'paid').length;
    return { total, paid, pending };
  }, [invoices]);

  const rows = useMemo(
    () =>
      invoices.map(inv => [
        <span className="font-mono text-primary-400 text-xs">
          #{inv.invoiceNumber}
        </span>,

        inv.client,

        `₦${(inv.total || 0).toLocaleString()}`,

        <StatusBadge status={inv.status} />,

        format(new Date(inv.dueDate), 'MMM d, yyyy'),

        <div className="flex gap-2 items-center">

          {/* ✅ RESTORED BUTTON */}
          {inv.status !== 'paid' && (
            <button
              onClick={() => markPaid(inv._id)}
              className="text-green-400 hover:bg-green-500/10 p-1 rounded"
              title="Mark Paid"
            >
              <CheckCircle size={14} />
            </button>
          )}

          <button
            onClick={() => {
              setEditInvoice(inv);
              setShowModal(true);
            }}
          >
            <Edit2 size={14} />
          </button>

          <button onClick={() => setDeleteId(inv._id)}>
            <Trash2 size={14} />
          </button>
        </div>
      ]),
    [invoices]
  );

  return (
    <>
      <Header title="Invoices" subtitle="Billing & payments" />

      <div className="p-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Revenue" value={`₦${stats.total.toLocaleString()}`} />
          <Kpi label="Paid" value={stats.paid} />
          <Kpi label="Pending" value={stats.pending} />
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            className="btn-primary"
            onClick={() => {
              setEditInvoice(null);
              setShowModal(true);
            }}
          >
            <Plus size={14} /> New Invoice
          </button>
        </div>

        {/* TABLE */}
        <div className="card">
          <Table
            headers={['Invoice', 'Client', 'Total', 'Status', 'Due', 'Actions']}
            rows={rows}
            loading={loading}
          />

          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      </div>

      {showModal && (
        <InvoiceModal
          invoice={editInvoice}
          onClose={() => {
            setShowModal(false);
            setEditInvoice(null);
          }}
          onSave={fetchInvoices}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await invoicesAPI.delete(deleteId);
          toast.success('Deleted');
          fetchInvoices();
        }}
        title="Delete Invoice"
        message="This cannot be undone"
      />
    </>
  );
}