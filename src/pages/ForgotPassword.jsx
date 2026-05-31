import React, { useState } from "react";
import { ArrowLeft, Mail, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      // 🔌 Replace with real API later
      await new Promise((res) => setTimeout(res, 1200));

      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6 py-10">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={18} className="text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  My Real Customer App
                </h1>
                <p className="text-sm text-gray-400">
                  Secure Account Recovery
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-bold leading-tight max-w-xl">
              Recover access to your workspace.
            </h2>

            <p className="text-lg text-gray-300 mt-6 max-w-lg">
              Enter your registered email address and we’ll send you a secure
              password reset link instantly.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-4">
              <ShieldCheck size={28} className="text-cyan-400" />

              <div>
                <h3 className="text-xl font-semibold">
                  Bank-Level Protection
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Your account recovery process is protected with advanced
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
            >
              <ArrowLeft size={18} />
              Back to Login
            </button>

            {/* HEADER */}
            <div className="mb-8">
              <Mail size={36} className="text-cyan-400 mb-4" />

              <h2 className="text-4xl font-bold mb-3">
                Forgot Password?
              </h2>

              <p className="text-gray-400">
                No worries. Enter your email and we’ll send reset instructions.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
                  />

                  <Mail
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>

            {/* INFO BOX */}
            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-sm text-gray-400">
                If you don’t receive a code within a few minutes, check your spam folder.
              </p>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Protected by enterprise-grade encryption.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;