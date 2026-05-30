import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getPasswordStrength = () => {
    if (newPassword.length < 6) {
      return {
        text: "Weak",
        width: "30%",
        color: "bg-red-500",
      };
    }

    if (
      newPassword.match(/[A-Z]/) &&
      newPassword.match(/[0-9]/) &&
      newPassword.length >= 8
    ) {
      return {
        text: "Strong",
        width: "90%",
        color: "bg-green-500",
      };
    }

    return {
      text: "Medium",
      width: "60%",
      color: "bg-yellow-500",
    };
  };

  const strength = getPasswordStrength();

  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
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
                  Security & Authentication
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight max-w-xl">
                Keep your account fully protected.
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Update your password regularly to maintain account security and
                protect sensitive business data.
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
                  Multi-layer encryption keeps your credentials secure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Advanced Protection</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Use strong passwords to prevent unauthorized access.
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
                <KeyRound size={36} className="text-cyan-400" />
              </div>

              <h2 className="text-4xl font-bold mb-3">Change Password</h2>

              <p className="text-gray-400 leading-relaxed">
                Update your password to keep your account secure and protected.
              </p>
            </div>

            <form className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition-all duration-300 placeholder:text-gray-500"
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

                {confirmPassword && (
                  <p
                    className={`text-sm mt-2 ${
                      passwordsMatch ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Password Strength */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Password Strength</span>
                  <span className="text-cyan-400 font-medium">
                    {strength.text}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`${strength.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!passwordsMatch}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  passwordsMatch
                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Update Password
              </button>
            </form>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <p className="text-sm text-gray-400 leading-relaxed">
                Use at least 8 characters including uppercase letters, numbers,
                and symbols for better security.
              </p>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              Secured with enterprise-level encryption and authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
