import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';
import toast from 'react-hot-toast';
import AuthLayout from '../layouts/AuthLayout';
import { AuthButton } from '../components/ui/AuthInput';

function LeftContent() {
  const { dark } = useTheme();
  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-[2.4rem] font-bold leading-[1.15] mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
          Verify your{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">email address.</span>
        </h2>
        <p className={`text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          We sent a 6-digit verification code to your email. Enter it to activate your account.
        </p>
      </div>
      <div className={`p-5 rounded-2xl border ${dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${dark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
            <ShieldCheck size={22} className="text-cyan-500" />
          </div>
          <div>
            <h3 className={`font-semibold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Secure Account Activation</h3>
            <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              This confirms you own the email address and protects your workspace from unauthorized signups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodeVerification() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmailAndLogin } = useAuth();

  const email = location.state?.email || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error('No email found. Please register again.');
      navigate('/register');
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return toast.error('Enter the full 6-digit code');

    setLoading(true);
    try {
      await verifyEmailAndLogin(email, code);
      toast.success('Email verified! Welcome aboard.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authAPI.resendVerification({ email });
      toast.success('New verification code sent');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  const inputBase = `w-full aspect-square rounded-2xl text-center text-2xl font-bold outline-none transition-all duration-200
    ${dark
      ? 'bg-white/[0.05] border-2 border-white/10 text-white focus:border-indigo-400 focus:bg-indigo-500/5'
      : 'bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-indigo-500 focus:bg-white'
    }`;

  return (
    <AuthLayout leftContent={<LeftContent />}>
      <div>
        <Link to="/register" className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="mb-8">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${dark ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
            <Mail size={24} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>Verify Your Email</h2>
          <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-6 gap-2.5" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                className={inputBase}
              />
            ))}
          </div>

          <AuthButton loading={loading} onClick={handleVerify}>Verify & Continue</AuthButton>
        </div>

        <div className="flex items-center justify-between mt-7 text-sm">
          <p className={dark ? 'text-slate-400' : 'text-slate-500'}>Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resending}
            className={`font-semibold transition-colors disabled:opacity-50 ${dark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
          >
            {resending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>

        <div className={`mt-5 p-4 rounded-2xl border text-sm ${dark ? 'bg-white/[0.03] border-white/8 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          ⏱ This code expires in <span className={`font-semibold ${dark ? 'text-white' : 'text-slate-700'}`}>15 minutes</span> for your security.
        </div>
      </div>
    </AuthLayout>
  );
}
