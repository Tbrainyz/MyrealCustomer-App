
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { SectionBadge, SectionTitle } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { analyticsKPIs, chartData } from '../data/features'

/* ─────────────────────────────────────────────
   Animated number
───────────────────────────────────────────── */
function AnimatedNumber({ value, duration = 1200 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const numericValue = Number(String(value).replace(/[^0-9.-]/g, ''))

    if (!Number.isFinite(numericValue)) {
      setDisplayValue(value)
      return
    }

    let startTime = null
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(
        Math.round(numericValue * eased)
      )

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  const original = String(value)

  if (original.includes('$')) {
    return `$${displayValue.toLocaleString()}`
  }

  if (original.includes('%')) {
    return `${displayValue.toLocaleString()}%`
  }

  if (original.toLowerCase().includes('k')) {
    return `${displayValue.toLocaleString()}k`
  }

  return displayValue.toLocaleString()
}

/* ─────────────────────────────────────────────
   Custom tooltip
───────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null

  return (
    <div
      className={`
        min-w-[180px] rounded-2xl p-4
        border shadow-2xl backdrop-blur-xl
        ${
          dark
            ? 'bg-slate-950/95 border-white/10'
            : 'bg-white/95 border-slate-200'
        }
      `}
    >
      <p
        className={`
          mb-3 text-xs font-semibold
          ${
            dark
              ? 'text-slate-400'
              : 'text-slate-500'
          }
        `}
      >
        {label}
      </p>

      <div className="space-y-2">
        {payload.map((item) => {
          const isRevenue = item.dataKey === 'revenue'

          return (
            <div
              key={item.dataKey}
              className="flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span
                  className={`
                    text-xs font-medium
                    ${
                      dark
                        ? 'text-slate-300'
                        : 'text-slate-600'
                    }
                  `}
                >
                  {item.name}
                </span>
              </div>

              <span
                className={`
                  text-xs font-bold
                  ${
                    dark
                      ? 'text-white'
                      : 'text-slate-900'
                  }
                `}
              >
                {isRevenue
                  ? `$${Number(item.value).toLocaleString()}`
                  : Number(item.value).toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Custom legend
───────────────────────────────────────────── */
const CustomLegend = ({ payload, dark }) => {
  return (
    <div className="flex justify-center gap-5 pt-4">
      {payload?.map((entry) => (
        <div
          key={entry.dataKey}
          className="flex items-center gap-2"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: entry.color,
            }}
          />

          <span
            className={`
              text-xs font-medium
              ${
                dark
                  ? 'text-slate-400'
                  : 'text-slate-500'
              }
            `}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function AnalyticsSection() {
  const { dark } = useTheme()

  return (
    <section
      id="analytics"
      className={`
        relative overflow-hidden
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8 lg:py-28
        ${
          dark
            ? 'bg-[#06080f]'
            : 'bg-slate-50'
        }
      `}
    >
      {/* Background glow */}
      <GradientBlur
        color={
          dark
            ? 'rgba(79,70,229,0.12)'
            : 'rgba(79,70,229,0.05)'
        }
        size={500}
        style={{
          bottom: '-100px',
          left: '-100px',
        }}
      />

      <GradientBlur
        color={
          dark
            ? 'rgba(6,182,212,0.10)'
            : 'rgba(6,182,212,0.04)'
        }
        size={450}
        style={{
          top: '5%',
          right: '-100px',
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        {/* ─────────────────────────────
            Heading
        ───────────────────────────── */}
        <div className="text-center">
          <SectionBadge>
            Analytics &amp; Insights
          </SectionBadge>
        </div>

        <SectionTitle
          subtitle="Auto-Powered Analytics Give You The Insights To Optimize Campaigns, Reduce Churn, and Scale Faster."
        >
          Data-Driven Decisions,{' '}
          <span className="gradient-text">
            Always
          </span>
        </SectionTitle>

        {/* ─────────────────────────────
            KPI Cards
        ───────────────────────────── */}
        <div
          className="
            mb-8 grid grid-cols-2
            gap-3 sm:gap-4
            lg:grid-cols-4
          "
        >
          {analyticsKPIs.map((kpi, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden
                rounded-2xl border
                p-4 text-center
                transition-all duration-500
                hover:-translate-y-1.5
                ${
                  dark
                    ? `
                      border-white/[0.08]
                      bg-white/[0.035]
                      hover:border-white/[0.14]
                      hover:bg-white/[0.055]
                    `
                    : `
                      border-black/[0.06]
                      bg-white
                      shadow-sm
                      hover:border-black/[0.10]
                      hover:shadow-lg
                    `
                }
              `}
            >
              {/* Hover glow */}
              <div
                className="
                  pointer-events-none
                  absolute -right-10 -top-10
                  h-20 w-20
                  rounded-full
                  opacity-0 blur-2xl
                  transition-opacity duration-500
                  group-hover:opacity-40
                "
                style={{
                  backgroundColor: kpi.color,
                }}
              />

              <div className="relative">
                <p
                  className="
                    font-display font-bold
                    leading-none tracking-tight
                  "
                  style={{
                    fontSize:
                      'clamp(26px,3.5vw,42px)',
                    color: kpi.color,
                  }}
                >
                  <AnimatedNumber
                    value={kpi.value}
                  />
                </p>

                <p
                  className={`
                    mb-2 mt-2
                    text-xs font-medium
                    sm:text-[13px]
                    ${
                      dark
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }
                  `}
                >
                  {kpi.label}
                </p>

                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-[10px] text-emerald-400">
                    ↗
                  </span>

                  <p className="text-xs font-semibold text-emerald-400">
                    {kpi.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────────────────────
            Analytics chart
        ───────────────────────────── */}
        <div
          className={`
            overflow-hidden rounded-2xl
            border
            ${
              dark
                ? `
                  border-white/[0.08]
                  bg-white/[0.035]
                `
                : `
                  border-black/[0.07]
                  bg-white
                  shadow-sm
                `
            }
          `}
        >
          {/* Chart header */}
          <div
            className="
              flex flex-col gap-3
              p-4 sm:p-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h3
                className={`
                  text-sm font-semibold
                  sm:text-[15px]
                  ${
                    dark
                      ? 'text-white'
                      : 'text-slate-900'
                  }
                `}
              >
                Revenue &amp; Message Volume
              </h3>

              <p
                className={`
                  mt-1 text-xs
                  ${
                    dark
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }
                `}
              >
                Performance Over The Last 7 Months
              </p>
            </div>

            {/* Live indicator */}
            <div
              className={`
                flex w-fit items-center gap-2
                rounded-full border
                px-3 py-1.5
                ${
                  dark
                    ? `
                      border-emerald-400/10
                      bg-emerald-400/5
                    `
                    : `
                      border-emerald-500/10
                      bg-emerald-500/5
                    `
                }
              `}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative inline-flex
                    h-2 w-2
                    rounded-full
                    bg-emerald-400
                  "
                />
              </span>

              <span className="text-[11px] font-medium text-emerald-400">
                Live Data
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="px-2 pb-4 sm:px-4 sm:pb-6">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minHeight={250}
              aspect={undefined}
            >
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >
                <defs>
                  {/* Revenue gradient */}
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4F46E5"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#4F46E5"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  {/* Messages gradient */}
                  <linearGradient
                    id="messagesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#06B6D4"
                      stopOpacity={0.22}
                    />

                    <stop
                      offset="100%"
                      stopColor="#06B6D4"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 6"
                  stroke={
                    dark
                      ? 'rgba(255,255,255,0.055)'
                      : 'rgba(15,23,42,0.055)'
                  }
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 11,
                    fill: dark
                      ? '#64748b'
                      : '#94a3b8',
                  }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />

                {/* Revenue axis */}
                <YAxis
                  yAxisId="revenue"
                  orientation="left"
                  tick={{
                    fontSize: 10,
                    fill: dark
                      ? '#64748b'
                      : '#94a3b8',
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `$${(
                          value / 1000
                        ).toFixed(0)}k`
                      : `$${value}`
                  }
                  width={42}
                />

                {/* Messages axis */}
                <YAxis
                  yAxisId="messages"
                  orientation="right"
                  tick={{
                    fontSize: 10,
                    fill: dark
                      ? '#64748b'
                      : '#94a3b8',
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `${(
                          value / 1000
                        ).toFixed(0)}k`
                      : value
                  }
                  width={38}
                />

                <Tooltip
                  cursor={{
                    stroke: dark
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(15,23,42,0.12)',
                    strokeWidth: 1,
                  }}
                  content={
                    <CustomTooltip
                      dark={dark}
                    />
                  }
                />

                <Legend
                  content={
                    <CustomLegend
                      dark={dark}
                    />
                  }
                />

                {/* Revenue */}
                <Area
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#revenueGradient)"
                  fillOpacity={1}
                  dot={{
                    r: 3.5,
                    fill: '#4F46E5',
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#4F46E5',
                    stroke: dark
                      ? '#06080f'
                      : '#fff',
                    strokeWidth: 3,
                  }}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />

                {/* Messages */}
                <Area
                  yAxisId="messages"
                  type="monotone"
                  dataKey="messages"
                  name="Messages"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fill="url(#messagesGradient)"
                  fillOpacity={1}
                  dot={{
                    r: 3.5,
                    fill: '#06B6D4',
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#06B6D4',
                    stroke: dark
                      ? '#06080f'
                      : '#fff',
                    strokeWidth: 3,
                  }}
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

