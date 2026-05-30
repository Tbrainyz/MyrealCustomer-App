import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Zap,
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={18} className="text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-wide">
                  My Real Customer App
                </h1>
                <p className="text-sm text-gray-400">
                  Advanced Account Security
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight max-w-xl">
                Create a stronger new password.
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Secure your account with a powerful password designed to protect
                your digital workspace and sensitive information.
              </p>
            </div>
          </div>

          <div className="space-y-5 mt-12">
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Secure Encryption</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Your credentials are protected with enterprise-level security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Password Protection</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Use a combination of letters, numbers, and symbols for maximum
                  protection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/10">
                <Lock size={36} className="text-cyan-400" />
              </div>

              <h2 className="text-4xl font-bold mb-3">Create New Password</h2>

              <p className="text-gray-400 leading-relaxed">
                Your new password must be unique and different from previously
                used passwords.
              </p>
            </div>

            <form className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Password Strength</span>
                  <span className="text-cyan-400 font-medium">Strong</span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"></div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-sm text-gray-400 leading-relaxed">
                Make sure your password contains at least 8 characters,
                including uppercase letters, numbers, and symbols.
              </p>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Secured with enterprise-level authentication and encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
