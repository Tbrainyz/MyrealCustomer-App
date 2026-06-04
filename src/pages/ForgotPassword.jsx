import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../api';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput, AuthButton } from '../components/ui/AuthInput';

function LeftContent() {
  const { dark } = useTheme();
  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-[2.4rem] font-bold leading-[1.15] mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
          Recover access to your{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">workspace.</span>
        </h2>
        <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Enter your registered email and we'll send you a secure reset link instantly.
        </p>
      </div>
      <div className={`p-5 rounded-2xl border ${dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${dark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
            <ShieldCheck size={22} className="text-cyan-500" />
          </div>
          <div>
            <h3 className={`font-semibold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Bank-Level Protection</h3>
            <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Your account recovery is protected with advanced encryption and identity verification.</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {['Email delivered in seconds', 'Link expires after 15 minutes', 'One-time use for safety'].map(t => (
          <div key={t} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-indigo-400' : 'bg-indigo-500'}`} />
            <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  const { dark } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Email is required');
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200)); // replace with authAPI.forgotPassword(email)
      toast.success('Reset link sent to your email');
      setEmail('');
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout leftContent={<LeftContent />}>
      <div>
        <Link to="/login" className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
        <div className="mb-8">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${dark ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
            <Mail size={24} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>Forgot Password?</h2>
          <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>No worries — enter your email and we'll send instructions to reset your password.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput label="Email Address" type="email" placeholder="you@example.com" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} required />
          <AuthButton loading={loading} type="submit">Send Reset Link</AuthButton>
        </form>
        <div className={`mt-6 p-4 rounded-2xl border text-sm ${dark ? 'bg-white/[0.03] border-white/[0.08] text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          Didn't receive it? Check your spam folder or{' '}
          <button className={`font-medium underline underline-offset-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} type="button">request a new link</button>.
        </div>
      </div>
    </AuthLayout>
  );
}
