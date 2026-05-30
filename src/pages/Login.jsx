import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      toast.error(err?.response?.data?.message || msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl relative z-10">
        
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 border-r border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide">MessagePro</h1>
                <p className="text-sm text-gray-400">Premium Workspace</p>
              </div>
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Welcome back to your digital empire.
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Access your analytics, automate workflows, and scale your
              productivity with our next-generation SaaS experience.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-sm text-gray-400 mt-1">Customer Retention</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-sm text-gray-400 mt-1">Cloud Access</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h3 className="text-2xl font-bold">4.9★</h3>
              <p className="text-sm text-gray-400 mt-1">User Rating</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-3">Sign In</h2>
              <p className="text-gray-400 text-base">
                Continue managing your workspace securely.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-300">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 font-semibold text-black hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-8">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}