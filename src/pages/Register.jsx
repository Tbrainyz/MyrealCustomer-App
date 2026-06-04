import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Zap, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput, AuthButton } from '../components/ui/AuthInput';

const FEATURES = [
  { icon: ShieldCheck, color: 'text-cyan-500',   bg: (d) => d ? 'bg-cyan-500/10'    : 'bg-cyan-50',    title: 'Enterprise Security',    desc: 'End-to-end encrypted infrastructure with advanced protection.' },
  { icon: Sparkles,    color: 'text-violet-500',  bg: (d) => d ? 'bg-violet-500/10'  : 'bg-violet-50',  title: 'AI-Powered Experience',  desc: 'Unlock powerful automation tools built for modern teams.' },
  { icon: Zap,         color: 'text-indigo-500',  bg: (d) => d ? 'bg-indigo-500/10'  : 'bg-indigo-50',  title: 'Instant Setup',          desc: 'Go live in minutes — no technical expertise required.' },
];

function LeftContent() {
  const { dark } = useTheme();
  return (
    <div className="space-y-7">
      <div>
        <h2 className={`text-[2.4rem] font-bold leading-[1.15] mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
          Build your future with{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">smarter workflows.</span>
        </h2>
        <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Join thousands of teams using My Real Customer App to automate operations and scale faster.
        </p>
      </div>
      <div className="space-y-3">
        {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className={`flex items-start gap-4 p-4 rounded-2xl border ${dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white/80 border-slate-100 shadow-sm'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg(dark)}`}><Icon size={20} className={color} /></div>
            <div>
              <h3 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
              <p className={`text-xs mt-0.5 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Register() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await authAPI.register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout leftContent={<LeftContent />}>
      <div>
        <div className="mb-7">
          <h2 className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>Create Account</h2>
          <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Join thousands of teams scaling with us.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput label="Full Name" type="text" placeholder="John Doe" icon={User} value={form.name} onChange={set('name')} required />
          <AuthInput label="Email Address" type="email" placeholder="you@example.com" icon={Mail} value={form.email} onChange={set('email')} required />
          <AuthInput
            label="Password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" icon={Lock}
            value={form.password} onChange={set('password')}
            rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onRightIconClick={() => setShowPassword(v => !v)} required
          />
          <AuthInput
            label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password" icon={Lock}
            value={form.confirm} onChange={set('confirm')}
            rightIcon={showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            onRightIconClick={() => setShowConfirm(v => !v)} required
          />
          <label className={`flex items-start gap-2.5 text-sm cursor-pointer select-none ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            <input type="checkbox" className="w-4 h-4 rounded mt-0.5 accent-indigo-500" required />
            <span>I agree to the <span className={dark ? 'text-indigo-400' : 'text-indigo-600'}>Terms of Service</span> and <span className={dark ? 'text-indigo-400' : 'text-indigo-600'}>Privacy Policy</span></span>
          </label>
          <AuthButton loading={loading} type="submit">
            <span className="flex items-center justify-center gap-2">Create Account <ArrowRight size={16} /></span>
          </AuthButton>
        </form>
        <p className={`text-center text-sm mt-6 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-semibold ${dark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
