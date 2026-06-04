import { useState, useRef } from 'react';
import { User, CreditCard, Key, Bell, Shield, Building, Camera, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../api';
import { Spinner } from '../components/ui';
import toast from 'react-hot-toast';

// All tabs definition — some are admin-only
const ALL_TABS = [
  { id: 'profile',       label: 'Profile',       icon: User,       adminOnly: false },
  { id: 'business',      label: 'Business',       icon: Building,   adminOnly: true  },
  { id: 'payment',       label: 'Payment',        icon: CreditCard, adminOnly: true  },
  { id: 'api',           label: 'API Keys',       icon: Key,        adminOnly: true  },
  { id: 'notifications', label: 'Notifications',  icon: Bell,       adminOnly: false },
  { id: 'security',      label: 'Security',       icon: Shield,     adminOnly: false },
];

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-primary-600' : 'bg-slate-300 dark:bg-brand-border'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ loading, label = 'Save Changes', onClick }) {
  return (
    <button onClick={onClick} disabled={loading} className="btn-primary">
      {loading ? <Spinner size={14} /> : label}
    </button>
  );
}

function ProfileTab() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      const r = await authAPI.updateProfile(form);
      updateUser(r.data.data);
      toast.success('Profile updated');
    } catch { toast.error('Failed to update profile'); }
    finally { setLoading(false); }
  };

  const [preview, setPreview] = useState(user?.avatar || null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be under 5 MB');
    if (!file.type.startsWith('image/')) return toast.error('Please select an image file');
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const r = await authAPI.updateAvatar(formData);
      updateUser(r.data.data);
      toast.success('Profile photo updated');
    } catch {
      toast.error('Upload failed — photo saved locally for now');
    } finally { setUploading(false); }
  };

  const removePhoto = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-5 max-w-lg">
      {/* Avatar upload */}
      <div className="flex items-center gap-5 mb-2">
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/20">
            {preview
              ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
              : <span>{user?.name?.[0]?.toUpperCase()}</span>
            }
          </div>
          {uploading && (
            <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center">
              <Spinner size={20} />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl flex items-center justify-center border-2 shadow transition-all
              bg-white dark:bg-[#161628] border-white dark:border-white/10 text-slate-500 dark:text-slate-300
              hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400"
            title="Change photo"
          >
            <Camera size={13} />
          </button>
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{user?.name}</p>
          <p className="text-sm text-brand-muted capitalize mb-3">{user?.role}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300
                hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <Camera size={12} /> Upload photo
            </button>
            {preview && (
              <button
                type="button"
                onClick={removePhoto}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                  border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500
                  hover:border-red-400 hover:text-red-500"
              >
                <Trash2 size={12} /> Remove
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-brand-muted -mt-2">JPG, PNG or WebP. Max 5 MB.</p>
      {[{ k: 'name', l: 'Full Name', t: 'text' }, { k: 'email', l: 'Email Address', t: 'email' }].map(f => (
        <Field key={f.k} label={f.l}>
          <input type={f.t} value={form[f.k]} onChange={e => setForm(x => ({ ...x, [f.k]: e.target.value }))} className="input" />
        </Field>
      ))}
      <SaveBtn loading={loading} onClick={save} />
    </div>
  );
}

function BusinessTab() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    businessName: user?.settings?.businessName || '',
    address: user?.settings?.businessAddress || '',
    phone: user?.settings?.businessPhone || '',
    website: user?.settings?.website || '',
    currency: user?.settings?.currency || 'NGN',
    timezone: user?.settings?.timezone || 'Africa/Lagos',
  });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      const r = await authAPI.updateProfile({ settings: { businessName: form.businessName, businessAddress: form.address, businessPhone: form.phone, website: form.website, currency: form.currency, timezone: form.timezone } });
      updateUser(r.data.data);
      toast.success('Business info saved');
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4 max-w-lg">
      {[{ k: 'businessName', l: 'Business Name', p: 'Your Business Ltd' }, { k: 'address', l: 'Address', p: 'Lagos, Nigeria' }, { k: 'phone', l: 'Business Phone', p: '+234...' }, { k: 'website', l: 'Website', p: 'https://...' }].map(f => (
        <Field key={f.k} label={f.l}>
          <input value={form[f.k]} onChange={e => setForm(x => ({ ...x, [f.k]: e.target.value }))} placeholder={f.p} className="input" />
        </Field>
      ))}
      <Field label="Currency">
        <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className="input">
          <option value="NGN">NGN — Nigerian Naira</option>
          <option value="USD">USD — US Dollar</option>
          <option value="GBP">GBP — British Pound</option>
        </select>
      </Field>
      <Field label="Timezone">
        <select value={form.timezone} onChange={e => setForm(f => ({ ...f, timezone: e.target.value }))} className="input">
          <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
          <option value="UTC">UTC</option>
          <option value="Europe/London">Europe/London</option>
        </select>
      </Field>
      <SaveBtn loading={loading} label="Save Business Info" onClick={save} />
    </div>
  );
}

