import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Sparkles, Sun, Moon, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SUGGESTIONS = [
  'Dashboard overview', 'Send a message', 'View contacts', 'Create invoice',
  'Check expenses', 'Cash flow report', 'Inventory products', 'Stock movements',
  'Message templates', 'Scheduled messages', 'Message logs', 'Settings',
];

export default function Header({ title, subtitle, onMobileMenuClick }) {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const displayTitle = title || `${greeting}, ${user?.name?.split(' ')[0] || 'User'} 👋`;

  const filtered = query
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS.slice(0, 6);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const border  = dark ? 'border-white/[0.08]' : 'border-black/[0.07]';
  const bg      = dark ? 'bg-black/20 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl shadow-sm';
  const inputBg = dark
    ? 'bg-white/[0.06] border-white/[0.09] text-white placeholder:text-slate-500 focus:border-primary-500'
    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary-500';
  const dropBg  = dark
    ? 'bg-[#0e0e1c] border-white/[0.09] shadow-2xl shadow-black/40'
    : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60';
  const iconBtn = dark
    ? 'bg-white/[0.05] border-white/[0.09] text-slate-400 hover:text-white hover:border-primary-500/40'
    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-primary-500/50';

  return (
    <header className={`sticky top-0 z-30 px-4 sm:px-6 py-3.5 border-b ${bg} ${border} transition-colors duration-300`}>
      <div className="flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMobileMenuClick}
            className={`lg:hidden p-2 rounded-xl border transition-all ${iconBtn}`}
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className={`text-xl font-bold tracking-tight truncate ${dark ? 'text-white' : 'text-slate-900'}`}>
                {displayTitle}
              </h1>
              <div className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border
                ${dark
                  ? 'bg-primary-500/10 border-primary-500/20 text-primary-300'
                  : 'bg-primary-50 border-primary-200 text-primary-600'
                }`}>
                <Sparkles size={10} /> Premium
              </div>
            </div>
            {subtitle && (
              <p className={`text-xs mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">

          {/* SEARCH */}
          <div className="relative hidden md:block" ref={searchRef}>
            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${searchOpen ? 'text-primary-500' : dark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className={`w-64 pl-9 pr-8 py-2 rounded-2xl text-sm outline-none border transition-all duration-200 ${inputBg}`}
            />
            {query && (
              <button onClick={() => setQuery('')} className={`absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
                <X size={13} />
              </button>
            )}
            {searchOpen && (
              <div className={`absolute top-full mt-2 right-0 w-72 rounded-2xl border overflow-hidden z-50 ${dropBg}`}>
                <div className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wider border-b ${dark ? 'text-slate-500 border-white/[0.06]' : 'text-slate-400 border-slate-100'}`}>
                  {query ? `Results for "${query}"` : 'Quick Access'}
                </div>
                {filtered.length > 0 ? filtered.map(s => (
                  <button
                    key={s}
                    onMouseDown={() => { setQuery(s); setSearchOpen(false); }}
                    className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left transition-colors
                      ${dark ? 'text-slate-300 hover:bg-white/[0.06]' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <Search size={12} className={dark ? 'text-slate-600' : 'text-slate-400'} />
                    {s}
                  </button>
                )) : (
                  <p className={`px-4 py-3 text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>No results found</p>
                )}
              </div>
            )}
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${iconBtn}`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* NOTIFICATIONS */}
          <button className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${iconBtn}`}>
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-offset-0" />
          </button>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(v => !v)}
              className={`flex items-center gap-2 pl-1 pr-2.5 h-9 rounded-xl border transition-all duration-200 ${iconBtn}`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className={`text-sm font-medium hidden lg:block ${dark ? 'text-white' : 'text-slate-800'}`}>
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <ChevronDown size={13} className={`transition-transform ${profileOpen ? 'rotate-180' : ''} ${dark ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>

            {profileOpen && (
              <div className={`absolute right-0 top-full mt-2 w-52 rounded-2xl border overflow-hidden z-50 ${dropBg}`}>
                <div className={`px-4 py-3 border-b ${dark ? 'border-white/[0.07]' : 'border-slate-100'}`}>
                  <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
                  <p className={`text-xs mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{user?.email}</p>
                </div>
                {[
                  { icon: User,     label: 'My Profile', to: '/settings' },
                  { icon: Settings, label: 'Settings',   to: '/settings' },
                ].map(({ icon: Icon, label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={() => setProfileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                      ${dark ? 'text-slate-300 hover:bg-white/[0.06] hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <Icon size={15} /> {label}
                  </Link>
                ))}
                <div className={`border-t ${dark ? 'border-white/[0.07]' : 'border-slate-100'}`} />
                <button
                  onClick={() => { logout(); setProfileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-500 transition-colors w-full"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
