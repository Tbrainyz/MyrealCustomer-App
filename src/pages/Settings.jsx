import React, { useState } from 'react';
import { User, CreditCard, Key, Bell, Shield, Building } from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';
import { Spinner } from '../components/ui';
import toast from 'react-hot-toast';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const TABS = [{
  id: 'profile',
  label: 'Profile',
  icon: User
}, {
  id: 'business',
  label: 'Business',
  icon: Building
}, {
  id: 'payment',
  label: 'Payment',
  icon: CreditCard
}, {
  id: 'api',
  label: 'API Keys',
  icon: Key
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: Bell
}, {
  id: 'security',
  label: 'Security',
  icon: Shield
}];
function Toggle({
  on,
  onToggle
}) {
  return /*#__PURE__*/_jsx("button", {
    onClick: onToggle,
    className: `w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-primary-600' : 'bg-brand-border'}`,
    children: /*#__PURE__*/_jsx("span", {
      className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`
    })
  });
}
function ProfileTab() {
  const {
    user,
    updateUser
  } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [loading, setLoading] = useState(false);
  const save = async () => {
    setLoading(true);
    try {
      const r = await authAPI.updateProfile(form);
      updateUser(r.data.data);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-5 max-w-lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-4 mb-2",
      children: [/*#__PURE__*/_jsx("div", {
        className: "w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold",
        children: user?.name?.[0]?.toUpperCase()
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "font-semibold text-white",
          children: user?.name
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm text-brand-muted capitalize",
          children: user?.role
        })]
      })]
    }), [{
      k: 'name',
      l: 'Full Name',
      t: 'text'
    }, {
      k: 'email',
      l: 'Email Address',
      t: 'email'
    }].map(f => /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("label", {
        className: "label",
        children: f.l
      }), /*#__PURE__*/_jsx("input", {
        type: f.t,
        value: form[f.k],
        onChange: e => setForm(x => ({
          ...x,
          [f.k]: e.target.value
        })),
        className: "input"
      })]
    }, f.k)), /*#__PURE__*/_jsx("button", {
      onClick: save,
      disabled: loading,
      className: "btn-primary",
      children: loading ? /*#__PURE__*/_jsx(Spinner, {
        size: 14
      }) : 'Save Changes'
    })]
  });
}
function BusinessTab() {
  const {
    user,
    updateUser
  } = useAuth();
  const [form, setForm] = useState({
    businessName: user?.settings?.businessName || '',
    address: user?.settings?.businessAddress || '',
    phone: user?.settings?.businessPhone || '',
    website: user?.settings?.website || '',
    currency: user?.settings?.currency || 'NGN',
    timezone: user?.settings?.timezone || 'Africa/Lagos'
  });
  const [loading, setLoading] = useState(false);
  const save = async () => {
    setLoading(true);
    try {
      const r = await authAPI.updateProfile({
        settings: {
          businessName: form.businessName,
          businessAddress: form.address,
          businessPhone: form.phone,
          website: form.website,
          currency: form.currency,
          timezone: form.timezone
        }
      });
      updateUser(r.data.data);
      toast.success('Business info saved');
    } catch {
      toast.error('Failed to save business info');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-4 max-w-lg",
    children: [[{
      k: 'businessName',
      l: 'Business Name',
      p: 'Your Business Ltd'
    }, {
      k: 'address',
      l: 'Address',
      p: 'Lagos, Nigeria'
    }, {
      k: 'phone',
      l: 'Business Phone',
      p: '+234...'
    }, {
      k: 'website',
      l: 'Website',
      p: 'https://...'
    }].map(f => /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("label", {
        className: "label",
        children: f.l
      }), /*#__PURE__*/_jsx("input", {
        value: form[f.k],
        onChange: e => setForm(x => ({
          ...x,
          [f.k]: e.target.value
        })),
        placeholder: f.p,
        className: "input"
      })]
    }, f.k)), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("label", {
        className: "label",
        children: "Currency"
      }), /*#__PURE__*/_jsxs("select", {
        value: form.currency,
        onChange: e => setForm(f => ({
          ...f,
          currency: e.target.value
        })),
        className: "input",
        children: [/*#__PURE__*/_jsx("option", {
          value: "NGN",
          children: "NGN \u2014 Nigerian Naira"
        }), /*#__PURE__*/_jsx("option", {
          value: "USD",
          children: "USD \u2014 US Dollar"
        }), /*#__PURE__*/_jsx("option", {
          value: "GBP",
          children: "GBP \u2014 British Pound"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("label", {
        className: "label",
        children: "Timezone"
      }), /*#__PURE__*/_jsxs("select", {
        value: form.timezone,
        onChange: e => setForm(f => ({
          ...f,
          timezone: e.target.value
        })),
        className: "input",
        children: [/*#__PURE__*/_jsx("option", {
          value: "Africa/Lagos",
          children: "Africa/Lagos (WAT)"
        }), /*#__PURE__*/_jsx("option", {
          value: "UTC",
          children: "UTC"
        }), /*#__PURE__*/_jsx("option", {
          value: "Europe/London",
          children: "Europe/London"
        })]
      })]
    }), /*#__PURE__*/_jsx("button", {
      onClick: save,
      disabled: loading,
      className: "btn-primary",
      children: loading ? /*#__PURE__*/_jsx(Spinner, {
        size: 14
      }) : 'Save Business Info'
    })]
  });
}
function PaymentTab() {
  const {
    user,
    updateUser
  } = useAuth();
  const userRecord = user;
  const [bank, setBank] = useState({
    bankName: userRecord?.bankDetails?.bankName || '',
    accountName: userRecord?.bankDetails?.accountName || '',
    accountNumber: userRecord?.bankDetails?.accountNumber || '',
    sortCode: userRecord?.bankDetails?.sortCode || ''
  });
  const [paystackKey, setPaystackKey] = useState('');
  const [loadingBank, setLoadingBank] = useState(false);
  const [loadingPaystack, setLoadingPaystack] = useState(false);
  const saveBankDetails = async () => {
    setLoadingBank(true);
    try {
      const r = await authAPI.updateProfile({
        bankDetails: bank
      });
      updateUser(r.data.data);
      toast.success('Bank details saved');
    } catch {
      toast.error('Failed to save bank details');
    } finally {
      setLoadingBank(false);
    }
  };
  const savePaystackKey = async () => {
    if (!paystackKey.startsWith('sk_')) {
      return toast.error('Invalid Paystack key — must start with sk_live_ or sk_test_');
    }
    setLoadingPaystack(true);
    try {
      await authAPI.updateApiKeys({
        paystackKey
      });
      toast.success('Paystack key saved');
      setPaystackKey('');
    } catch {
      toast.error('Failed to save Paystack key');
    } finally {
      setLoadingPaystack(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-8 max-w-lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "section-title",
        children: "Bank Transfer Details"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm text-brand-muted",
        children: "These details will be shown to customers for manual bank transfers."
      }), [{
        k: 'bankName',
        l: 'Bank Name',
        p: 'First Bank, GTBank…'
      }, {
        k: 'accountName',
        l: 'Account Name',
        p: 'Your Business Name'
      }, {
        k: 'accountNumber',
        l: 'Account Number',
        p: '0000000000'
      }, {
        k: 'sortCode',
        l: 'Sort Code (optional)',
        p: ''
      }].map(f => /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: f.l
        }), /*#__PURE__*/_jsx("input", {
          value: bank[f.k],
          onChange: e => setBank(x => ({
            ...x,
            [f.k]: e.target.value
          })),
          placeholder: f.p,
          className: "input"
        })]
      }, f.k)), /*#__PURE__*/_jsx("button", {
        onClick: saveBankDetails,
        disabled: loadingBank,
        className: "btn-primary",
        children: loadingBank ? /*#__PURE__*/_jsx(Spinner, {
          size: 14
        }) : 'Save Bank Details'
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "border-t border-brand-border pt-6 space-y-4",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "section-title",
        children: "Paystack Integration"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-sm text-brand-muted",
        children: "Enter your Paystack secret key to enable card and USSD payments."
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Paystack Secret Key"
        }), /*#__PURE__*/_jsx("input", {
          type: "password",
          value: paystackKey,
          onChange: e => setPaystackKey(e.target.value),
          placeholder: "sk_live_\u2026 or sk_test_\u2026",
          className: "input font-mono text-sm"
        }), /*#__PURE__*/_jsxs("p", {
          className: "text-xs text-brand-muted mt-1",
          children: ["Get your key from", ' ', /*#__PURE__*/_jsx("a", {
            href: "https://dashboard.paystack.com",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary-400 hover:underline",
            children: "dashboard.paystack.com"
          })]
        })]
      }), /*#__PURE__*/_jsx("button", {
        onClick: savePaystackKey,
        disabled: loadingPaystack,
        className: "btn-primary",
        children: loadingPaystack ? /*#__PURE__*/_jsx(Spinner, {
          size: 14
        }) : 'Save Paystack Key'
      }), /*#__PURE__*/_jsxs("div", {
        className: "bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4",
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm text-emerald-400 font-medium",
          children: "\u2713 Paystack Ready"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-brand-muted mt-1",
          children: "Customers can pay via card, bank transfer, USSD, and more."
        })]
      })]
    })]
  });
}
function ApiKeysTab() {
  const {
    user
  } = useAuth();
  const userRecord = user;
  const [keys, setKeys] = useState({
    whatsappToken: '',
    whatsappPhoneId: userRecord?.apiKeys?.whatsappPhoneId || '',
    facebookToken: '',
    facebookPageId: userRecord?.apiKeys?.facebookPageId || '',
    instagramToken: ''
  });
  const [loading, setLoading] = useState(false);
  const set = k => e => setKeys(x => ({
    ...x,
    [k]: e.target.value
  }));
  const save = async () => {
    setLoading(true);
    try {
      // Only send fields that have values (don't overwrite with empty strings)
      const payload = {};
      if (keys.whatsappToken) payload.whatsappToken = keys.whatsappToken;
      if (keys.whatsappPhoneId) payload.whatsappPhoneId = keys.whatsappPhoneId;
      if (keys.facebookToken) payload.facebookToken = keys.facebookToken;
      if (keys.facebookPageId) payload.facebookPageId = keys.facebookPageId;
      if (keys.instagramToken) payload.instagramToken = keys.instagramToken;
      await authAPI.updateApiKeys(payload);
      toast.success('API keys saved');
      // Clear sensitive token fields after save
      setKeys(k => ({
        ...k,
        whatsappToken: '',
        facebookToken: '',
        instagramToken: ''
      }));
    } catch {
      toast.error('Failed to save API keys');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6 max-w-lg",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "space-y-3",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "section-title",
        children: "WhatsApp Business API"
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Access Token"
        }), /*#__PURE__*/_jsx("input", {
          type: "password",
          value: keys.whatsappToken,
          onChange: set('whatsappToken'),
          placeholder: "EAABs\u2026 (leave blank to keep existing)",
          className: "input font-mono text-sm"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Phone Number ID"
        }), /*#__PURE__*/_jsx("input", {
          value: keys.whatsappPhoneId,
          onChange: set('whatsappPhoneId'),
          placeholder: "1234567890",
          className: "input font-mono text-sm"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "border-t border-brand-border pt-5 space-y-3",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "section-title",
        children: "Facebook Messenger API"
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Page Access Token"
        }), /*#__PURE__*/_jsx("input", {
          type: "password",
          value: keys.facebookToken,
          onChange: set('facebookToken'),
          placeholder: "EAABs\u2026 (leave blank to keep existing)",
          className: "input font-mono text-sm"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Page ID"
        }), /*#__PURE__*/_jsx("input", {
          value: keys.facebookPageId,
          onChange: set('facebookPageId'),
          placeholder: "123456789",
          className: "input font-mono text-sm"
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "border-t border-brand-border pt-5 space-y-3",
      children: [/*#__PURE__*/_jsx("h3", {
        className: "section-title",
        children: "Instagram API"
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          className: "label",
          children: "Instagram Access Token"
        }), /*#__PURE__*/_jsx("input", {
          type: "password",
          value: keys.instagramToken,
          onChange: set('instagramToken'),
          placeholder: "IGQ\u2026 (leave blank to keep existing)",
          className: "input font-mono text-sm"
        })]
      })]
    }), /*#__PURE__*/_jsx("button", {
      onClick: save,
      disabled: loading,
      className: "btn-primary",
      children: loading ? /*#__PURE__*/_jsx(Spinner, {
        size: 14
      }) : 'Save API Keys'
    }), /*#__PURE__*/_jsx("div", {
      className: "bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-sm text-yellow-400",
      children: "\u26A0\uFE0F Keep your API keys secret. Token fields are write-only \u2014 leave them blank to keep existing values unchanged."
    })]
  });
}
function NotificationsTab() {
  const {
    user,
    updateUser
  } = useAuth();
  const userRecord = user;
  const [prefs, setPrefs] = useState({
    emailOnFail: userRecord?.notificationPrefs?.emailOnFail ?? true,
    emailOnSuccess: userRecord?.notificationPrefs?.emailOnSuccess ?? false,
    browserAlerts: userRecord?.notificationPrefs?.browserAlerts ?? true,
    dailySummary: userRecord?.notificationPrefs?.dailySummary ?? true
  });
  const [loading, setLoading] = useState(false);
  const save = async () => {
    setLoading(true);
    try {
      const r = await authAPI.updateProfile({
        notificationPrefs: prefs
      });
      updateUser(r.data.data);
      toast.success('Notification preferences saved');
    } catch {
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-4 max-w-lg",
    children: [[{
      k: 'emailOnFail',
      l: 'Email on message failure',
      d: 'Get notified when a message fails to deliver'
    }, {
      k: 'emailOnSuccess',
      l: 'Email on bulk send',
      d: 'Get a confirmation when bulk send completes'
    }, {
      k: 'browserAlerts',
      l: 'Browser notifications',
      d: 'Show notifications in your browser'
    }, {
      k: 'dailySummary',
      l: 'Daily summary email',
      d: 'Receive a daily report of messaging activity'
    }].map(item => /*#__PURE__*/_jsxs("div", {
      className: "card p-4 flex items-center justify-between",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm text-white font-medium",
          children: item.l
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-brand-muted",
          children: item.d
        })]
      }), /*#__PURE__*/_jsx(Toggle, {
        on: prefs[item.k],
        onToggle: () => setPrefs(p => ({
          ...p,
          [item.k]: !p[item.k]
        }))
      })]
    }, item.k)), /*#__PURE__*/_jsx("button", {
      onClick: save,
      disabled: loading,
      className: "btn-primary",
      children: loading ? /*#__PURE__*/_jsx(Spinner, {
        size: 14
      }) : 'Save Preferences'
    })]
  });
}
function SecurityTab() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const change = async () => {
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      toast.success('Password changed!');
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-4 max-w-md",
    children: [/*#__PURE__*/_jsx("h3", {
      className: "section-title",
      children: "Change Password"
    }), [{
      k: 'currentPassword',
      l: 'Current Password'
    }, {
      k: 'newPassword',
      l: 'New Password'
    }, {
      k: 'confirmPassword',
      l: 'Confirm New Password'
    }].map(f => /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("label", {
        className: "label",
        children: f.l
      }), /*#__PURE__*/_jsx("input", {
        type: "password",
        value: form[f.k],
        onChange: e => setForm(x => ({
          ...x,
          [f.k]: e.target.value
        })),
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        className: "input"
      })]
    }, f.k)), /*#__PURE__*/_jsx("button", {
      onClick: change,
      disabled: loading,
      className: "btn-primary",
      children: loading ? /*#__PURE__*/_jsx(Spinner, {
        size: 14
      }) : 'Change Password'
    })]
  });
}
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabContent = {
    profile: /*#__PURE__*/_jsx(ProfileTab, {}),
    business: /*#__PURE__*/_jsx(BusinessTab, {}),
    payment: /*#__PURE__*/_jsx(PaymentTab, {}),
    api: /*#__PURE__*/_jsx(ApiKeysTab, {}),
    notifications: /*#__PURE__*/_jsx(NotificationsTab, {}),
    security: /*#__PURE__*/_jsx(SecurityTab, {})
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Settings",
      subtitle: "Manage your account and integrations"
    }), /*#__PURE__*/_jsx("div", {
      className: "p-6 animate-fade-in",
      children: /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col lg:flex-row gap-6",
        children: [/*#__PURE__*/_jsx("nav", {
          className: "lg:w-48 flex-shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto",
          children: TABS.map(tab => /*#__PURE__*/_jsxs("button", {
            onClick: () => setActiveTab(tab.id),
            className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' : 'text-brand-muted hover:text-white hover:bg-brand-border'}`,
            children: [/*#__PURE__*/_jsx(tab.icon, {
              size: 15
            }), tab.label]
          }, tab.id))
        }), /*#__PURE__*/_jsx("div", {
          className: "flex-1 card p-6 min-h-96",
          children: tabContent[activeTab]
        })]
      })
    })]
  });
}
