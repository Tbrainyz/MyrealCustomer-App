import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Calendar, Trash2, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import { Table, StatusBadge, Modal, ConfirmDialog, EmptyState, Spinner } from '../components/ui';
import { messagesAPI, contactsAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const MOCK_SCHEDULED = [{
  _id: '1',
  platform: 'whatsapp',
  content: 'Good morning! Check our latest deals 🔥',
  scheduledAt: new Date(Date.now() + 3600000).toISOString(),
  recurrence: 'daily',
  status: 'pending',
  contacts: ['c1', 'c2', 'c3']
}, {
  _id: '2',
  platform: 'instagram',
  content: 'Flash sale starts NOW! 30% off everything.',
  scheduledAt: new Date(Date.now() + 86400000).toISOString(),
  recurrence: 'none',
  status: 'pending',
  contacts: ['c1']
}];
function ScheduleModal({
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    platform: 'whatsapp',
    content: '',
    scheduledAt: '',
    recurrence: 'none',
    contacts: []
  });
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    contactsAPI.getAll({
      limit: 200
    }).then(r => {
      const data = r.data?.data;
      setContacts(Array.isArray(data) ? data : []);
    }).catch(() => {});
  }, []);
  const toggle = id => setForm(f => ({
    ...f,
    contacts: f.contacts.includes(id) ? f.contacts.filter(x => x !== id) : [...f.contacts, id]
  }));
  const handleSave = async () => {
    if (!form.content || !form.scheduledAt) return toast.error('Fill all required fields');
    setLoading(true);
    try {
      await messagesAPI.schedule(form);
      toast.success('Message scheduled!');
      onSave();
      onClose();
    } catch {
      toast.error('Failed to schedule');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: true,
    onClose: onClose,
    title: "Schedule Message",
    size: "xl",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-2 gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Platform *"
        }), /*#__PURE__*/_jsx("select", {
          value: form.platform,
          onChange: e => setForm(f => ({
            ...f,
            platform: e.target.value
          })),
          className: "input",
          children: ['whatsapp', 'facebook', 'instagram', 'sms'].map(p => /*#__PURE__*/_jsx("option", {
            value: p,
            children: p.charAt(0).toUpperCase() + p.slice(1)
          }, p))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Recurrence"
        }), /*#__PURE__*/_jsx("select", {
          value: form.recurrence,
          onChange: e => setForm(f => ({
            ...f,
            recurrence: e.target.value
          })),
          className: "input",
          children: [['none', 'One-time'], ['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']].map(([v, l]) => /*#__PURE__*/_jsx("option", {
            value: v,
            children: l
          }, v))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Schedule Date & Time *"
        }), /*#__PURE__*/_jsx("input", {
          type: "datetime-local",
          value: form.scheduledAt,
          onChange: e => setForm(f => ({
            ...f,
            scheduledAt: e.target.value
          })),
          className: "input"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Message *"
        }), /*#__PURE__*/_jsx("textarea", {
          value: form.content,
          onChange: e => setForm(f => ({
            ...f,
            content: e.target.value
          })),
          placeholder: "Your message\u2026 Use {{FirstName}} for personalization",
          rows: 4,
          className: "input resize-none"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "col-span-2",
        children: [/*#__PURE__*/_jsxs("label", {
          className: "label",
          children: ["Select Contacts (", form.contacts.length, " selected)"]
        }), /*#__PURE__*/_jsx("div", {
          className: "max-h-40 overflow-y-auto border border-brand-border rounded-lg p-2 space-y-1",
          children: contacts.map(c => /*#__PURE__*/_jsxs("label", {
            className: `flex items-center gap-2 p-1.5 rounded cursor-pointer text-sm transition-colors ${form.contacts.includes(c._id) ? 'text-white bg-primary-500/10' : 'text-brand-muted hover:bg-brand-border'}`,
            children: [/*#__PURE__*/_jsx("input", {
              type: "checkbox",
              checked: form.contacts.includes(c._id),
              onChange: () => toggle(c._id),
              className: "accent-violet-500"
            }), c.name, c.company ? ` — ${c.company}` : '']
          }, c._id))
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
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Calendar, {
            size: 14
          }), " Schedule"]
        })
      })]
    })]
  });
}
export default function Scheduled() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await messagesAPI.getScheduled();
      const data = res.data?.data;
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages(MOCK_SCHEDULED);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  const handleCancel = async () => {
    if (!deleteId) return;
    try {
      await messagesAPI.cancelScheduled(deleteId);
      toast.success('Cancelled');
      fetchMessages();
    } catch {
      toast.error('Failed to cancel');
    } finally {
      setDeleteId(null);
    }
  };
  const platformColor = {
    whatsapp: 'text-emerald-400',
    facebook: 'text-blue-400',
    instagram: 'text-pink-400',
    sms: 'text-yellow-400'
  };
  const rows = useMemo(() => (Array.isArray(messages) ? messages : []).map(m => [/*#__PURE__*/_jsx("span", {
    className: `text-xs font-semibold ${platformColor[m.platform] || 'text-white'}`,
    children: m.platform.toUpperCase()
  }), /*#__PURE__*/_jsx("p", {
    className: "text-sm text-white max-w-xs truncate",
    children: m.content
  }), /*#__PURE__*/_jsxs("div", {
    className: "flex items-center gap-1.5 text-xs text-brand-muted",
    children: [/*#__PURE__*/_jsx(Clock, {
      size: 12
    }), " ", format(new Date(m.scheduledAt), 'MMM d, yyyy h:mm a')]
  }), /*#__PURE__*/_jsx("span", {
    className: "badge badge-blue",
    children: m.recurrence
  }), /*#__PURE__*/_jsxs("span", {
    className: "text-sm text-brand-muted",
    children: [(m.contacts || []).length, " contacts"]
  }), /*#__PURE__*/_jsx(StatusBadge, {
    status: m.status
  }), /*#__PURE__*/_jsx("button", {
    onClick: () => setDeleteId(m._id),
    className: "p-1.5 rounded hover:bg-red-500/20 text-brand-muted hover:text-red-400 transition-colors",
    children: /*#__PURE__*/_jsx(Trash2, {
      size: 13
    })
  })]), [messages]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Scheduled Messages",
      subtitle: "Manage your automated message schedule"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex justify-end mb-4",
        children: /*#__PURE__*/_jsxs("button", {
          onClick: () => setShowModal(true),
          className: "btn-primary",
          children: [/*#__PURE__*/_jsx(Plus, {
            size: 14
          }), " Schedule Message"]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "card overflow-hidden",
        children: [/*#__PURE__*/_jsx(Table, {
          headers: ['Platform', 'Message', 'Scheduled At', 'Recurrence', 'Recipients', 'Status', 'Actions'],
          rows: rows,
          loading: loading
        }), !loading && messages.length === 0 && /*#__PURE__*/_jsx(EmptyState, {
          icon: Calendar,
          title: "No scheduled messages",
          description: "Set up automatic messages for your contacts",
          action: /*#__PURE__*/_jsxs("button", {
            onClick: () => setShowModal(true),
            className: "btn-primary",
            children: [/*#__PURE__*/_jsx(Plus, {
              size: 14
            }), " Schedule Message"]
          })
        })]
      })]
    }), showModal && /*#__PURE__*/_jsx(ScheduleModal, {
      onClose: () => setShowModal(false),
      onSave: fetchMessages
    }), /*#__PURE__*/_jsx(ConfirmDialog, {
      isOpen: !!deleteId,
      onClose: () => setDeleteId(null),
      onConfirm: handleCancel,
      title: "Cancel Scheduled Message",
      message: "Are you sure you want to cancel this scheduled message?",
      confirmText: "Yes, Cancel"
    })]
  });
}
