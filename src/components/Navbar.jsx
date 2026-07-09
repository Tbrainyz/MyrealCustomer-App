import { useState } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Platforms", href: "#platforms" },
  { label: "Finance", href: "#inventory" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ scrolled }) {
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navBg = scrolled
    ? dark
      ? "bg-[#06080f]/90 border-b border-white/[0.07] backdrop-blur-xl"
      : "bg-white/90 border-b border-black/[0.07] backdrop-blur-xl shadow-sm"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${navBg}`}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">

          <a href="#hero" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap size={18} className="text-white" />
            </div>
            <span className={`font-display font-bold text-xl ${dark ? "text-white" : "text-slate-900"}`}>
              My Real Customer App
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${dark ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-slate-900 hover:bg-black/5"}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} aria-label="Toggle theme" className={`hidden sm:flex w-9 h-9 rounded-lg items-center justify-center transition-all duration-200 ${dark ? "bg-white/[0.07] text-slate-400 border border-white/[0.08] hover:text-white hover:border-indigo-400" : "bg-black/[0.05] text-slate-500 border border-black/[0.08] hover:text-slate-900 hover:border-indigo-400"}`}>
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link to="/login" className={`hidden md:block text-[13.5px] font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${dark ? "text-slate-400 border-white/[0.1] hover:text-white hover:border-indigo-400" : "text-slate-600 border-black/[0.1] hover:text-slate-900 hover:border-indigo-400"}`}>
              Sign In
            </Link>

            <Link to="/register" className="hidden md:inline-flex">
              <Button variant="primary" size="bold" className="text-[13.5px] px-4 py-2">
                Sign Up
              </Button>
            </Link>

            <button onClick={toggleTheme} className={`sm:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all ${dark ? "bg-white/[0.07] text-slate-400 border border-white/[0.08]" : "bg-black/[0.05] text-slate-500 border border-black/[0.08]"}`}>
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all ${dark ? "bg-white/[0.07] text-white border border-white/[0.08]" : "bg-black/[0.05] text-slate-800 border border-black/[0.08]"}`}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`md:hidden mobile-drawer border-t px-4 pb-5 pt-3 ${dark ? "bg-[#06080f] border-white/[0.07]" : "bg-white border-black/[0.07]"}`}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className={`block py-3 text-[15px] font-medium border-b transition-colors ${dark ? "text-slate-300 border-white/[0.06] hover:text-indigo-400" : "text-slate-600 border-black/[0.05] hover:text-indigo-600"}`}>
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)} className={`flex-1 py-3 rounded-xl border text-sm font-semibold text-center transition-all ${dark ? "border-white/[0.1] text-slate-400 hover:text-white" : "border-black/[0.1] text-slate-600"}`}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-[2]">
                <Button variant="primary" size="md" className="w-full justify-center">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}