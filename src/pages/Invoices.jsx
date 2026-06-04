import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Receipt, Clock, DollarSign } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, StatusBadge, Modal, ConfirmDialog, Pagination, EmptyState, Spinner } from '../components/ui';
import { invoicesAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

/* ---------- KPI ---------- */
function Kpi({ label, value, icon: Icon, color = 'purple' }) {
  const { dark } = useTheme();
  const clr = {
    purple: 'bg-primary-500/10 text-primary-500',
    green:  'bg-emerald-500/10 text-emerald-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
  }[color];
  return (
    <div className="admin-stat-card p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${clr}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-brand-muted mt-0.5">{label}</p>
    </div>
  );
}

/* ---------- INVOICE MODAL ---------- */
function InvoiceModal({ invoice, onClose, onSave }) {
  const { dark } = useTheme();
  const [form, setForm] = useState({
    client:      invoice?.client      || '',
    clientEmail: invoice?.clientEmail || '',
    dueDate:     invoice?.dueDate?.slice(0, 10) || '',
    tax:         invoice?.tax         || 0,
    // Each item: { productName, description, quantity, price }
    items: invoice?.items?.length
      ? invoice.items.map(i => ({
          productName: i.productName || '',
          description: i.description || '',
          quantity:    i.quantity    || 1,
          price:       i.price       || 0,
        }))
      : [{ productName: '', description: '', quantity: 1, price: 0 }],
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!invoice?._id;

  const subtotal = useMemo(
    () => form.items.reduce((s, i) => s + (i.quantity || 0) * (i.price || 0), 0),
    [form.items]
  );
  const taxAmount = (subtotal * Number(form.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  const setItem = (i, key, value) =>
    setForm(f => ({
      ...f,
      items: f.items.map((item, idx) =>
        idx === i
          ? { ...item, [key]: key === 'productName' || key === 'description' ? value : Number(value) }
          : item
      ),
    }));

  const addItem    = () => setForm(f => ({ ...f, items: [...f.items, { productName: '', description: '', quantity: 1, price: 0 }] }));
  const removeItem = i  => setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.client)       return toast.error('Client name is required');
    if (!form.items.length) return toast.error('Add at least one item');
    setLoading(true);
    try {
      const payload = { ...form, subtotal, total };
      if (isEdit) { await invoicesAPI.update(invoice._id, payload); toast.success('Invoice updated'); }
      else        { await invoicesAPI.create(payload);              toast.success('Invoice created'); }
      onSave(); onClose();
    } catch { toast.error('Failed to save invoice'); }
    finally { setLoading(false); }
  };

  const totalsBg = dark ? 'bg-[#0e0e1c]' : 'bg-slate-50';
  const totalsBorder = dark ? 'border-white/[0.07]' : 'border-slate-200';

  return (
    <Modal isOpen onClose={onClose} title={isEdit ? 'Edit Invoice' : 'New Invoice'} size="xl">
      <div className="space-y-5">
        {/* Client info */}
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Client Name *</label><input className="input" placeholder="Acme Ltd" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} /></div>
          <div><label className="label">Client Email</label><input className="input" placeholder="client@email.com" value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} /></div>
          <div><label className="label">Due Date</label><input type="date" className="input" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} /></div>
          <div><label className="label">Tax %</label><input type="number" className="input" placeholder="0" min="0" max="100" value={form.tax} onChange={e => setForm({ ...form, tax: e.target.value })} /></div>
        </div>

        {/* Line items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="label mb-0">Line Items</p>
            <button onClick={addItem} className="text-primary-500 text-xs font-semibold hover:text-primary-400 transition-colors">+ Add Item</button>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-12 gap-2 mb-1.5 px-1">
            {['Product / Name', 'Description', 'Qty', 'Unit Price (₦)', ''].map((h, i) => (
              <p key={i} className={`text-[11px] font-semibold uppercase tracking-wide text-brand-muted
                ${i === 0 ? 'col-span-3' : i === 1 ? 'col-span-4' : i === 2 ? 'col-span-1' : i === 3 ? 'col-span-3' : 'col-span-1'}`}>
                {h}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            {form.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input
                  className="input col-span-3 text-xs"
                  placeholder="Product name"
                  value={item.productName}
                  onChange={e => setItem(i, 'productName', e.target.value)}
                />
                <input
                  className="input col-span-4 text-xs"
                  placeholder="Description / details"
                  value={item.description}
                  onChange={e => setItem(i, 'description', e.target.value)}
                />
                <input
                  className="input col-span-1 text-xs text-center"
                  type="number"
                  placeholder="1"
                  min="1"
                  value={item.quantity}
                  onChange={e => setItem(i, 'quantity', e.target.value)}
                />
                <input
                  className="input col-span-3 text-xs"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  value={item.price}
                  onChange={e => setItem(i, 'price', e.target.value)}
                />
                <button onClick={() => removeItem(i)} className="col-span-1 text-slate-400 hover:text-red-400 transition-colors text-lg leading-none flex items-center justify-center">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className={`rounded-xl border p-4 text-sm space-y-2 ${totalsBg} ${totalsBorder}`}>
          {[
            { l: 'Subtotal', v: `₦${subtotal.toLocaleString()}` },
            { l: `Tax (${form.tax || 0}%)`, v: `₦${taxAmount.toLocaleString()}` },
          ].map(({ l, v }) => (
            <div key={l} className="flex justify-between">
              <span className="text-brand-muted">{l}</span>
              <span className="text-slate-700 dark:text-slate-300">{v}</span>
            </div>
          ))}
          <div className={`flex justify-between font-bold pt-2 border-t ${totalsBorder}`}>
            <span className="text-slate-900 dark:text-white">Total</span>
            <span className="text-primary-500">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary" disabled={loading}>
            {loading ? <Spinner size={14} /> : isEdit ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function Invoices() {
  const [invoices, setInvoices]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [page, setPage]             = useState(1);
  const [pages, setPages]           = useState(1);
  const [showModal, setShowModal]   = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteId, setDeleteId]     = useState(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await invoicesAPI.getAll({ page });
      setInvoices(res.data?.data || []);
      setPages(res.data?.pagination?.pages || 1);
    } catch { toast.error('Failed to load invoices'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const markPaid = async id => {
    try { await invoicesAPI.markPaid(id); toast.success('Marked as paid'); fetchInvoices(); }
    catch { toast.error('Failed to update'); }
  };

  const stats = useMemo(() => ({
    total:   invoices.reduce((s, i) => s + (i.total || 0), 0),
    paid:    invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status !== 'paid').length,
  }), [invoices]);

  const rows = useMemo(() =>
    invoices.map(inv => {
      // Collect product names from items array
      const productNames = (inv.items || [])
        .map(it => it.productName || it.description || '')
        .filter(Boolean);
      const productLabel = productNames.length
        ? productNames.slice(0, 2).join(', ') + (productNames.length > 2 ? ` +${productNames.length - 2}` : '')
        : '—';

      return [
        <span className="font-mono text-primary-500 text-xs font-semibold">#{inv.invoiceNumber}</span>,

        <div>
          <p className="font-medium text-slate-900 dark:text-white">{inv.client}</p>
          {inv.clientEmail && <p className="text-xs text-brand-muted">{inv.clientEmail}</p>}
        </div>,

        // ✅ PRODUCT NAME column
        <div className="max-w-[160px]">
          <p className="text-sm text-slate-700 dark:text-slate-300 truncate" title={productNames.join(', ')}>
            {productLabel}
          </p>
          {(inv.items?.length > 0) && (
            <p className="text-xs text-brand-muted">{inv.items.length} item{inv.items.length !== 1 ? 's' : ''}</p>
          )}
        </div>,

        <span className="font-semibold text-slate-800 dark:text-white">₦{(inv.total || 0).toLocaleString()}</span>,

        <StatusBadge status={inv.status} />,

        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {inv.dueDate ? format(new Date(inv.dueDate), 'MMM d, yyyy') : '—'}
        </span>,

        <div className="flex gap-1.5 items-center">
          {inv.status !== 'paid' && (
            <button onClick={() => markPaid(inv._id)}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-all"
              title="Mark as Paid">
              <CheckCircle size={14} />
            </button>
          )}
          <button onClick={() => { setEditInvoice(inv); setShowModal(true); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all">
            <Edit2 size={14} />
          </button>
          <button onClick={() => setDeleteId(inv._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <Trash2 size={14} />
          </button>
        </div>,
      ];
    }), [invoices]);

  return (
    <>
      <Header title="Invoices" subtitle="Billing & payments" />
      <div className="p-6 space-y-6 animate-fade-in">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Total Revenue"   value={`₦${stats.total.toLocaleString()}`} icon={DollarSign} color="purple" />
          <Kpi label="Paid Invoices"   value={stats.paid}                          icon={CheckCircle} color="green"  />
          <Kpi label="Pending/Overdue" value={stats.pending}                       icon={Clock}       color="yellow" />
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button className="btn-primary flex items-center gap-2" onClick={() => { setEditInvoice(null); setShowModal(true); }}>
            <Plus size={14} /> New Invoice
          </button>
        </div>

        {/* Table */}
        <div className="admin-table">
          {invoices.length === 0 && !loading ? (
            <div className="p-8">
              <EmptyState icon={Receipt} title="No invoices yet"
                description="Create your first invoice to start billing clients."
                action={<button className="btn-primary flex items-center gap-2" onClick={() => setShowModal(true)}><Plus size={14} /> New Invoice</button>} />
            </div>
          ) : (
            <>
              <Table
                headers={['Invoice #', 'Client', 'Products', 'Total', 'Status', 'Due Date', 'Actions']}
                rows={rows}
                loading={loading}
              />
              <div className="p-4">
                <Pagination page={page} pages={pages} onPageChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <InvoiceModal
          invoice={editInvoice}
          onClose={() => { setShowModal(false); setEditInvoice(null); }}
          onSave={fetchInvoices}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await invoicesAPI.delete(deleteId); toast.success('Deleted'); fetchInvoices(); }}
        title="Delete Invoice"
        message="This action cannot be undone."
      />
    </>
  );
}
