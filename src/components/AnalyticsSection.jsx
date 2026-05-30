import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { analyticsKPIs, chartData } from '../data/features'

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null
  return (
    <div className={`rounded-xl p-3 border shadow-xl text-xs
      ${dark ? 'bg-slate-900 border-white/10' : 'bg-white border-black/10'}`}>
      <p className={`font-semibold mb-2 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.name === 'Revenue' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsSection() {
  const { dark } = useTheme()

  return (
    <section
      id="analytics"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#06080f]' : 'bg-slate-50'}`}
    >
      <GradientBlur
        color={dark ? 'rgba(79,70,229,0.1)' : 'rgba(79,70,229,0.04)'}
        size={450}
        style={{ bottom: '0', left: '0' }}
      />
      <GradientBlur
        color={dark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.04)'}
        size={400}
        style={{ top: '10%', right: '0' }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Analytics &amp; Insights</SectionBadge>
        </div>
        <SectionTitle
          subtitle="AI-powered analytics give you the insights to optimize campaigns, reduce churn, and scale faster."
        >
          Data-driven decisions,{' '}
          <span className="gradient-text">always</span>
        </SectionTitle>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {analyticsKPIs.map((k, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 sm:p-6 border text-center transition-all duration-300 hover:-translate-y-1
                ${dark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-black/[0.07] shadow-sm'}`}
            >
              <p
                className="font-display font-bold leading-none mb-2"
                style={{ fontSize: 'clamp(26px,3.5vw,42px)', color: k.color }}
              >
                {k.value}
              </p>
              <p className={`text-xs sm:text-[13px] font-medium mb-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                {k.label}
              </p>
              <p className="text-xs font-semibold text-emerald-400">{k.change}</p>
            </div>
          ))}
        </div>

        {/* Full chart */}
        <div
          className={`rounded-2xl p-4 sm:p-6 border
            ${dark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-black/[0.07] shadow-sm'}`}
        >
          <h3 className={`text-sm sm:text-[15px] font-semibold mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
            Revenue &amp; Message Volume — Last 7 Months
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : v}
              />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 16, color: '#94a3b8' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#4F46E5"
                strokeWidth={2.5}
                dot={{ fill: '#4F46E5', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#4F46E5' }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                name="Messages"
                stroke="#06B6D4"
                strokeWidth={2.5}
                dot={{ fill: '#06B6D4', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#06B6D4' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
