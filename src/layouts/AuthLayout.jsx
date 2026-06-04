import { Link } from 'react-router-dom';
import { Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AuthLayout({ children, leftContent }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 relative overflow-hidden transition-colors duration-300
      ${dark ? 'bg-[#050816] text-white' : 'bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/60 text-slate-900'}`}>

      {/* Blobs */}
      <div className={`absolute top-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none ${dark ? 'bg-cyan-500/15' : 'bg-indigo-200/50'}`} />
      <div className={`absolute bottom-[-140px] right-[-120px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none ${dark ? 'bg-violet-500/15' : 'bg-violet-200/40'}`} />
      <div className={`absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none ${dark ? 'bg-fuchsia-500/8' : 'bg-cyan-200/25'}`} />

      {/* Theme toggle */}
      <button onClick={toggleTheme} aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200
          ${dark ? 'bg-white/[0.07] border-white/10 text-slate-300 hover:text-white hover:border-indigo-400' : 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-indigo-400 shadow-sm'}`}>
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Card */}
      <div className={`w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] relative z-10 shadow-2xl border transition-all duration-300
        ${dark ? 'border-white/10 bg-white/[0.03] backdrop-blur-2xl' : 'border-white/80 bg-white/90 backdrop-blur-2xl shadow-slate-200/80'}`}>

        {/* Left panel */}
        <div className={`hidden lg:flex flex-col justify-between p-12 border-r transition-colors duration-300
          ${dark ? 'border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10' : 'border-slate-100 bg-gradient-to-br from-indigo-50 via-white/60 to-violet-50'}`}>
          <div>
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>My Real Customer App</h1>
                <p className={`text-xs font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Premium Workspace</p>
              </div>
            </Link>
            {leftContent}
          </div>
        </div>

        {/* Right panel */}
        <div className={`flex items-center justify-center p-7 sm:p-12 transition-colors duration-300 ${dark ? '' : 'bg-white/70'}`}>
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link to="/" className="flex lg:hidden items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
                <Zap size={16} className="text-white" />
              </div>
              <span className={`font-bold text-lg ${dark ? 'text-white' : 'text-slate-900'}`}>My Real Customer App</span>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
