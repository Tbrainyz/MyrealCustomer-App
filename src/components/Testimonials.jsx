import { useEffect, useState } from 'react'
import { Quote, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { testimonials } from '../data/testimonials'

function StarRating({ count }) {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="text-amber-400 text-sm transition-transform duration-300 hover:scale-125"
          style={{
            animation: `testimonialStar 0.5s ease-out ${i * 70}ms both`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function TestiCard({
  name,
  role,
  text,
  avatar,
  color,
  stars,
  dark,
  index,
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl p-5 sm:p-7 border overflow-hidden
        transition-all duration-500 cursor-default
        ${
          dark
            ? 'bg-white/[0.035] border-white/[0.08]'
            : 'bg-white border-black/[0.07] shadow-sm'
        }`}
      style={{
        transform: hovered
          ? 'translateY(-10px) scale(1.015)'
          : 'translateY(0) scale(1)',
        borderTop: `2px solid ${color}${hovered ? '' : '40'}`,
        boxShadow: hovered
          ? `0 25px 70px rgba(0,0,0,${
              dark ? '0.4' : '0.10'
            }), 0 0 35px ${color}20`
          : undefined,
      }}
    >
      {/* Animated glow */}
      <div
        className="absolute pointer-events-none rounded-full blur-3xl transition-all duration-700"
        style={{
          width: 180,
          height: 180,
          background: color,
          opacity: hovered ? 0.12 : 0.035,
          top: -80,
          right: -80,
        }}
      />

      {/* Quote icon */}
      <div
        className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300"
        style={{
          background: `${color}${hovered ? '18' : '0c'}`,
          borderColor: `${color}${hovered ? '35' : '15'}`,
          transform: hovered ? 'rotate(-8deg) scale(1.08)' : '',
        }}
      >
        <Quote
          size={16}
          style={{ color }}
          className="transition-transform duration-300"
        />
      </div>

      {/* Rating */}
      <StarRating count={stars} />

      {/* Testimonial */}
      <p
        className={`relative z-10 text-[14px] sm:text-[15px] leading-[1.8] mb-7 pr-5
          ${dark ? 'text-slate-300' : 'text-slate-600'}`}
      >
        "{text}"
      </p>

      {/* Divider */}
      <div
        className={`h-px mb-5 transition-all duration-500
          ${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`}
        style={{
          width: hovered ? '100%' : '70%',
          background: hovered
            ? `linear-gradient(90deg, ${color}60, transparent)`
            : undefined,
        }}
      />

      {/* User */}
      <div className="flex items-center gap-3">
        <div
          className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 transition-all duration-300"
          style={{
            background: `${color}20`,
            color,
            borderColor: `${color}${hovered ? '70' : '40'}`,
            boxShadow: hovered ? `0 0 25px ${color}35` : '',
            transform: hovered ? 'scale(1.08)' : '',
          }}
        >
          {avatar}

          {/* Online indicator */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
            style={{
              borderColor: dark ? '#080c18' : '#ffffff',
            }}
          />
        </div>

        <div>
          <p
            className={`text-[14px] font-semibold transition-colors duration-300
              ${dark ? 'text-white' : 'text-slate-900'}`}
          >
            {name}
          </p>

          <p
            className={`text-[12px] mt-0.5
              ${dark ? 'text-slate-500' : 'text-slate-400'}`}
          >
            {role}
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  )
}

export default function Testimonials() {
  const { dark } = useTheme()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="testimonials"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#080c18]' : 'bg-white'}`}
    >
      {/* Background glow */}
      <GradientBlur
        color={
          dark
            ? 'rgba(6,182,212,0.10)'
            : 'rgba(6,182,212,0.045)'
        }
        size={450}
        style={{
          top: '30%',
          right: '-100px',
        }}
      />

      <GradientBlur
        color={
          dark
            ? 'rgba(139,92,246,0.08)'
            : 'rgba(139,92,246,0.035)'
        }
        size={350}
        style={{
          bottom: '-100px',
          left: '-100px',
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700
            ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
        >
          <SectionBadge>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={12} />
              Testimonials
            </span>
          </SectionBadge>
        </div>

        <SectionTitle
          subtitle="Over 12,000 Businesses Trust My Real Customer App to Power their Communications and Operations Every Single Day."
        >
          Loved By Businesses{' '}
          <span className="gradient-text">Worldwide</span>
        </SectionTitle>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-10 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">★★★★★</span>
            <span
              className={`text-sm font-semibold ${
                dark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              4.9/5 rating
            </span>
          </div>

          <div
            className={`hidden sm:block w-px h-5 ${
              dark ? 'bg-white/10' : 'bg-black/10'
            }`}
          />

          <div
            className={`text-sm ${
              dark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Trusted by <strong className={dark ? 'text-white' : 'text-slate-900'}>
              12,000+
            </strong>{' '}
            Businesses
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                transitionDelay: `${i * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible
                  ? 'translateY(0)'
                  : 'translateY(30px)',
              }}
            >
              <TestiCard
                {...t}
                dark={dark}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* Bottom trust message */}
        <div
          className={`mt-10 text-center text-xs ${
            dark ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Real Businesses. Real Results. One Centralized Platform.
        </div>
      </div>

      {/* Local animation */}
      <style>{`
        @keyframes testimonialStar {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  )
}