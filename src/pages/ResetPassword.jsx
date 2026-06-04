import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput, AuthButton } from '../components/ui/AuthInput';

function strengthInfo(pwd) {
  if (!pwd) return null;
  if (pwd.length < 6) return { label: 'Weak', pct: '30%', cls: 'bg-red-500' };
  if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) return { label: 'Strong', pct: '90%', cls: 'bg-emerald-500' };
  return { label: 'Medium', pct: '60%', cls: 'bg-amber-400' };
}

function LeftContent() {
  const { dark } = useTheme();
  return (
    <div className="space-y-7">
      <div>
        <h2 className={`text-[2.4rem] font-bold leading-[1.15] mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
          Create a stronger{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">new password.</span>
        </h2>
        <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Secure your account with a powerful password designed to protect your workspace.
        </p>
      </div>
      <div className="space-y-3">
        {['Minimum 8 characters', 'At least one uppercase letter', 'At least one number', 'Avoid reusing old passwords'].map(tip => (
          <div key={tip} className="flex items-center gap-3">
            <CheckCircle2 size={15} className={dark ? 'text-indigo-400' : 'text-indigo-500'} />
            <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{tip}</p>
          </div>
        ))}
      </div>
      <div className={`p-5 rounded-2xl border ${dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-cyan-500 mt-0.5 shrink-0" />
          <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Your new password is encrypted with AES-256 and never stored in plain text.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const strength = strengthInfo(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd !== confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000)); // replace with real API
      toast.success('Password updated successfully!');
      navigate('/login');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout leftContent={<LeftContent />}>
      <div>
        <Link to="/forgot-password" className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="mb-8">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${dark ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
            <Lock size={24} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>Reset Password</h2>
          <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Set a strong, secure new password for your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <AuthInput
              label="New Password" type={showNew ? 'text' : 'password'} placeholder="Min. 8 characters" icon={Lock}
              value={pwd} onChange={e => setPwd(e.target.value)}
              rightIcon={showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowNew(v => !v)} required
            />
            {strength && (
              <div className="mt-2">
                <div className={`h-1.5 rounded-full ${dark ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.cls}`} style={{ width: strength.pct }} />
                </div>
                <p className={`text-xs mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Strength: <span className="font-medium">{strength.label}</span></p>
              </div>
            )}
          </div>
          <div>
            <AuthInput
              label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password" icon={Lock}
              value={confirm} onChange={e => setConfirm(e.target.value)}
              rightIcon={showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowConfirm(v => !v)} required
            />
            {confirm && pwd === confirm && (
              <div className="flex items-center gap-2 text-sm text-emerald-500 mt-1.5">
                <CheckCircle2 size={14} /> Passwords match
              </div>
            )}
          </div>
          <AuthButton loading={loading} type="submit">Set New Password</AuthButton>
        </form>
      </div>
    </AuthLayout>
  );
}
