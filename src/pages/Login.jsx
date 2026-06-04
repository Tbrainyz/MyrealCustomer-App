import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  Info, Crown, Package, Wallet, MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput, AuthButton } from '../components/ui/AuthInput';

// ── Role info shown on the left panel ────────────────────────────────────────
const ROLE_CARDS = [
  {
    icon:  Crown,
    label: 'Administrator',
    desc:  'Full access — manages team, billing, API keys and all sections.',
    cls:   'bg-primary-500/15 text-primary-500',
  },
  {
    icon:  Package,
    label: 'Inventory Manager',
    desc:  'Access to Products and Stock Movements only.',
    cls:   'bg-cyan-500/15 text-cyan-500',
  },
  {
    icon:  Wallet,
    label: 'Finance Manager',
    desc:  'Access to Invoices, Expenses and Cash Flow only.',
    cls:   'bg-emerald-500/15 text-emerald-500',
  },
  {
    icon:  MessageSquare,
    label: 'Messaging Manager',
    desc:  'Access to Contacts, Messaging and Templates only.',
    cls:   'bg-violet-500/15 text-violet-500',
  },
];

function LeftContent() {
  const { dark } = useTheme();
  return (
    <div className="space-y-7">
      <div>
        <h2 className={`text-[2.4rem] font-bold leading-[1.15] mb-3 ${dark ? 'text-white' : 'text-slate-900'}`}>
          One platform,{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            every role.
          </span>
        </h2>
        <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          All team members — admins and staff — sign in here using the same login page.
        </p>
      </div>

      {/* Role cards */}
      <div className="space-y-2.5">
        {ROLE_CARDS.map(({ icon: Icon, label, desc, cls }) => (
          <div
            key={label}
            className={`flex items-start gap-3 p-3.5 rounded-2xl border
              ${dark ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white/80 border-slate-100 shadow-sm'}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
              <Icon size={15} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>{label}</p>
              <p className={`text-xs mt-0.5 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Staff notice */}
      <div className={`flex items-start gap-3 p-4 rounded-2xl border
        ${dark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200'}`}>
        <Info size={15} className={`mt-0.5 shrink-0 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <p className={`text-xs leading-relaxed ${dark ? 'text-indigo-300' : 'text-indigo-700'}`}>
          <strong>New staff member?</strong> Your administrator sent your login credentials (email + temporary password) to your email inbox. Use those to sign in, then change your password in Settings.
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  const { dark }  = useTheme();
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.error('Email and password are required');
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout leftContent={<LeftContent />}>
      <div>
        {/* Heading */}
        <div className="mb-7">
          <h2 className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
            Sign In
          </h2>
          <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Admins and staff all sign in from this page.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            icon={Mail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <AuthInput
            label="Password"
            rightLabel={
              <Link
                to="/forgot-password"
                className={`text-xs font-medium transition-colors
                  ${dark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
              >
                Forgot password?
              </Link>
            }
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={e => setPassword(e.target.value)}
            rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onRightIconClick={() => setShowPassword(v => !v)}
            required
          />

          <label className={`flex items-center gap-2.5 text-sm cursor-pointer select-none pt-1
            ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            <input type="checkbox" className="w-4 h-4 rounded accent-indigo-500" />
            Remember me for 30 days
          </label>

          <AuthButton loading={loading} type="submit">
            <span className="flex items-center justify-center gap-2">
              Sign In <ArrowRight size={16} />
            </span>
          </AuthButton>
        </form>

        {/* Staff hint (mobile — left panel not visible) */}
        <div className={`lg:hidden mt-5 flex items-start gap-2.5 p-3.5 rounded-2xl border text-xs
          ${dark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>
            <strong>Staff member?</strong> Check your email for login credentials sent by your admin.
          </span>
        </div>

        {/* Register link */}
        <p className={`text-center text-sm mt-7 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          New workspace?{' '}
          <Link
            to="/register"
            className={`font-semibold transition-colors
              ${dark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
          >
            Create an admin account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
