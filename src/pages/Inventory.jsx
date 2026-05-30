import { useEffect, useState, useCallback, useMemo } from "react";
import { Plus, Package, Edit2, Trash2, AlertTriangle } from "lucide-react";
import Header from "../components/layout/Header";
import { Table, Modal, ConfirmDialog, EmptyState, Pagination, Spinner } from "../components/ui";
import { inventoryAPI } from "../api";
import toast from "react-hot-toast";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function ProductModal({
  product,
  onClose,
  onSave
}) {
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
      [key]: e.target.type === "number" ? Number(e.target.value) : e.target.value
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
        toast.success("Product updated successfully");
      } else {
        await inventoryAPI.create(form);
        toast.success("Product created successfully");
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: isEdit ? "Edit Product" : "New Product",
    size: "lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Product Name *"
        }), /*#__PURE__*/_jsx("input", {
          value: form.name,
          onChange: setField("name"),
          className: "input",
          placeholder: "Product name"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "SKU *"
        }), /*#__PURE__*/_jsx("input", {
          value: form.sku,
          onChange: setField("sku"),
          className: "input",
          placeholder: "SKU-001"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Category"
        }), /*#__PURE__*/_jsx("input", {
          value: form.category,
          onChange: setField("category"),
          className: "input",
          placeholder: "Electronics"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Quantity"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.quantity,
          onChange: setField("quantity"),
          className: "input",
          min: "0"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Reorder Level"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.reorderLevel,
          onChange: setField("reorderLevel"),
          className: "input",
          min: "0"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Selling Price (\u20A6)"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.price,
          onChange: setField("price"),
          className: "input",
          min: "0"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Cost Price (\u20A6)"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.costPrice,
          onChange: setField("costPrice"),
          className: "input",
          min: "0"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Warehouse"
        }), /*#__PURE__*/_jsx("input", {
          value: form.warehouse,
          onChange: setField("warehouse"),
          className: "input",
          placeholder: "Main Warehouse"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex justify-end gap-3 mt-6",
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
        }) : isEdit ? "Update Product" : "Create Product"
      })]
    })]
  });
}
function StockModal({
  product,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    productId: product._id,
    type: "incoming",
    quantity: 1,
    reference: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (form.quantity <= 0) return toast.error("Quantity must be greater than zero");
    setLoading(true);
    try {
      await inventoryAPI.addMovement(form);
      toast.success("Stock movement recorded successfully");
      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to record movement");
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: `Adjust Stock — ${product.name}`,
    size: "sm",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Movement Type"
        }), /*#__PURE__*/_jsxs("select", {
          value: form.type,
          onChange: e => setForm(prev => ({
            ...prev,
            type: e.target.value
          })),
          className: "input",
          children: [/*#__PURE__*/_jsx("option", {
            value: "incoming",
            children: "Incoming (+)"
          }), /*#__PURE__*/_jsx("option", {
            value: "outgoing",
            children: "Outgoing (-)"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Quantity *"
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          value: form.quantity,
          onChange: e => setForm(prev => ({
            ...prev,
            quantity: Number(e.target.value)
          })),
          className: "input",
          min: "1"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Reference"
        }), /*#__PURE__*/_jsx("input", {
          value: form.reference,
          onChange: e => setForm(prev => ({
            ...prev,
            reference: e.target.value
          })),
          className: "input",
          placeholder: "PO-001"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Notes"
        }), /*#__PURE__*/_jsx("input", {
          value: form.notes,
          onChange: e => setForm(prev => ({
            ...prev,
            notes: e.target.value
          })),
          className: "input",
          placeholder: "Optional notes"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex justify-end gap-3 mt-6",
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
        }) : "Save Movement"
      })]
    })]
  });
}
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
      const res = await inventoryAPI.getAll({
        page
      });
      const items = res?.data?.data || [];
      setProducts(Array.isArray(items) ? items : []);
      setPages(res?.data?.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
      setProducts([]);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, [page]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await inventoryAPI.delete(deleteId);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  };
  const lowStock = useMemo(() => {
    return products.filter(p => p.quantity <= (p.reorderLevel || 0)).length;
  }, [products]);
  const rows = useMemo(() => {
    return products.map(p => {
      const isLow = p.quantity <= (p.reorderLevel || 0);
      return [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "font-medium text-white",
          children: p.name
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs font-mono text-brand-muted",
          children: p.sku
        })]
      }), /*#__PURE__*/_jsx("span", {
        className: "badge badge-blue",
        children: p.category || "N/A"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/_jsx("span", {
          className: `font-display font-bold text-lg ${isLow ? "text-red-400" : "text-white"}`,
          children: p.quantity
        }), isLow && /*#__PURE__*/_jsx(AlertTriangle, {
          size: 14,
          className: "text-yellow-400"
        })]
      }), /*#__PURE__*/_jsx("span", {
        className: "text-xs text-brand-muted",
        children: p.reorderLevel
      }), /*#__PURE__*/_jsxs("span", {
        className: "font-medium text-white",
        children: ["\u20A6", p.price.toLocaleString()]
      }), /*#__PURE__*/_jsxs("span", {
        className: "text-brand-muted text-sm",
        children: ["\u20A6", p.costPrice.toLocaleString()]
      }), /*#__PURE__*/_jsx("span", {
        className: "text-xs text-brand-muted",
        children: p.warehouse || "N/A"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-1",
        children: [/*#__PURE__*/_jsx("button", {
          onClick: () => setStockProduct(p),
          className: "px-2 py-1 rounded text-xs bg-primary-500/10 text-primary-400 hover:bg-primary-500/20",
          children: "Adjust"
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => {
            setEditProduct(p);
            setShowModal(true);
          },
          className: "p-1.5 rounded hover:bg-primary-500/20 text-brand-muted hover:text-primary-400",
          children: /*#__PURE__*/_jsx(Edit2, {
            size: 13
          })
        }), /*#__PURE__*/_jsx("button", {
          onClick: () => setDeleteId(p._id),
          className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400",
          children: /*#__PURE__*/_jsx(Trash2, {
            size: 13
          })
        })]
      })];
    });
  }, [products]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Inventory",
      subtitle: "Track stock levels and movements"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between flex-wrap gap-3",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex gap-3",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "card px-4 py-3",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs text-brand-muted",
              children: "Total Products"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xl font-display font-bold text-white",
              children: products.length
            })]
          }), lowStock > 0 && /*#__PURE__*/_jsxs("div", {
            className: "card px-4 py-3 border-yellow-500/30",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs text-yellow-400",
              children: "Low Stock"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xl font-display font-bold text-yellow-400",
              children: lowStock
            })]
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setEditProduct(null);
            setShowModal(true);
          },
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " New Product"]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ["Product", "Category", "Qty", "Reorder At", "Price", "Cost", "Warehouse", "Actions"],
          rows: rows,
          loading: loading
        }), !loading && products.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: Package,
          title: "No products yet",
          description: "Add your first inventory item",
          action: /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowModal(true),
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " New Product"]
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
    }), showModal && /*#__PURE__*/_jsx(ProductModal, {
      product: editProduct,
      onClose: () => {
        setShowModal(false);
        setEditProduct(null);
      },
      onSave: fetchProducts
    }), stockProduct && /*#__PURE__*/_jsx(StockModal, {
      product: stockProduct,
      onClose: () => setStockProduct(null),
      onSave: fetchProducts
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleDelete,
      title: "Delete Product",
      message: "This product will be permanently deleted from inventory."
    })]
  });
}
