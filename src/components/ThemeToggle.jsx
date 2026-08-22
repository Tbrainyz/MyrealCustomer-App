import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { dark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
        ${dark
          ? 'bg-white/[0.07] border-white/[0.1] text-slate-400 hover:text-white hover:border-indigo-400'
          : 'bg-black/[0.05] border-black/[0.1] text-slate-500 hover:text-slate-900 hover:border-indigo-400'
        } ${className}`}
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
      <span className="text-xs font-medium">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
