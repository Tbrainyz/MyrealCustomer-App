import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { testimonials } from '../data/testimonials'

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  )
}

function TestiCard({ name, role, text, avatar, color, stars, dark }) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-7 border transition-all duration-300 cursor-default
        ${dark
          ? 'bg-white/[0.04] border-white/[0.08] hover:-translate-y-1.5 hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
          : 'bg-white border-black/[0.07] shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
        }`}
      style={{ borderTop: `2px solid ${color}40` }}
    >
      <StarRating count={stars} />
      <p className={`text-[14px] sm:text-[15px] leading-relaxed mb-6
        ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2"
          style={{ background: `${color}20`, color, borderColor: `${color}40` }}
        >
          {avatar}
        </div>
        <div>
          <p className={`text-[14px] font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{name}</p>
          <p className={`text-[12px] mt-0.5 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { dark } = useTheme()

  return (
    <section
      id="testimonials"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#080c18]' : 'bg-white'}`}
    >
      <GradientBlur
        color={dark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.04)'}
        size={450}
        style={{ top: '30%', right: '-100px' }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Testimonials</SectionBadge>
        </div>
        <SectionTitle
          subtitle="Over 12,000 businesses trust Orbix to power their communications and operations every single day."
        >
          Loved by businesses{' '}
          <span className="gradient-text">worldwide</span>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <TestiCard key={i} {...t} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
