import { useEffect, useState, useCallback, useMemo } from 'react';
import { Plus, Calendar, Trash2, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import {
  Table,
  StatusBadge,
  Modal,
  ConfirmDialog,
  EmptyState,
  Spinner
} from '../components/ui';
import { messagesAPI, contactsAPI } from '../api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
/* ---------------- MOCK ---------------- */
const MOCK_SCHEDULED = [
  {
    _id: '1',
    platform: 'whatsapp',
    content: 'Good morning! Check our latest deals 🔥',
    scheduledAt: new Date(Date.now() + 3600000).toISOString(),
    recurrence: 'daily',
    status: 'pending',
    contacts: ['c1', 'c2', 'c3']
  },
  {
    _id: '2',
    platform: 'instagram',
    content: 'Flash sale starts NOW! 30% off everything.',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    recurrence: 'none',
    status: 'pending',
    contacts: ['c1']
  }
];

/* ---------------- MODAL ---------------- */
function ScheduleModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    platform: 'whatsapp',
    content: '',
    scheduledAt: '',
    recurrence: 'none',
    contacts: [],
    media: []
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    contactsAPI.getAll({ limit: 200 })
      .then(r => {
        const data = r.data?.data;
        setContacts(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  const toggle = (id) =>
    setForm(f => ({
      ...f,
      contacts: f.contacts.includes(id)
        ? f.contacts.filter(x => x !== id)
        : [...f.contacts, id]
    }));

  /* ---------------- MEDIA ---------------- */
  const handleMedia = (e) => {
    const files = Array.from(e.target.files || []);
    setForm(f => ({
      ...f,
      media: [...f.media, ...files]
    }));
  };

  const removeMedia = (index) => {
    setForm(f => ({
      ...f,
      media: f.media.filter((_, i) => i !== index)
    }));
  };

  const isSMS = form.platform === 'sms';

  const handleSave = async () => {
    if (!form.content || !form.scheduledAt) {
      return toast.error('Fill all required fields');
    }

    setLoading(true);

    try {
      const payload = new FormData();

      payload.append('platform', form.platform);
      payload.append('content', form.content);
      payload.append('scheduledAt', form.scheduledAt);
      payload.append('recurrence', form.recurrence);
      payload.append('contacts', JSON.stringify(form.contacts));

      form.media.forEach(file => {
        payload.append('media', file);
      });

      await messagesAPI.schedule(payload);

      toast.success('Message scheduled!');
      onSave();
      onClose();
    } catch {
      toast.error('Failed to schedule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Schedule Message" size="xl">
      <div className="grid grid-cols-2 gap-4">

        {/* PLATFORM */}
        <div>
          <label className="label">Platform *</label>
          <select
            value={form.platform}
            onChange={e =>
              setForm(f => ({
                ...f,
                platform: e.target.value,
                media: e.target.value === 'sms' ? [] : f.media
              }))
            }
            className="input"
          >
            {[
              'whatsapp',
              'facebook',
              'instagram',
              'sms',
              'email',
              'tiktok'
            ].map(p => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* RECURRENCE */}
        <div>
          <label className="label">Recurrence</label>
          <select
            value={form.recurrence}
            onChange={e =>
              setForm(f => ({ ...f, recurrence: e.target.value }))
            }
            className="input"
          >
            {[
              ['none', 'One-time'],
              ['daily', 'Daily'],
              ['weekly', 'Weekly'],
              ['monthly', 'Monthly']
            ].map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div className="col-span-2">
          <label className="label">Schedule Date & Time *</label>
          <input
            type="datetime-local"
            value={form.scheduledAt}
            onChange={e =>
              setForm(f => ({ ...f, scheduledAt: e.target.value }))
            }
            className="input"
          />
        </div>

        {/* MESSAGE */}
        <div className="col-span-2">
          <label className="label">Message *</label>
          <textarea
            value={form.content}
            onChange={e =>
              setForm(f => ({ ...f, content: e.target.value }))
            }
            rows={4}
            className="input resize-none"
          />
        </div>

        {/* MEDIA */}
        {!isSMS && (
          <div className="col-span-2">
            <label className="label">Media (Images / Videos)</label>

            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMedia}
              className="input"
            />

            {/* PREVIEW */}
            {form.media.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.media.map((file, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 border border-brand-border rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeMedia(i)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACTS */}
        <div className="col-span-2">
          <label className="label">
            Select Contacts ({form.contacts.length} selected)
          </label>

          <div className="max-h-40 overflow-y-auto border border-brand-border rounded-lg p-2 space-y-1">
            {contacts.map(c => (
              <label
                key={c._id}
                className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-sm ${
                  form.contacts.includes(c._id)
                    ? 'text-white bg-primary-500/10'
                    : 'text-brand-muted hover:bg-brand-border'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.contacts.includes(c._id)}
                  onChange={() => toggle(c._id)}
                  className="accent-violet-500"
                />
                {c.name}
                {c.company ? ` — ${c.company}` : ''}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 justify-end mt-6">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Scheduling...' : 'Schedule'}
        </button>
      </div>
    </Modal>
  );
}

/* ---------------- MAIN PAGE ---------------- */
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
    sms: 'text-yellow-400',
    email: 'text-purple-400',
    tiktok: 'text-white'
  };

  const rows = useMemo(
    () =>
      (Array.isArray(messages) ? messages : []).map(m => [
        <span className={`text-xs font-semibold ${platformColor[m.platform] || 'text-white'}`}>
          {(m.platform || '').toUpperCase()}
        </span>,
        <p className="text-sm text-white truncate max-w-xs">{m.content}</p>,
        <div className="flex items-center gap-1 text-xs text-brand-muted">
          <Clock size={12} />
          {format(new Date(m.scheduledAt), 'MMM d, yyyy h:mm a')}
        </div>,
        <span className="badge badge-blue">{m.recurrence}</span>,
        <span className="text-sm text-brand-muted">
          {(m.contacts || []).length} contacts
        </span>,
        <StatusBadge status={m.status} />,
        <button
          onClick={() => setDeleteId(m._id)}
          className="text-red-400"
        >
          <Trash2 size={13} />
        </button>
      ]),
    [messages]
  );

  return (
    <>
      <Header title="Scheduled Messages" subtitle="Manage schedules" />

      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={14} /> Schedule
          </button>
        </div>

        <div className="card">
          <Table
            headers={[
              'Platform',
              'Message',
              'Time',
              'Recurrence',
              'Recipients',
              'Status',
              'Actions'
            ]}
            rows={rows}
            loading={loading}
          />
        </div>
      </div>

      {showModal && (
        <ScheduleModal
          onClose={() => setShowModal(false)}
          onSave={fetchMessages}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleCancel}
        title="Cancel Scheduled Message"
        message="Are you sure?"
      />
    </>
  );
}