import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Upload, Download, Search, Trash2, Edit2, Phone } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, Modal, ConfirmDialog, EmptyState, Pagination, Spinner } from '../components/ui';
import { contactsAPI } from '../api';
import toast from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const PLATFORMS = [{
  key: 'whatsapp',
  label: 'WhatsApp',
  color: 'text-emerald-400'
}, {
  key: 'facebook',
  label: 'Facebook',
  color: 'text-blue-400'
}, {
  key: 'instagram',
  label: 'Instagram',
  color: 'text-pink-400'
}, {
  key: 'tiktok',
  label: 'TikTok',
  color: 'text-purple-400'
}, {
  key: 'phone',
  label: 'Phone',
  color: 'text-yellow-400'
}];
function ContactModal({
  contact,
  onClose,
  onSave
}) {
  const [form, setForm] = useState(contact || {});
  const [loading, setLoading] = useState(false);
  const isEdit = !!contact?._id;
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const handleSave = async () => {
    if (!form.name?.trim()) return toast.error('Name is required');
    setLoading(true);
    try {
      if (isEdit) {
        await contactsAPI.update(contact._id, form);
        toast.success('Contact updated successfully');
      } else {
        await contactsAPI.create(form);
        toast.success('Contact created successfully');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: isEdit ? 'Edit Contact' : 'New Contact',
    size: "lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Full Name *"
        }), /*#__PURE__*/_jsx("input", {
          value: form.name || '',
          onChange: set('name'),
          placeholder: "Contact name",
          className: "input",
          required: true
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Company"
        }), /*#__PURE__*/_jsx("input", {
          value: form.company || '',
          onChange: set('company'),
          placeholder: "Company name",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Email"
        }), /*#__PURE__*/_jsx("input", {
          type: "email",
          value: form.email || '',
          onChange: set('email'),
          placeholder: "email@example.com",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Phone"
        }), /*#__PURE__*/_jsx("input", {
          value: form.phone || '',
          onChange: set('phone'),
          placeholder: "+234...",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "WhatsApp"
        }), /*#__PURE__*/_jsx("input", {
          value: form.whatsapp || '',
          onChange: set('whatsapp'),
          placeholder: "+234...",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Facebook"
        }), /*#__PURE__*/_jsx("input", {
          value: form.facebook || '',
          onChange: set('facebook'),
          placeholder: "Facebook handle",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Instagram"
        }), /*#__PURE__*/_jsx("input", {
          value: form.instagram || '',
          onChange: set('instagram'),
          placeholder: "@handle",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "TikTok"
        }), /*#__PURE__*/_jsx("input", {
          value: form.tiktok || '',
          onChange: set('tiktok'),
          placeholder: "@handle",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Segment"
        }), /*#__PURE__*/_jsx("input", {
          value: form.segment || '',
          onChange: set('segment'),
          placeholder: "VIP, Lead...",
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Notes"
        }), /*#__PURE__*/_jsx("input", {
          value: form.notes || '',
          onChange: set('notes'),
          placeholder: "Internal notes...",
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
        }) : isEdit ? 'Update Contact' : 'Create Contact'
      })]
    })]
  });
}
export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactsAPI.getAll({
        page,
        limit: 20,
        search
      });
      const data = res.data?.data || [];
      setContacts(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setContacts([]);
      toast.error("Failed to load contacts. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await contactsAPI.delete(deleteId);
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch {
      toast.error('Failed to delete contact');
    } finally {
      setDeleteId(null);
    }
  };
  const handleImport = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      await contactsAPI.import(fd);
      toast.success('Contacts imported successfully!');
      fetchContacts();
    } catch {
      toast.error('Import failed');
    } finally {
      e.target.value = '';
    }
  };
  const rows = useMemo(() => contacts.map(c => [/*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("p", {
      className: "font-medium text-white",
      children: c.name
    }), c.company && /*#__PURE__*/_jsx("p", {
      className: "text-xs text-brand-muted",
      children: c.company
    })]
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs font-mono text-brand-muted",
    children: c.phone || '—'
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs font-mono text-emerald-400",
    children: c.whatsapp || '—'
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs text-blue-400",
    children: c.facebook || '—'
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs text-pink-400",
    children: c.instagram || '—'
  }), /*#__PURE__*/_jsx("span", {
    className: "text-xs text-purple-400",
    children: c.tiktok || '—'
  }), c.segment ? /*#__PURE__*/_jsx("span", {
    className: "badge badge-purple",
    children: c.segment
  }) : /*#__PURE__*/_jsx("span", {
    className: "text-brand-muted text-xs",
    children: "\u2014"
  }), /*#__PURE__*/_jsxs("div", {
    className: "flex items-center gap-1",
    children: [/*#__PURE__*/_jsx("button", {
      onClick: () => {
        setEditContact(c);
        setShowModal(true);
      },
      className: "p-1.5 rounded hover:bg-primary-500/20 text-brand-muted hover:text-primary-400 transition-colors",
      children: /*#__PURE__*/_jsx(Edit2, {
        size: 13
      })
    }), /*#__PURE__*/_jsx("button", {
      onClick: () => setDeleteId(c._id),
      className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400 transition-colors",
      children: /*#__PURE__*/_jsx(Trash2, {
        size: 13
      })
    })]
  })]), [contacts]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Contacts",
      subtitle: "Manage all your contacts across platforms"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 space-y-4 animate-fade-in",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex flex-wrap items-center gap-3 justify-between",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "relative flex-1 max-w-xs",
          children: [/*#__PURE__*/_jsx(Search, {
            size: 14,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
          }), /*#__PURE__*/_jsx("input", {
            value: search,
            onChange: e => {
              setSearch(e.target.value);
              setPage(1);
            },
            placeholder: "Search contacts\u2026",
            className: "input pl-9"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsxs("label", {
            className: "btn-secondary cursor-pointer",
            children: [/*#__PURE__*/_jsx(Upload, {
              size: 14
            }), " Import CSV", /*#__PURE__*/_jsx("input", {
              type: "file",
              accept: ".csv,.xlsx",
              className: "hidden",
              onChange: handleImport
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => contactsAPI.exportCSV(),
            className: "btn-secondary",
            children: [/*#__PURE__*/_jsx(Download, {
              size: 14
            }), " Export"]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => {
              setEditContact(null);
              setShowModal(true);
            },
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " New Contact"]
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-3 flex-wrap",
        children: PLATFORMS.map(p => /*#__PURE__*/_jsxs("div", {
          className: "card px-3 py-2",
          children: [/*#__PURE__*/_jsx("p", {
            className: `text-xs font-medium ${p.color}`,
            children: p.label
          }), /*#__PURE__*/_jsx("p", {
            className: "text-lg font-display font-bold text-white",
            children: contacts.filter(c => !!c[p.key]).length
          })]
        }, p.key))
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Name', 'Phone', 'WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'Segment', 'Actions'],
          rows: rows,
          loading: loading
        }), !loading && contacts.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: Phone,
          title: "No contacts yet",
          description: "Create your first contact or import from CSV",
          action: /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowModal(true),
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " New Contact"]
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
    }), showModal && /*#__PURE__*/_jsx(ContactModal, {
      contact: editContact,
      onClose: () => {
        setShowModal(false);
        setEditContact(null);
      },
      onSave: fetchContacts
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleDelete,
      title: "Delete Contact",
      message: "Are you sure? This action cannot be undone."
    })]
  });
}
