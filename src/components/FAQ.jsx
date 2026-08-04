import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { faqData } from '../data/pricing'

function FAQItem({ q, a, dark, open, onToggle }) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-250
        ${open
          ? dark ? 'border-indigo-500/35 bg-white/[0.05]' : 'border-indigo-300 bg-white'
          : dark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-black/[0.07] shadow-sm'
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
      >
        <span className={`font-semibold text-sm sm:text-[15px] flex-1 leading-snug
          ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
          {q}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300
            ${open
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-400 rotate-180'
              : dark ? 'border-white/[0.12] text-slate-500' : 'border-black/[0.1] text-slate-400'
            }`}
        >
          <ChevronDown size={15} />
        </div>
      </button>

      <div
        className="faq-body"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className={`px-5 sm:px-6 pb-5 text-[13.5px] sm:text-sm leading-relaxed
          ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { dark } = useTheme()
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = i => setOpenIdx(o => (o === i ? null : i))

  return (
    <section
      id="faq"
      className={`relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#080c18]' : 'bg-slate-50'}`}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="text-center">
          <SectionBadge>FAQ</SectionBadge>
        </div>
        <SectionTitle
          subtitle="Have questions? We have answers. Can't find what you're looking for? Chat with us live."
        >
          Frequently asked{' '}
          <span className="gradient-text">questions</span>
        </SectionTitle>

        <div className="flex flex-col gap-3">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              {...item}
              dark={dark}
              open={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
