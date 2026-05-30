import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus,
  Upload,
  Download,
  Search,
  Trash2,
  Edit2,
  Phone,
  Users,
  Smartphone
} from 'lucide-react';

import Header from '../components/layout/Header';
import {
  Table,
  Modal,
  ConfirmDialog,
  EmptyState,
  Pagination,
  Spinner,
  StatCard
} from '../components/ui';

import { contactsAPI } from '../api';
import toast from 'react-hot-toast';

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const PLATFORMS = [
  { key: 'phone', label: 'Phone', icon: Phone, color: 'blue' },
  { key: 'whatsapp', label: 'WhatsApp', icon: Smartphone, color: 'green' },
  { key: 'facebook', label: 'Facebook', color: 'blue' },
  { key: 'instagram', label: 'Instagram', color: 'purple' },
  { key: 'tiktok', label: 'TikTok', color: 'yellow' }
];

function ContactModal({ contact, onClose, onSave }) {
  const [form, setForm] = useState(contact || {});
  const [loading, setLoading] = useState(false);

  const isEdit = !!contact?._id;

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.name?.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);

    try {
      if (isEdit) {
        await contactsAPI.update(contact._id, form);
        toast.success('Contact updated');
      } else {
        await contactsAPI.create(form);
        toast.success('Contact created');
      }

      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={isEdit ? 'Edit Contact' : 'New Contact'} size="lg">
      <div className="space-y-6">

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label">Full Name *</label>
            <input className="input" value={form.name || ''} onChange={set('name')} />
          </div>

          <div>
            <label className="label">Company</label>
            <input className="input" value={form.company || ''} onChange={set('company')} />
          </div>

          <div>
            <label className="label">Email</label>
            <input className="input" value={form.email || ''} onChange={set('email')} />
          </div>

          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone || ''} onChange={set('phone')} />
          </div>

          <div>
            <label className="label">WhatsApp</label>
            <input className="input" value={form.whatsapp || ''} onChange={set('whatsapp')} />
          </div>

          <div>
            <label className="label">Instagram</label>
            <input className="input" value={form.instagram || ''} onChange={set('instagram')} />
          </div>

          <div>
            <label className="label">Facebook</label>
            <input className="input" value={form.facebook || ''} onChange={set('facebook')} />
          </div>

          <div>
            <label className="label">TikTok</label>
            <input className="input" value={form.tiktok || ''} onChange={set('tiktok')} />
          </div>

          <div className="col-span-2">
            <label className="label">Segment</label>
            <input className="input" value={form.segment || ''} onChange={set('segment')} />
          </div>

          <div className="col-span-2">
            <label className="label">Notes</label>
            <input className="input" value={form.notes || ''} onChange={set('notes')} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? <Spinner size={14} /> : isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
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
      toast.error('Failed to load contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const stats = useMemo(() => ({
    total: contacts.length,
    whatsapp: contacts.filter(c => c.whatsapp).length,
    instagram: contacts.filter(c => c.instagram).length,
    segmented: contacts.filter(c => c.segment).length
  }), [contacts]);

  const rows = useMemo(() =>
    contacts.map(c => ([
      <div>
        <p className="font-medium text-white">{c.name}</p>
        {c.company && <p className="text-xs text-brand-muted">{c.company}</p>}
      </div>,

      c.phone || '—',
      c.whatsapp || '—',
      c.instagram || '—',
      c.facebook || '—',
      c.tiktok || '—',

      c.segment ? (
        <span className="badge badge-purple">{c.segment}</span>
      ) : (
        '—'
      ),

      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditContact(c);
            setShowModal(true);
          }}
          className="p-2 rounded hover:bg-primary-500/20"
        >
          <Edit2 size={14} />
        </button>

        <button
          onClick={() => setDeleteId(c._id)}
          className="p-2 rounded hover:bg-red-500/20"
        >
          <Trash2 size={14} />
        </button>
      </div>
    ])), [contacts]
  );

  return (
    <_Fragment>

      <Header
        title="Contacts"
        subtitle="Manage and organize your audience"
      />

      <div className="p-6 space-y-6">

        {/* KPI ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Contacts" value={stats.total} icon={Users} color="blue" />
          <StatCard label="WhatsApp" value={stats.whatsapp} icon={Smartphone} color="green" />
          <StatCard label="Instagram" value={stats.instagram} icon={Users} color="purple" />
          <StatCard label="Segmented" value={stats.segmented} icon={Users} color="yellow" />
        </div>

        {/* HEADER ACTIONS */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">

          <div className="relative w-full lg:max-w-sm">
            <Search size={14} className="absolute left-3 top-3 text-brand-muted" />
            <input
              className="input pl-9"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex gap-2">
            <button className="btn-secondary">
              <Upload size={14} /> Import
            </button>

            <button className="btn-secondary">
              <Download size={14} /> Export
            </button>

            <button
              className="btn-primary"
              onClick={() => {
                setEditContact(null);
                setShowModal(true);
              }}
            >
              <Plus size={14} /> Add Contact
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">
          <Table
            headers={[
              'Name',
              'Phone',
              'WhatsApp',
              'Instagram',
              'Facebook',
              'TikTok',
              'Segment',
              'Actions'
            ]}
            rows={rows}
            loading={loading}
          />

          {!loading && contacts.length === 0 && (
            <EmptyState
              icon={Phone}
              title="No contacts found"
              description="Start by adding your first contact"
              action={
                <button
                  className="btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <Plus size={14} /> Add Contact
                </button>
              }
            />
          )}

          <div className="px-4 pb-4">
            <Pagination
              page={page}
              pages={pages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <ContactModal
          contact={editContact}
          onClose={() => {
            setShowModal(false);
            setEditContact(null);
          }}
          onSave={fetchContacts}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          await contactsAPI.delete(deleteId);
          toast.success('Deleted');
          fetchContacts();
        }}
        title="Delete Contact"
        message="This action cannot be undone"
      />
    </_Fragment>
  );
}