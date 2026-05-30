import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import Header from '../components/layout/Header';
import { messagesAPI, contactsAPI, templatesAPI } from '../api';
import { Spinner, Modal } from '../components/ui';
import toast from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const PLATFORMS = [{
  value: 'whatsapp',
  label: 'WhatsApp',
  emoji: '💬',
  border: 'border-emerald-500',
  bg: 'bg-emerald-500/10',
  text: 'text-emerald-400'
}, {
  value: 'facebook',
  label: 'Facebook',
  emoji: '📘',
  border: 'border-blue-500',
  bg: 'bg-blue-500/10',
  text: 'text-blue-400'
}, {
  value: 'instagram',
  label: 'Instagram',
  emoji: '📸',
  border: 'border-pink-500',
  bg: 'bg-pink-500/10',
  text: 'text-pink-400'
}, {
  value: 'sms',
  label: 'SMS',
  emoji: '📱',
  border: 'border-yellow-500',
  bg: 'bg-yellow-500/10',
  text: 'text-yellow-400'
}];
const VARS = ['{{FirstName}}', '{{Company}}', '{{Phone}}', '{{Date}}'];
export default function Compose() {
  const [platform, setPlatform] = useState('whatsapp');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setLoading(true);
    Promise.all([contactsAPI.getAll({
      limit: 200
    }).catch(() => ({
      data: {
        data: []
      }
    })), templatesAPI.getAll().catch(() => ({
      data: {
        data: []
      }
    }))]).then(([c, t]) => {
      setContacts(c.data.data || []);
      setTemplates(t.data.data || []);
    }).finally(() => setLoading(false));
  }, []);
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.company || '').toLowerCase().includes(search.toLowerCase()));
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const handleSend = async () => {
    setSending(true);
    try {
      const res = await messagesAPI.send({
        platform,
        content,
        contacts: selected
      });
      toast.success(`Sent: ${res.data.data.sent}, Failed: ${res.data.data.failed}`);
      setContent('');
      setSelected([]);
      setConfirm(false);
    } catch {
      toast.error('Failed to send');
    } finally {
      setSending(false);
    }
  };
  const maxChars = platform === 'sms' ? 160 : 4096;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Compose Message",
      subtitle: "Send messages across all platforms"
    }), /*#__PURE__*/_jsx("div", {
      className: "p-6 animate-fade-in",
      children: /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "lg:col-span-2 space-y-5",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "card p-5",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "section-title mb-4",
              children: "Select Platform"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
              children: PLATFORMS.map(p => /*#__PURE__*/_jsxs("button", {
                onClick: () => setPlatform(p.value),
                className: `flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium ${platform === p.value ? `${p.border} ${p.bg} ${p.text}` : 'border-brand-border text-brand-muted hover:border-brand-muted'}`,
                children: [/*#__PURE__*/_jsx("span", {
                  className: "text-2xl",
                  children: p.emoji
                }), /*#__PURE__*/_jsx("span", {
                  children: p.label
                })]
              }, p.value))
            })]
          }), templates.length > 0 && /*#__PURE__*/_jsxs("div", {
            className: "card p-5",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "section-title mb-3",
              children: "Quick Templates"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-2",
              children: templates.slice(0, 6).map(t => /*#__PURE__*/_jsx("button", {
                onClick: () => setContent(t.content),
                className: "px-3 py-1.5 rounded-lg bg-brand-border hover:bg-primary-500/20 hover:text-primary-400 text-sm text-brand-muted transition-colors",
                children: t.name
              }, t._id))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "card p-5",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-3",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "section-title",
                children: "Message"
              }), /*#__PURE__*/_jsxs("span", {
                className: `text-xs ${content.length > maxChars * 0.9 ? 'text-yellow-400' : 'text-brand-muted'}`,
                children: [content.length, "/", maxChars]
              })]
            }), /*#__PURE__*/_jsx("textarea", {
              value: content,
              onChange: e => setContent(e.target.value),
              placeholder: `Type your ${platform} message here…\n\nUse {{FirstName}}, {{Company}} for personalization.`,
              rows: 8,
              className: "input resize-none",
              maxLength: maxChars
            }), /*#__PURE__*/_jsx("div", {
              className: "flex gap-2 mt-3 flex-wrap",
              children: VARS.map(v => /*#__PURE__*/_jsx("button", {
                onClick: () => setContent(c => c + v),
                className: "px-2 py-1 text-xs rounded bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 font-mono",
                children: v
              }, v))
            })]
          }), content && /*#__PURE__*/_jsxs("div", {
            className: "card p-5",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "section-title mb-3",
              children: "Preview"
            }), /*#__PURE__*/_jsx("div", {
              className: "bg-brand-darker rounded-xl p-4 max-w-sm",
              children: /*#__PURE__*/_jsxs("div", {
                className: "bg-primary-600/20 border border-primary-500/30 rounded-2xl rounded-tl-sm p-3",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "text-sm text-white whitespace-pre-wrap",
                  children: content.replace('{{FirstName}}', 'Adaeze').replace('{{Company}}', 'TechNigeria').replace('{{Date}}', new Date().toLocaleDateString())
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-brand-muted mt-1 text-right",
                  children: "9:00 AM \u2713\u2713"
                })]
              })
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsxs("div", {
            className: "card p-5 sticky top-20",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-3",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "section-title",
                children: "Recipients"
              }), /*#__PURE__*/_jsxs("span", {
                className: "badge badge-purple",
                children: [selected.length, " selected"]
              })]
            }), /*#__PURE__*/_jsx("input", {
              value: search,
              onChange: e => setSearch(e.target.value),
              placeholder: "Search contacts\u2026",
              className: "input mb-3"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between text-xs mb-2",
              children: [/*#__PURE__*/_jsx("button", {
                onClick: () => setSelected(filtered.map(c => c._id)),
                className: "text-primary-400 hover:underline",
                children: "Select all"
              }), /*#__PURE__*/_jsx("button", {
                onClick: () => setSelected([]),
                className: "text-brand-muted hover:underline",
                children: "Clear"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "max-h-72 overflow-y-auto space-y-1",
              children: loading ? /*#__PURE__*/_jsx("div", {
                className: "flex justify-center py-8",
                children: /*#__PURE__*/_jsx(Spinner, {})
              }) : filtered.length === 0 ? /*#__PURE__*/_jsx("p", {
                className: "text-center text-sm text-brand-muted py-4",
                children: "No contacts found"
              }) : filtered.map(c => /*#__PURE__*/_jsxs("label", {
                className: `flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selected.includes(c._id) ? 'bg-primary-500/10' : 'hover:bg-brand-border'}`,
                children: [/*#__PURE__*/_jsx("input", {
                  type: "checkbox",
                  checked: selected.includes(c._id),
                  onChange: () => toggle(c._id),
                  className: "w-4 h-4 accent-violet-500"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm text-white truncate",
                    children: c.name
                  }), c.company && /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-brand-muted truncate",
                    children: c.company
                  })]
                }), /*#__PURE__*/_jsx("span", {
                  className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${c[platform] ? 'bg-emerald-400' : 'bg-brand-border'}`
                })]
              }, c._id))
            }), /*#__PURE__*/_jsx("div", {
              className: "mt-4 pt-4 border-t border-brand-border",
              children: /*#__PURE__*/_jsxs("button", {
                onClick: () => setConfirm(true),
                disabled: !content || selected.length === 0,
                className: "btn-primary w-full justify-center",
                children: [/*#__PURE__*/_jsx(Send, {
                  size: 14
                }), " Send Now (", selected.length, ")"]
              })
            })]
          })
        })]
      })
    }), /*#__PURE__*/_jsxs(Modal, {
      isOpen: confirm,
      onClose: () => setConfirm(false),
      title: "Confirm Send",
      size: "sm",
      children: [/*#__PURE__*/_jsxs("p", {
        className: "text-sm text-brand-muted mb-3",
        children: ["Sending a ", /*#__PURE__*/_jsx("strong", {
          className: "text-white",
          children: platform.toUpperCase()
        }), " message to ", /*#__PURE__*/_jsxs("strong", {
          className: "text-white",
          children: [selected.length, " contacts"]
        }), "."]
      }), /*#__PURE__*/_jsxs("div", {
        className: "bg-brand-darker rounded-lg p-3 text-sm text-white/80 italic border border-brand-border mb-4",
        children: ["\"", content.slice(0, 120), content.length > 120 ? '…' : '', "\""]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-3 justify-end",
        children: [/*#__PURE__*/_jsx("button", {
          onClick: () => setConfirm(false),
          className: "btn-secondary",
          children: "Cancel"
        }), /*#__PURE__*/_jsx("button", {
          onClick: handleSend,
          disabled: sending,
          className: "btn-primary",
          children: sending ? /*#__PURE__*/_jsx(Spinner, {
            size: 14
          }) : /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Send, {
              size: 14
            }), " Confirm Send"]
          })
        })]
      })]
    })]
  });
}
