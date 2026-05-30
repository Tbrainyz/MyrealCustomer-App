import { useEffect, useState, useCallback, useMemo } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';

import Header from '../components/layout/Header';
import {
  Table,
  StatusBadge,
  EmptyState,
  Pagination
} from '../components/ui';

import { messagesAPI } from '../api';
import { format } from 'date-fns';

/* ---------------- PLATFORM STYLING (UPDATED) ---------------- */
const platformColor = {
  whatsapp: 'text-emerald-400',
  facebook: 'text-blue-400',
  instagram: 'text-pink-400',
  sms: 'text-yellow-400',

  /* NEW */
  email: 'text-purple-400',
  tiktok: 'text-red-400'
};

/* ---------------- PLATFORM FILTER OPTIONS ---------------- */
const PLATFORMS = [
  'all',
  'whatsapp',
  'facebook',
  'instagram',
  'sms',
  'email',
  'tiktok'
];

export default function MessageLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await messagesAPI.getLogs({
        page,
        limit: 20,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        platform:
          platformFilter !== 'all' ? platformFilter : undefined
      });

      const data = res.data?.data || [];
      setLogs(Array.isArray(data) ? data : []);
      setPages(res.data?.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, platformFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  /* ---------------- SUMMARY STATS ---------------- */
  const summary = useMemo(() => ([
    { label: 'Total', value: logs.length, color: 'text-white' },
    { label: 'Sent', value: logs.filter(l => l.status === 'sent').length, color: 'text-emerald-400' },
    { label: 'Pending', value: logs.filter(l => l.status === 'pending').length, color: 'text-yellow-400' },
    { label: 'Failed', value: logs.filter(l => l.status === 'failed').length, color: 'text-red-400' }
  ]), [logs]);

  /* ---------------- TABLE ROWS ---------------- */
  const rows = useMemo(() =>
    logs.map(l => {
      const contact = l.contact || {};

      return [
        /* CONTACT */
        <div>
          <p className="text-sm font-medium text-white">
            {contact.name || 'Unknown'}
          </p>

          {contact.company && (
            <p className="text-xs text-brand-muted">
              {contact.company}
            </p>
          )}
        </div>,

        /* PLATFORM (UPDATED SUPPORT) */
        <span
          className={`text-xs font-semibold ${
            platformColor[l.platform] || 'text-white'
          }`}
        >
          {l.platform || '—'}
        </span>,

        /* MESSAGE */
        <p className="text-sm text-brand-muted max-w-xs truncate">
          {l.content}
        </p>,

        /* STATUS */
        <StatusBadge status={l.status} />,

        /* ERROR */
        l.error ? (
          <span className="text-xs text-red-400">
            {l.error}
          </span>
        ) : (
          <span className="text-xs text-brand-muted">—</span>
        ),

        /* TIME */
        <span className="text-xs text-brand-muted">
          {l.sentAt
            ? format(new Date(l.sentAt), 'MMM d, h:mm a')
            : '—'}
        </span>
      ];
    }),
    [logs]
  );

  return (
    <>
      <Header
        title="Message Logs"
        subtitle="Track all messaging across Email, WhatsApp, TikTok & more"
      />

      <div className="p-6 space-y-4 animate-fade-in">

        {/* SUMMARY CARDS */}
        <div className="flex gap-3 flex-wrap">
          {summary.map(s => (
            <div
              key={s.label}
              className="card px-4 py-3 flex items-center gap-2"
            >
              <span className="text-sm text-brand-muted">
                {s.label}:
              </span>

              <span className={`text-lg font-bold ${s.color}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 items-center justify-between">

          {/* STATUS FILTER */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'sent', 'pending', 'failed'].map(s => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                  statusFilter === s
                    ? 'bg-primary-600 text-white'
                    : 'btn-ghost'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* PLATFORM FILTER (UPDATED) */}
          <div className="flex gap-2 items-center">

            <select
              value={platformFilter}
              onChange={e => {
                setPlatformFilter(e.target.value);
                setPage(1);
              }}
              className="input w-40 text-xs"
            >
              <option value="all">All Platforms</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="sms">SMS</option>

              {/* NEW */}
              <option value="email">Email</option>
              <option value="tiktok">TikTok</option>
            </select>

            <button
              onClick={fetchLogs}
              className="btn-secondary"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">

          <Table
            headers={[
              'Contact',
              'Platform',
              'Message',
              'Status',
              'Error',
              'Time'
            ]}
            rows={rows}
            loading={loading}
          />

          {!loading && logs.length === 0 && (
            <EmptyState
              icon={BarChart3}
              title="No message logs yet"
              description="Email, WhatsApp, SMS & TikTok messages will appear here"
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
    </>
  );
}