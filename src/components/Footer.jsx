import { useState } from 'react'
import { Zap, Send, Mail, Globe, MessageSquare, Shield } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const FOOTER_COLS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers','Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy','Terms of Service','Security'],
  },
]

const SOCIALS = [
  { Icon: Mail, label: 'Email' },
  { Icon: Globe, label: 'Website' },
  { Icon: MessageSquare, label: 'Discord' },
  { Icon: Shield, label: 'Security' },
]

export default function Footer() {
  const { dark } = useTheme()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = e => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      className={`border-t ${dark ? 'bg-[#06080f] border-white/[0.06]' : 'bg-white border-black/[0.07]'}`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">

          {/* Brand col — spans 2 on large */}
          <div className="sm:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={16} className="text-white" />
              </div>
              <span className={`font-display font-bold text-xl ${dark ? 'text-white' : 'text-slate-900'}`}>
                My Real Customer App
              </span>
              
            </a>

            <p className={`text-sm leading-relaxed mb-6 max-w-[280px]
              ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
              The AI-powered platform that unifies messaging, inventory, and financial operations for modern businesses.
            </p>

            {/* Newsletter */}
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                <span>✓</span> You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors focus:border-indigo-500
                    ${dark
                      ? 'bg-white/[0.05] border-white/[0.1] text-white placeholder:text-slate-600'
                      : 'bg-slate-50 border-black/[0.1] text-slate-900 placeholder:text-slate-400'
                    }`}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors flex-shrink-0"
                >
                  <Send size={14} className="text-white" />
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-4
                ${dark ? 'text-slate-200' : 'text-slate-900'}`}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      className={`text-sm transition-colors duration-150
                        ${dark ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'}`}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
            ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}
        >
          <p className={`text-xs ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} My Real Customer App, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200
                  ${dark
                    ? 'bg-white/[0.05] border-white/[0.08] text-slate-500 hover:border-indigo-400 hover:text-indigo-400'
                    : 'bg-slate-50 border-black/[0.08] text-slate-400 hover:border-indigo-400 hover:text-indigo-500'
                  }`}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
