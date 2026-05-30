import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Copy, FileText } from 'lucide-react';
import Header from '../components/layout/Header';
import { Modal, ConfirmDialog, EmptyState, Spinner } from '../components/ui';
import { templatesAPI } from '../api';
import toast from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const PLATFORM_BADGE = {
  whatsapp: 'badge-green',
  facebook: 'badge-blue',
  instagram: 'badge-red',
  sms: 'badge-yellow',
  all: 'badge-purple'
};
function TemplateModal({
  template,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    name: template?.name || '',
    content: template?.content || '',
    platform: template?.platform || 'whatsapp'
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!template?._id;
  const handleSave = async () => {
    if (!form.name?.trim()) return toast.error('Template name is required');
    if (!form.content?.trim()) return toast.error('Template content is required');
    setLoading(true);
    try {
      if (isEdit) {
        await templatesAPI.update(template._id, form);
        toast.success('Template updated successfully');
      } else {
        await templatesAPI.create(form);
        toast.success('Template created successfully');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save template');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: isEdit ? 'Edit Template' : 'New Template',
    size: "lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Template Name *"
        }), /*#__PURE__*/_jsx("input", {
          value: form.name,
          onChange: e => setForm(f => ({
            ...f,
            name: e.target.value
          })),
          placeholder: "e.g. Welcome Message",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Platform"
        }), /*#__PURE__*/_jsxs("select", {
          value: form.platform,
          onChange: e => setForm(f => ({
            ...f,
            platform: e.target.value
          })),
          className: "input",
          children: [/*#__PURE__*/_jsx("option", {
            value: "whatsapp",
            children: "WhatsApp"
          }), /*#__PURE__*/_jsx("option", {
            value: "facebook",
            children: "Facebook"
          }), /*#__PURE__*/_jsx("option", {
            value: "instagram",
            children: "Instagram"
          }), /*#__PURE__*/_jsx("option", {
            value: "sms",
            children: "SMS"
          }), /*#__PURE__*/_jsx("option", {
            value: "all",
            children: "All Platforms"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Message Content *"
        }), /*#__PURE__*/_jsx("textarea", {
          value: form.content,
          onChange: e => setForm(f => ({
            ...f,
            content: e.target.value
          })),
          placeholder: "Write your template message here...",
          rows: 6,
          className: "input resize-none"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex flex-wrap gap-2",
        children: ['{{FirstName}}', '{{Company}}', '{{Phone}}', '{{Date}}'].map(v => /*#__PURE__*/_jsx("button", {
          onClick: () => setForm(f => ({
            ...f,
            content: f.content + v
          })),
          className: "px-3 py-1 text-xs rounded bg-primary-500/10 text-primary-400 font-mono hover:bg-primary-500/20 transition-colors",
          children: v
        }, v))
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
        }) : isEdit ? 'Update Template' : 'Create Template'
      })]
    })]
  });
}
export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTpl, setEditTpl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await templatesAPI.getAll();
      const data = res.data?.data || [];
      setTemplates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch templates:", err);
      setTemplates([]);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await templatesAPI.delete(deleteId);
      toast.success('Template deleted successfully');
      fetchTemplates();
    } catch {
      toast.error('Failed to delete template');
    } finally {
      setDeleteId(null);
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Message Templates",
      subtitle: "Create and manage reusable message templates"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex justify-end mb-6",
        children: /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setEditTpl(null);
            setShowModal(true);
          },
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " New Template"]
        })
      }), loading ? /*#__PURE__*/_jsx("div", {
        className: "flex justify-center py-20",
        children: /*#__PURE__*/_jsx(Spinner, {
          size: 40
        })
      }) : templates.length === 0 ? /*#__PURE__*/_jsx(EmptyState, {
        icon: FileText,
        title: "No templates yet",
        description: "Create reusable message templates to send faster",
        action: /*#__PURE__*/_jsxs("button", {
          onClick: () => setShowModal(true),
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " New Template"]
        })
      }) : /*#__PURE__*/_jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
        children: templates.map(t => /*#__PURE__*/_jsxs("div", {
          className: "card p-5 hover:border-primary-500/40 transition-all group",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-start justify-between mb-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-white",
                children: t.name
              }), /*#__PURE__*/_jsx("span", {
                className: `badge mt-1 ${PLATFORM_BADGE[t.platform] || 'badge-blue'}`,
                children: t.platform
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
              children: [/*#__PURE__*/_jsx("button", {
                onClick: () => {
                  navigator.clipboard.writeText(t.content);
                  toast.success('Content copied!');
                },
                className: "p-1.5 rounded hover:bg-brand-border text-brand-muted hover:text-white",
                children: /*#__PURE__*/_jsx(Copy, {
                  size: 13
                })
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => {
                  setEditTpl(t);
                  setShowModal(true);
                },
                className: "p-1.5 rounded hover:bg-primary-500/20 text-brand-muted hover:text-primary-400",
                children: /*#__PURE__*/_jsx(Edit2, {
                  size: 13
                })
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setDeleteId(t._id),
                className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400",
                children: /*#__PURE__*/_jsx(Trash2, {
                  size: 13
                })
              })]
            })]
          }), /*#__PURE__*/_jsx("p", {
            className: "text-sm text-brand-muted line-clamp-4 leading-relaxed",
            children: t.content
          }), t.variables && t.variables.length > 0 && /*#__PURE__*/_jsx("div", {
            className: "flex flex-wrap gap-1 mt-4",
            children: t.variables.map(v => /*#__PURE__*/_jsx("span", {
              className: "px-2 py-0.5 text-xs rounded bg-primary-500/10 text-primary-400 font-mono",
              children: `{{${v}}}`
            }, v))
          })]
        }, t._id))
      })]
    }), showModal && /*#__PURE__*/_jsx(TemplateModal, {
      template: editTpl,
      onClose: () => {
        setShowModal(false);
        setEditTpl(null);
      },
      onSave: fetchTemplates
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleDelete,
      title: "Delete Template",
      message: "This template will be permanently deleted."
    })]
  });
}