function PaymentTab() {
  const { user, updateUser } = useAuth();
  const [bank, setBank] = useState({
    bankName: user?.bankDetails?.bankName || '',
    accountName: user?.bankDetails?.accountName || '',
    accountNumber: user?.bankDetails?.accountNumber || '',
    sortCode: user?.bankDetails?.sortCode || '',
  });
  const [paystackKey, setPaystackKey] = useState('');
  const [loadingBank, setLoadingBank] = useState(false);
  const [loadingPaystack, setLoadingPaystack] = useState(false);

  const saveBank = async () => {
    setLoadingBank(true);
    try { const r = await authAPI.updateProfile({ bankDetails: bank }); updateUser(r.data.data); toast.success('Bank details saved'); }
    catch { toast.error('Failed to save bank details'); }
    finally { setLoadingBank(false); }
  };

  const savePaystack = async () => {
    if (!paystackKey.startsWith('sk_')) return toast.error('Invalid key — must start with sk_live_ or sk_test_');
    setLoadingPaystack(true);
    try { await authAPI.updateApiKeys({ paystackKey }); toast.success('Paystack key saved'); setPaystackKey(''); }
    catch { toast.error('Failed to save key'); }
    finally { setLoadingPaystack(false); }
  };

  return (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <h3 className="section-title">Bank Transfer Details</h3>
        <p className="text-sm text-brand-muted">These details appear on invoices for manual bank transfers.</p>
        {[{ k: 'bankName', l: 'Bank Name', p: 'First Bank, GTBank…' }, { k: 'accountName', l: 'Account Name', p: 'Your Business Name' }, { k: 'accountNumber', l: 'Account Number', p: '0000000000' }, { k: 'sortCode', l: 'Sort Code (optional)', p: '' }].map(f => (
          <Field key={f.k} label={f.l}>
            <input value={bank[f.k]} onChange={e => setBank(x => ({ ...x, [f.k]: e.target.value }))} placeholder={f.p} className="input" />
          </Field>
        ))}
        <SaveBtn loading={loadingBank} label="Save Bank Details" onClick={saveBank} />
      </div>
      <div className="border-t border-slate-200 dark:border-brand-border pt-6 space-y-4">
        <h3 className="section-title">Paystack Integration</h3>
        <p className="text-sm text-brand-muted">Enter your Paystack secret key to enable card and USSD payments.</p>
        <Field label="Paystack Secret Key">
          <input type="password" value={paystackKey} onChange={e => setPaystackKey(e.target.value)} placeholder="sk_live_… or sk_test_…" className="input font-mono text-sm" />
          <p className="text-xs text-brand-muted mt-1">Get your key from <a href="https://dashboard.paystack.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">dashboard.paystack.com</a></p>
        </Field>
        <SaveBtn loading={loadingPaystack} label="Save Paystack Key" onClick={savePaystack} />
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <p className="text-sm text-emerald-500 font-medium">✓ Paystack Ready</p>
          <p className="text-xs text-brand-muted mt-1">Customers can pay via card, bank transfer, USSD, and more.</p>
        </div>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const { user } = useAuth();
  const [keys, setKeys] = useState({
    whatsappToken: '', whatsappPhoneId: user?.apiKeys?.whatsappPhoneId || '',
    facebookToken: '', facebookPageId: user?.apiKeys?.facebookPageId || '',
    instagramToken: '',
  });
  const [loading, setLoading] = useState(false);
  const set = k => e => setKeys(x => ({ ...x, [k]: e.target.value }));

  const save = async () => {
    setLoading(true);
    try {
      const payload = {};
      if (keys.whatsappToken)  payload.whatsappToken  = keys.whatsappToken;
      if (keys.whatsappPhoneId) payload.whatsappPhoneId = keys.whatsappPhoneId;
      if (keys.facebookToken)  payload.facebookToken  = keys.facebookToken;
      if (keys.facebookPageId) payload.facebookPageId = keys.facebookPageId;
      if (keys.instagramToken) payload.instagramToken = keys.instagramToken;
      await authAPI.updateApiKeys(payload);
      toast.success('API keys saved');
      setKeys(k => ({ ...k, whatsappToken: '', facebookToken: '', instagramToken: '' }));
    } catch { toast.error('Failed to save API keys'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div className="space-y-3">
        <h3 className="section-title">WhatsApp Business API</h3>
        <Field label="Access Token"><input type="password" value={keys.whatsappToken} onChange={set('whatsappToken')} placeholder="EAABs… (leave blank to keep existing)" className="input font-mono text-sm" /></Field>
        <Field label="Phone Number ID"><input value={keys.whatsappPhoneId} onChange={set('whatsappPhoneId')} placeholder="1234567890" className="input font-mono text-sm" /></Field>
      </div>
      <div className="border-t border-slate-200 dark:border-brand-border pt-5 space-y-3">
        <h3 className="section-title">Facebook Messenger API</h3>
        <Field label="Page Access Token"><input type="password" value={keys.facebookToken} onChange={set('facebookToken')} placeholder="EAABs… (leave blank to keep existing)" className="input font-mono text-sm" /></Field>
        <Field label="Page ID"><input value={keys.facebookPageId} onChange={set('facebookPageId')} placeholder="123456789" className="input font-mono text-sm" /></Field>
      </div>
      <div className="border-t border-slate-200 dark:border-brand-border pt-5 space-y-3">
        <h3 className="section-title">Instagram API</h3>
        <Field label="Instagram Access Token"><input type="password" value={keys.instagramToken} onChange={set('instagramToken')} placeholder="IGQ… (leave blank to keep existing)" className="input font-mono text-sm" /></Field>
      </div>
      <SaveBtn loading={loading} label="Save API Keys" onClick={save} />
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-600 dark:text-yellow-400">
        ⚠️ Keep your API keys secret. Token fields are write-only — leave blank to keep existing values.
      </div>
    </div>
  );
}

function NotificationsTab() {
  const { user, updateUser } = useAuth();
  const [prefs, setPrefs] = useState({
    emailOnFail:     user?.notificationPrefs?.emailOnFail     ?? true,
    emailOnSuccess:  user?.notificationPrefs?.emailOnSuccess  ?? false,
    browserAlerts:   user?.notificationPrefs?.browserAlerts   ?? true,
    dailySummary:    user?.notificationPrefs?.dailySummary    ?? true,
  });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try { const r = await authAPI.updateProfile({ notificationPrefs: prefs }); updateUser(r.data.data); toast.success('Preferences saved'); }
    catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const items = [
    { k: 'emailOnFail',    l: 'Email on message failure',  d: 'Get notified when a message fails to deliver' },
    { k: 'emailOnSuccess', l: 'Email on bulk send',        d: 'Get a confirmation when bulk send completes'  },
    { k: 'browserAlerts',  l: 'Browser notifications',     d: 'Show notifications in your browser'          },
    { k: 'dailySummary',   l: 'Daily summary email',       d: 'Receive a daily report of messaging activity' },
  ];

  return (
    <div className="space-y-4 max-w-lg">
      {items.map(item => (
        <div key={item.k} className="card p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{item.l}</p>
            <p className="text-xs text-brand-muted">{item.d}</p>
          </div>
          <Toggle on={prefs[item.k]} onToggle={() => setPrefs(p => ({ ...p, [item.k]: !p[item.k] }))} />
        </div>
      ))}
      <SaveBtn loading={loading} label="Save Preferences" onClick={save} />
    </div>
  );
}

function SecurityTab() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const change = async () => {
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success('Password changed!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed to change password'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4 max-w-md">
      <h3 className="section-title">Change Password</h3>
      {[{ k: 'currentPassword', l: 'Current Password' }, { k: 'newPassword', l: 'New Password' }, { k: 'confirmPassword', l: 'Confirm New Password' }].map(f => (
        <Field key={f.k} label={f.l}>
          <input type="password" value={form[f.k]} onChange={e => setForm(x => ({ ...x, [f.k]: e.target.value }))} placeholder="••••••••" className="input" />
        </Field>
      ))}
      <SaveBtn loading={loading} label="Change Password" onClick={change} />
    </div>
  );
}

export default function Settings() {
  const { dark } = useTheme();
  const { isAdmin } = useAuth();
  const TABS = ALL_TABS.filter(t => !t.adminOnly || isAdmin);
  const [activeTab, setActiveTab] = useState('profile');
  const tabContent = { profile: <ProfileTab />, business: <BusinessTab />, payment: <PaymentTab />, api: <ApiKeysTab />, notifications: <NotificationsTab />, security: <SecurityTab /> };

  return (
    <>
      <Header title="Settings" subtitle="Manage your account and integrations" />
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="lg:w-48 flex-shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-primary-600/20 text-primary-500 dark:text-primary-400 border border-primary-500/30'
                    : dark
                      ? 'text-brand-muted hover:text-white hover:bg-brand-border'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                <tab.icon size={15} />{tab.label}
              </button>
            ))}
          </nav>
          <div className="flex-1 card p-6 min-h-96">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </>
  );
}
