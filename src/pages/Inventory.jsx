import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Plus,
  Package,
  Edit2,
  Trash2,
  AlertTriangle
} from "lucide-react";

import Header from "../components/layout/Header";
import {
  Table,
  Modal,
  ConfirmDialog,
  EmptyState,
  Pagination,
  Spinner
} from "../components/ui";

import { inventoryAPI } from "../api";
import toast from "react-hot-toast";

/* ----------------------------- PRODUCT MODAL ----------------------------- */

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    quantity: product?.quantity || 0,
    reorderLevel: product?.reorderLevel || 10,
    price: product?.price || 0,
    costPrice: product?.costPrice || 0,
    warehouse: product?.warehouse || "Main Warehouse"
  });

  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(product?._id);

  const setField = key => e => {
    setForm(prev => ({
      ...prev,
      [key]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.sku.trim()) {
      return toast.error("Product name and SKU are required");
    }

    setLoading(true);
    try {
      if (isEdit) {
        await inventoryAPI.update(product._id, form);
        toast.success("Product updated");
      } else {
        await inventoryAPI.create(form);
        toast.success("Product created");
      }

      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={isEdit ? "Edit Product" : "New Product"}
      size="lg"
    >
      <div className="grid grid-cols-2 gap-4">

        {[
          ["Product Name *", "name"],
          ["SKU *", "sku"],
          ["Category", "category"],
          ["Quantity", "quantity"],
          ["Reorder Level", "reorderLevel"],
          ["Selling Price", "price"],
          ["Cost Price", "costPrice"],
          ["Warehouse", "warehouse"]
        ].map(([label, key]) => (
          <div key={key} className={key === "name" || key === "warehouse" ? "col-span-2" : ""}>
            <label className="label">{label}</label>
            <input
              className="input"
              value={form[key]}
              onChange={setField(key)}
              type={typeof form[key] === "number" ? "number" : "text"}
            />
          </div>
        ))}

      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? <Spinner size={14} /> : isEdit ? "Update" : "Create"}
        </button>
      </div>
    </Modal>
  );
}

/* ----------------------------- STOCK MODAL ----------------------------- */

function StockModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    productId: product._id,
    type: "incoming",
    quantity: 1,
    reference: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (form.quantity <= 0) {
      return toast.error("Quantity must be greater than zero");
    }

    setLoading(true);
    try {
      await inventoryAPI.addMovement(form);
      toast.success("Stock updated");
      onSave();
      onClose();
    } catch {
      toast.error("Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title={`Stock Adjustment — ${product.name}`} size="sm">
      <div className="space-y-4">

        <div>
          <label className="label">Movement Type</label>
          <select
            className="input"
            value={form.type}
            onChange={e =>
              setForm(prev => ({ ...prev, type: e.target.value }))
            }
          >
            <option value="incoming">Incoming (+)</option>
            <option value="outgoing">Outgoing (-)</option>
          </select>
        </div>

        <div>
          <label className="label">Quantity</label>
          <input
            className="input"
            type="number"
            min="1"
            value={form.quantity}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                quantity: Number(e.target.value)
              }))
            }
          />
        </div>

        <div>
          <label className="label">Reference</label>
          <input
            className="input"
            value={form.reference}
            onChange={e =>
              setForm(prev => ({ ...prev, reference: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="label">Notes</label>
          <input
            className="input"
            value={form.notes}
            onChange={e =>
              setForm(prev => ({ ...prev, notes: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>

        <button onClick={handleSave} className="btn-primary" disabled={loading}>
          {loading ? <Spinner size={14} /> : "Save"}
        </button>
      </div>
    </Modal>
  );
}

/* ----------------------------- MAIN PAGE ----------------------------- */

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await inventoryAPI.getAll({ page });
      const items = res?.data?.data || [];

      setProducts(Array.isArray(items) ? items : []);
      setPages(res?.data?.pagination?.pages || 1);
    } catch {
      toast.error("Failed to load inventory");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const lowStock = useMemo(
    () =>
      products.filter(p => p.quantity <= (p.reorderLevel || 0)).length,
    [products]
  );

  const rows = useMemo(
    () =>
      products.map(p => {
        const isLow = p.quantity <= (p.reorderLevel || 0);

        return [
          <div>
            <p className="text-white font-medium">{p.name}</p>
            <p className="text-xs text-brand-muted font-mono">{p.sku}</p>
          </div>,

          <span className="badge badge-blue">{p.category || "N/A"}</span>,

          <div className="flex items-center gap-2">
            <span className={`font-bold ${isLow ? "text-red-400" : "text-slate-900 dark:text-white"}`}>
              {p.quantity}
            </span>
            {isLow && <AlertTriangle size={14} className="text-yellow-400" />}
          </div>,

          <span>{p.reorderLevel}</span>,
          <span>₦{p.price?.toLocaleString()}</span>,
          <span className="text-brand-muted">₦{p.costPrice?.toLocaleString()}</span>,
          <span>{p.warehouse}</span>,

          <div className="flex gap-2">
            <button
              onClick={() => setStockProduct(p)}
              className="btn-ghost"
            >
              Adjust
            </button>

            <button
              onClick={() => {
                setEditProduct(p);
                setShowModal(true);
              }}
              className="icon-btn"
            >
              <Edit2 size={14} />
            </button>

            <button
              onClick={() => setDeleteId(p._id)}
              className="icon-btn text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ];
      }),
    [products]
  );

  return (
    <>
      <Header title="Inventory" subtitle="Manage stock with precision" />

      <div className="p-6 space-y-6">

        {/* KPI HEADER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4">
            <p className="text-sm text-brand-muted">Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>

          <div className="card p-4 border-yellow-500/30">
            <p className="text-sm text-yellow-400">Low Stock</p>
            <p className="text-2xl font-bold text-yellow-400">{lowStock}</p>
          </div>

          <button
            onClick={() => {
              setEditProduct(null);
              setShowModal(true);
            }}
            className="card p-4 flex items-center justify-center gap-2 hover:bg-primary-500/10"
          >
            <Plus size={16} /> New Product
          </button>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">
          <Table
            headers={[
              "Product",
              "Category",
              "Qty",
              "Reorder",
              "Price",
              "Cost",
              "Warehouse",
              "Actions"
            ]}
            rows={rows}
            loading={loading}
          />

          {!loading && products.length === 0 && (
            <EmptyState
              icon={Package}
              title="No inventory yet"
              description="Start by adding your first product"
              action={
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-primary"
                >
                  <Plus size={14} /> Add Product
                </button>
              }
            />
          )}

          <div className="px-4 pb-4">
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          onSave={fetchProducts}
        />
      )}

      {stockProduct && (
        <StockModal
          product={stockProduct}
          onClose={() => setStockProduct(null)}
          onSave={fetchProducts}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await inventoryAPI.delete(deleteId);
          toast.success("Deleted");
          setDeleteId(null);
          fetchProducts();
        }}
        title="Delete Product"
        message="This action cannot be undone."
      />
    </>
  );
}