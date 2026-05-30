import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await authAPI.register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">MessagePro</h1>
                <p className="text-sm text-gray-400">Next Generation Workspace</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight max-w-xl">
                Build your future with smarter workflows.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Join thousands of creators, startups, and teams using MessagePro to
                automate operations, manage growth, and scale faster.
              </p>
            </div>
          </div>

          <div className="space-y-5 mt-12">
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Enterprise Security</h3>
                <p className="text-gray-400 text-sm mt-1">
                  End-to-end encrypted infrastructure with advanced protection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Experience</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Unlock powerful automation tools built for modern teams.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-3">Create Account</h2>
              <p className="text-gray-400 text-base">Start your premium experience today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="John Doe"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Create password"
                    required
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={set('confirm')}
                    placeholder="Confirm password"
                    required
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}