import { useTheme } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ChevronUp } from 'lucide-react'

export default function MainLayout({ children }) {
  const { dark } = useTheme()
  const { scrollY, progress } = useScrollProgress()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#06080f] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      {/* Navbar */}
      <Navbar scrolled={scrollY > 50} />

      {/* Page content */}
      <main>{children}</main>

      {/* Back to top */}
      {scrollY > 400 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-5 sm:right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)',
            boxShadow: '0 4px 20px rgba(79,70,229,0.45)',
          }}
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  )
}
