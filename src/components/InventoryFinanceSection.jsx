import { useTheme } from '../context/ThemeContext'
import { SectionBadge } from './ui/SectionTitle'
import { GradientBlur } from './ui/GradientBlur'
import { inventoryItems, financeCards } from '../data/features'

const STATUS_STYLES = {
  green: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  red: 'bg-red-500/15 text-red-400',
}

const CHG_STYLES = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  warn: 'text-amber-400',
}

export default function InventoryFinanceSection() {
  const { dark } = useTheme()

  return (
    <section
      id="inventory"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-[#080c18]' : 'bg-white'}`}
    >
      <GradientBlur
        color={dark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.04)'}
        size={500}
        style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

          {/* Left: text + finance cards */}
          <div className="flex-1 lg:max-w-[440px] w-full">
            <SectionBadge>Inventory &amp; Finance</SectionBadge>
            <h2 className={`font-display font-bold leading-tight tracking-tight mb-5
              text-[clamp(28px,4vw,46px)]
              ${dark ? 'text-white' : 'text-slate-900'}`}>
              Full financial &amp;{' '}
              <span className="gradient-text">stock control</span>
            </h2>
            <p className={`text-[clamp(14px,1.6vw,16px)] leading-relaxed mb-8
              ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Track inventory across warehouses, manage cash flow, create invoices, and monitor expenses — all synced with your messaging workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {financeCards.map((c, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border transition-all duration-300 hover:-translate-y-1
                    ${dark ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-white border-black/[0.07] shadow-sm'}`}
                >
                  <p className={`text-xs font-medium mb-2 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {c.label}
                  </p>
                  <p className={`font-display font-bold text-2xl leading-none`} style={{ color: c.color }}>
                    {c.value}
                  </p>
                  <p className={`text-xs mt-2 font-semibold ${CHG_STYLES[c.changeType]}`}>
                    {c.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: inventory table */}
          <div className="flex-1 w-full min-w-0">
            <div className={`flex items-center justify-between mb-3 px-1`}>
              <h3 className={`text-sm font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
                Inventory Overview
              </h3>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse2" />
                Live Sync
              </span>
            </div>

            <div
              className={`rounded-2xl border overflow-hidden
                ${dark ? 'border-white/[0.08] bg-[#0d1117]' : 'border-black/[0.07] bg-white shadow-sm'}`}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px]">
                  <thead>
                    <tr className={dark ? 'bg-white/[0.03]' : 'bg-slate-50'}>
                      {['Product', 'SKU', 'Stock', 'Status', 'Price'].map(h => (
                        <th
                          key={h}
                          className={`px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest border-b
                            ${dark ? 'text-slate-500 border-white/[0.06]' : 'text-slate-400 border-black/[0.06]'}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item, i) => (
                      <tr
                        key={i}
                        className={`border-b last:border-b-0 transition-colors duration-150
                          ${dark
                            ? 'border-white/[0.04] hover:bg-white/[0.03]'
                            : 'border-black/[0.04] hover:bg-slate-50'
                          }`}
                      >
                        <td className={`px-4 py-3.5 text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
                          {item.name}
                        </td>
                        <td className={`px-4 py-3.5 text-xs font-mono ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {item.sku}
                        </td>
                        <td className={`px-4 py-3.5 text-sm font-bold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
                          {item.stock}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[item.statusColor]}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className={`px-4 py-3.5 text-sm font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
