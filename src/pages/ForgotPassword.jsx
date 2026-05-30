import React from "react";
import { ArrowLeft, Mail, ShieldCheck, Zap } from "lucide-react";

const ForgetPassword = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={18} className="text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-wide">
                  {" "}
                  My Real Customer App
                </h1>
                <p className="text-sm text-gray-400">Secure Account Recovery</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight max-w-xl">
                Recover access to your workspace.
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Enter your registered email address and we’ll send you a secure
                password reset link instantly.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-cyan-400">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Bank-Level Protection
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Your account recovery process is protected with advanced
                  encryption and security verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8">
              <ArrowLeft size={18} />
              Back to Login
            </button>

            <div className="mb-8">
              <div className="mb-4">
                <Mail size={36} className="text-cyan-400" />
              </div>

              <h2 className="text-4xl font-bold mb-3">Forgot Password?</h2>

              <p className="text-gray-400 leading-relaxed">
                No worries. Enter your email and we’ll send you instructions to
                reset your password securely.
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 pl-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />

                  <Mail
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                Send Reset Code
              </button>
            </form>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-sm text-gray-400 leading-relaxed">
                If you don’t receive a Code within few minutes, check your spam
                folder.
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
