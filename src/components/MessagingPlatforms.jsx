import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { platforms } from '../data/features'

function PlatformCard({ icon, name, glow, dark }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl p-5 sm:p-7 text-center border transition-all duration-300 cursor-default
        ${dark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-black/[0.07] shadow-sm'}`}
      style={{
        transform: hovered ? 'translateY(-10px) scale(1.02)' : '',
        borderColor: hovered ? `${glow}60` : '',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,${dark ? '0.4' : '0.12'}), 0 0 30px ${glow}30`
          : '',
      }}
    >
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl border-2 transition-all duration-300"
        style={{
          background: `${glow}15`,
          borderColor: hovered ? `${glow}50` : `${glow}25`,
          boxShadow: hovered ? `0 0 24px ${glow}40` : `0 0 12px ${glow}20`,
        }}
      >
        {icon}
      </div>
      <p className={`text-sm sm:text-[14px] font-bold transition-colors duration-200
        ${hovered
          ? 'text-white'
          : dark ? 'text-slate-400' : 'text-slate-500'
        }`}>
        {name}
      </p>
      <div
        className="mt-2 mx-auto w-6 h-0.5 rounded-full transition-all duration-300"
        style={{
          background: glow,
          opacity: hovered ? 1 : 0.4,
          width: hovered ? '40px' : '24px',
        }}
      />
    </div>
  )
}

export default function MessagingPlatforms() {
  const { dark } = useTheme()

  return (
    <section
      id="platforms"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#06080f]' : 'bg-slate-50'}`}
    >
      <GradientBlur
        color={dark ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.04)'}
        size={450}
        style={{ top: '50%', right: '-100px', transform: 'translateY(-50%)' }}
      />

      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        <div className="text-center">
          <SectionBadge>Integrations</SectionBadge>
        </div>
        <SectionTitle
          subtitle="Connect every channel your customers use and manage everything from one centralized, intelligent inbox."
        >
          All your channels,{' '}
          <span className="gradient-text">one inbox</span>
        </SectionTitle>

        <div className="flex gap-10">
          {platforms.map((p, i) => (
            <PlatformCard key={i} {...p} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
