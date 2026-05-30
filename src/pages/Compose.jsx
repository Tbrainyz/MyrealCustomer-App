import { useEffect, useState } from 'react';
import { Send, ImagePlus, X } from 'lucide-react';
import Header from '../components/layout/Header';
import { messagesAPI, contactsAPI, templatesAPI } from '../api';
import { Spinner, Modal } from '../components/ui';
import toast from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const PLATFORMS = [
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    emoji: '💬',
    canMedia: true
  },
  {
    value: 'facebook',
    label: 'Facebook',
    emoji: '📘',
    canMedia: true
  },
  {
    value: 'instagram',
    label: 'Instagram',
    emoji: '📸',
    canMedia: true
  },
  {
    value: 'sms',
    label: 'SMS',
    emoji: '📱',
    canMedia: false
  },
  {
    value: 'email',
    label: 'Email',
    emoji: '📧',
    canMedia: true
  },
  {
    value: 'tiktok',
    label: 'TikTok',
    emoji: '🎵',
    canMedia: true
  }
];

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
  const [media, setMedia] = useState([]);

  const activePlatform = PLATFORMS.find(p => p.value === platform);
  const allowMedia = activePlatform?.canMedia;

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const [c, t] = await Promise.all([
          contactsAPI.getAll({ limit: 500 }).catch(() => ({ data: { data: [] } })),
          templatesAPI.getAll().catch(() => ({ data: { data: [] } }))
        ]);

        if (!mounted) return;

        setContacts(Array.isArray(c?.data?.data) ? c.data.data : []);
        setTemplates(Array.isArray(t?.data?.data) ? t.data.data : []);
      } catch (err) {
        toast.error('Failed to load data');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, []);

  // 🔥 SMART FILTERING BASED ON PLATFORM
  const filtered = (contacts || []).filter(c => {
    const s = search.toLowerCase();
    const name = (c?.name || '').toLowerCase();
    const company = (c?.company || '').toLowerCase();

    const matchesText = name.includes(s) || company.includes(s);

    // platform-specific filtering
    const hasPlatform =
      platform === 'email' ? !!c.email :
      platform === 'sms' ? !!c.phone :
      platform === 'whatsapp' ? !!c.whatsapp :
      platform === 'facebook' ? !!c.facebook :
      platform === 'instagram' ? !!c.instagram :
      platform === 'tiktok' ? !!c.tiktok :
      true;

    return matchesText && hasPlatform;
  });

  const toggle = id =>
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );

  // 📸 MEDIA UPLOAD
  const handleMedia = e => {
    const files = Array.from(e.target.files || []);
    const images = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setMedia(prev => [...prev, ...images]);
  };

  const removeMedia = idx => {
    setMedia(m => m.filter((_, i) => i !== idx));
  };

  const handleSend = async () => {
    if (!content.trim() || selected.length === 0) return;

    setSending(true);
    try {
      const res = await messagesAPI.send({
        platform,
        content,
        contacts: selected,
        media: media.map(m => m.file)
      });

      toast.success(
        `Sent: ${res.data.data.sent}, Failed: ${res.data.data.failed}`
      );

      setContent('');
      setSelected([]);
      setMedia([]);
      setConfirm(false);
    } catch (err) {
      toast.error('Failed to send');
    } finally {
      setSending(false);
    }
  };

  const maxChars = platform === 'sms' ? 160 : 4096;

  return (
    <>
      <Header
        title="Compose Message"
        subtitle="Send messages across all platforms"
      />

      <div className="p-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">

            {/* PLATFORM */}
            <div className="card p-5">
              <h3 className="section-title mb-4">Select Platform</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PLATFORMS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => {
                      setPlatform(p.value);
                      setMedia([]); // reset media on switch
                    }}
                    className={`p-4 rounded-xl border-2 text-sm font-medium flex flex-col items-center gap-2 ${
                      platform === p.value
                        ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                        : 'border-brand-border text-brand-muted'
                    }`}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TEMPLATE */}
            {templates.length > 0 && (
              <div className="card p-5">
                <h3 className="section-title mb-3">Quick Templates</h3>
                <div className="flex flex-wrap gap-2">
                  {templates.slice(0, 6).map(t => (
                    <button
                      key={t._id}
                      onClick={() => setContent(t.content)}
                      className="px-3 py-1.5 rounded-lg bg-brand-border text-sm"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE */}
            <div className="card p-5">
              <h3 className="section-title mb-3">Message</h3>

              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={7}
                maxLength={maxChars}
                className="input resize-none"
                placeholder={`Write your ${platform} message...`}
              />

              {/* VARIABLES */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {VARS.map(v => (
                  <button
                    key={v}
                    onClick={() => setContent(c => c + v)}
                    className="px-2 py-1 text-xs bg-primary-500/10 text-primary-400 rounded"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* 📸 MEDIA UPLOAD (NOT FOR SMS) */}
            {allowMedia && (
              <div className="card p-5">
                <h3 className="section-title mb-3">Media</h3>

                <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                  <ImagePlus size={14} />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleMedia}
                  />
                </label>

                {/* PREVIEW */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {media.map((m, i) => (
                    <div key={i} className="relative">
                      <img
                        src={m.url}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        onClick={() => removeMedia(i)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="card p-5 sticky top-20">

            <h3 className="section-title mb-3">Recipients</h3>

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input mb-3"
              placeholder="Search contacts..."
            />

            <div className="max-h-72 overflow-y-auto space-y-1">
              {loading ? (
                <Spinner />
              ) : filtered.map(c => (
                <label
                  key={c._id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-brand-border"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(c._id)}
                    onChange={() => toggle(c._id)}
                  />

                  <div className="flex-1">
                    <p className="text-sm text-white">{c.name}</p>
                    <p className="text-xs text-brand-muted">{c.company}</p>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full ${
                      c[platform] ? 'bg-green-400' : 'bg-gray-600'
                    }`}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={() => setConfirm(true)}
              disabled={!content || !selected.length}
              className="btn-primary w-full mt-4"
            >
              <Send size={14} /> Send ({selected.length})
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM */}
      <Modal isOpen={confirm} onClose={() => setConfirm(false)} title="Confirm Send">
        <p className="text-sm text-brand-muted mb-3">
          Send to {selected.length} contacts via {platform}
        </p>

        <button
          onClick={handleSend}
          disabled={sending}
          className="btn-primary w-full"
        >
          {sending ? <Spinner size={14} /> : 'Confirm Send'}
        </button>
      </Modal>
    </>
  );
}