import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { features } from '../data/features'

function FeatureCard({ icon, title, desc, color, dark }) {
  return (
    <div
      className={`group relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-default overflow-hidden
        ${dark
          ? 'bg-white/[0.04] border-white/[0.08] hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]'
          : 'bg-white border-black/[0.07] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:border-indigo-200'
        }`}
      style={{ '--feat-color': color }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}08 0%, transparent 60%)` }}
      />

      <div
        className="w-11 h-11 rounded-[13px] flex items-center justify-center text-xl mb-4 flex-shrink-0 border"
        style={{ background: `${color}18`, borderColor: `${color}25` }}
      >
        {icon}
      </div>

      <h3 className={`font-semibold text-[15px] mb-2 ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
        {title}
      </h3>
      <p className={`text-[13.5px] leading-relaxed ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
        {desc}
      </p>
    </div>
  )
}

export default function Features() {
  const { dark } = useTheme()

  return (
    <section
      id="features"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#06080f]' : 'bg-slate-50'}`}
    >
      <GradientBlur
        color={dark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.05)'}
        size={500}
        style={{ top: '10%', right: '-120px' }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Core Features</SectionBadge>
        </div>
        <SectionTitle
          subtitle="Everything you need to run business communication, inventory, and finances — unified in one powerful AI platform."
        >
          One platform,{' '}
          <span className="gradient-text">infinite possibilities</span>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
