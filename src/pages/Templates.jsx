import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Copy, FileText } from 'lucide-react';

import Header from '../components/layout/Header';
import {
  Modal,
  ConfirmDialog,
  EmptyState,
  Spinner
} from '../components/ui';

import { templatesAPI } from '../api';
import toast from 'react-hot-toast';

/* ---------------- PLATFORM BADGES ---------------- */
const PLATFORM_BADGE = {
  whatsapp: 'badge-green',
  facebook: 'badge-blue',
  instagram: 'badge-red',
  sms: 'badge-yellow',
  all: 'badge-purple'
};

/* ---------------- TEMPLATE MODAL ---------------- */
function TemplateModal({ template, onClose, onSave }) {
  const [form, setForm] = useState({
    name: template?.name || '',
    content: template?.content || '',
    platform: template?.platform || 'whatsapp'
  });

  const [loading, setLoading] = useState(false);
  const isEdit = !!template?._id;

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Template name is required');
    if (!form.content.trim()) return toast.error('Template content is required');

    setLoading(true);
    try {
      if (isEdit) {
        await templatesAPI.update(template._id, form);
        toast.success('Template updated');
      } else {
        await templatesAPI.create(form);
        toast.success('Template created');
      }

      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={isEdit ? 'Edit Template' : 'New Template'}
      size="lg"
    >
      <div className="space-y-4">

        <input
          className="input"
          placeholder="Template Name"
          value={form.name}
          onChange={e =>
            setForm(f => ({ ...f, name: e.target.value }))
          }
        />

        <select
          className="input"
          value={form.platform}
          onChange={e =>
            setForm(f => ({ ...f, platform: e.target.value }))
          }
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="sms">SMS</option>
          <option value="all">All Platforms</option>
        </select>

        <textarea
          className="input resize-none"
          rows={6}
          placeholder="Write message content..."
          value={form.content}
          onChange={e =>
            setForm(f => ({ ...f, content: e.target.value }))
          }
        />

        {/* VARIABLES */}
        <div className="flex flex-wrap gap-2">
          {['FirstName', 'Company', 'Phone', 'Date'].map(v => (
            <button
              key={v}
              onClick={() =>
                setForm(f => ({
                  ...f,
                  content: f.content + `{{${v}}}`
                }))
              }
              className="px-2 py-1 text-xs rounded bg-primary-500/10 text-primary-400 font-mono"
            >
              {`{{${v}}}`}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? <Spinner size={14} /> : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- MAIN PAGE ---------------- */
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
      setTemplates(res.data?.data || []);
    } catch {
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleDelete = async () => {
    try {
      await templatesAPI.delete(deleteId);
      toast.success('Template deleted');
      fetchTemplates();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <>
      <Header
        title="Message Templates"
        subtitle="Reusable messaging system"
      />

      <div className="p-6 space-y-6 animate-fade-in">

        {/* HEADER */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditTpl(null);
              setShowModal(true);
            }}
            className="btn-primary"
          >
            <Plus size={14} /> New Template
          </button>
        </div>

        {/* STATES */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={40} />
          </div>
        ) : templates.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No templates yet"
            description="Create reusable message templates"
            action={
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
              >
                <Plus size={14} /> Create Template
              </button>
            }
          />
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {templates.map(t => (
              <div
                key={t._id}
                className="card p-5 hover:border-primary-500/40 transition-all group"
              >

                {/* HEADER */}
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">
                      {t.name}
                    </h4>

                    <span
                      className={`badge mt-1 ${
                        PLATFORM_BADGE[t.platform] || 'badge-blue'
                      }`}
                    >
                      {t.platform}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(t.content);
                        toast.success('Copied');
                      }}
                      className="p-1.5 hover:bg-brand-border rounded"
                    >
                      <Copy size={13} />
                    </button>

                    <button
                      onClick={() => {
                        setEditTpl(t);
                        setShowModal(true);
                      }}
                      className="p-1.5 hover:bg-primary-500/20 rounded"
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      onClick={() => setDeleteId(t._id)}
                      className="p-1.5 hover:bg-red-500/20 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <p className="text-sm text-brand-muted line-clamp-4">
                  {t.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <TemplateModal
          template={editTpl}
          onClose={() => {
            setShowModal(false);
            setEditTpl(null);
          }}
          onSave={fetchTemplates}
        />
      )}

      {/* DELETE */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Template"
        message="This action cannot be undone"
      />
    </>
  );
}