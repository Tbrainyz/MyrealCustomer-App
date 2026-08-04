import { useState, useEffect } from 'react';
import { senderIdAPI } from '../api';
import toast from 'react-hot-toast';
import { CheckCircle2, Clock, XCircle, Sparkles } from 'lucide-react';

const STATUS_CONFIG = {
  not_submitted: { label: 'Not submitted',  icon: null,          cls: 'text-brand-muted' },
  pending:       { label: 'Pending approval (24-48hrs)', icon: Clock,       cls: 'text-yellow-500' },
  approved:      { label: 'Approved ✓',     icon: CheckCircle2,  cls: 'text-emerald-500' },
  rejected:      { label: 'Rejected',       icon: XCircle,       cls: 'text-red-500' },
};

export default function SenderIdRegistration({ businessName }) {
  const [senderId, setSenderId]         = useState('');
  const [organisation, setOrganisation] = useState(businessName || '');
  const [regno, setRegno]               = useState('');
  const [address, setAddress]           = useState('');
  const [status, setStatus]             = useState('not_submitted');
  const [submittedAt, setSubmittedAt]   = useState(null);
  const [loading, setLoading]           = useState(false);
  const [suggesting, setSuggesting]     = useState(false);

  // Load current status on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await senderIdAPI.status();
        const d = res.data.data;
        if (d.senderId)    setSenderId(d.senderId);
        if (d.status)      setStatus(d.status);
        if (d.submittedAt) setSubmittedAt(d.submittedAt);
      } catch { /* silent */ }
    })();
  }, []);

  const handleSuggest = async () => {
    setSuggesting(true);
    try {
      const res = await senderIdAPI.suggest();
      setSenderId(res.data.data.suggested);
      toast.success(`Suggested: ${res.data.data.suggested}`);
    } catch {
      toast.error('Could not generate suggestion');
    } finally {
      setSuggesting(false);
    }
  };

  const handleSubmit = async () => {
    if (!senderId.trim())     return toast.error('Enter a Sender ID');
    if (!organisation.trim()) return toast.error('Enter your company/organisation name');
    if (!regno.trim())        return toast.error('Enter your CAC registration number');
    if (!address.trim())      return toast.error('Enter your business address');

    setLoading(true);
    try {
      const res = await senderIdAPI.submit({ senderId, organisation, regno, address });
      toast.success(res.data.message || 'Sender ID submitted for approval');
      setStatus('pending');
      setSubmittedAt(new Date().toISOString());
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_submitted;
  const Icon = cfg.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Sender ID Registration</h4>
        <span className={`flex items-center gap-1.5 text-xs font-medium ${cfg.cls}`}>
          {Icon && <Icon size={13} />}
          {cfg.label}
        </span>
      </div>

      <p className="text-xs text-brand-muted">
        Your Sender ID is the name customers see instead of a phone number (e.g. "APEXGLO").
        Must be 3-11 characters, letters and numbers only. Requires approval from SmartSMS (~24-48hrs).
      </p>

      <div>
        <label className="label flex items-center justify-between">
          Sender ID
          <button
            type="button"
            onClick={handleSuggest}
            disabled={suggesting}
            className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 font-medium"
          >
            <Sparkles size={11} /> {suggesting ? 'Generating...' : 'Auto-suggest'}
          </button>
        </label>
        <input
          value={senderId}
          onChange={e => setSenderId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11))}
          placeholder="e.g. MYBRAND"
          className="input font-mono text-sm"
          maxLength={11}
        />
        <p className="text-xs text-brand-muted mt-1">{senderId.length}/11 characters</p>
      </div>

      <Field label="Company / Organisation Name" value={organisation} onChange={setOrganisation} placeholder="e.g. Apex Global Ltd" />
      <Field label="CAC Registration Number"     value={regno}        onChange={setRegno}        placeholder="e.g. RC1234567" />
      <Field label="Business Address"            value={address}      onChange={setAddress}      placeholder="Full registered business address" />

      <button
        onClick={handleSubmit}
        disabled={loading || status === 'pending' || status === 'approved'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? 'Submitting...'
          : status === 'pending'
            ? 'Submitted — awaiting approval'
            : status === 'approved'
              ? 'Already approved'
              : 'Submit for Approval'}
      </button>

      {submittedAt && (
        <p className="text-xs text-brand-muted">
          Submitted: {new Date(submittedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input text-sm"
      />
    </div>
  );
}
