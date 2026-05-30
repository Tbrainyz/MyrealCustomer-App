import {
  LayoutDashboard,
  MessageSquare,
  Package,
  DollarSign,
  BarChart2,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { SectionBadge, SectionTitle } from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { chartData } from "../data/features";

const KPIS = [
  { label: "Total Revenue", val: "₦52,840", chg: "+18.2%", color: "#4F46E5" },
  { label: "Messages Sent", val: "16,920", chg: "+31.4%", color: "#06B6D4" },
  { label: "Active Contacts", val: "4,281", chg: "+8.7%", color: "#10B981" },
  { label: "Automations Run", val: "2,847", chg: "+52.1%", color: "#F59E0B" },
];

const SIDEBAR = [
  { Icon: LayoutDashboard, active: true },
  { Icon: MessageSquare },
  { Icon: Package },
  { Icon: DollarSign },
  { Icon: BarChart2 },
  { Icon: Users },
];

const ACTIVITY = [
  {
    text: 'Campaign "Summer Sale" sent to 4,200 contacts',
    time: "2m ago",
    dot: "#4F46E5",
  },
  {
    text: "New invoice #INV-0042 created for $3,200",
    time: "8m ago",
    dot: "#10B981",
  },
  {
    text: "Stock alert: iPhone 15 Pro — only 3 units left",
    time: "15m ago",
    dot: "#F59E0B",
  },
  {
    text: "WhatsApp bot handled 142 conversations",
    time: "1h ago",
    dot: "#06B6D4",
  },
];

export default function DashboardPreview() {
  const { dark } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? "bg-[#080c18]" : "bg-white"}`}
    >
      <GradientBlur
        color={dark ? "rgba(79,70,229,0.1)" : "rgba(79,70,229,0.04)"}
        size={600}
        style={{ bottom: "-50px", left: "50%", transform: "translateX(-50%)" }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Live Dashboard</SectionBadge>
        </div>
        <SectionTitle subtitle="A unified command center for your entire business — messaging, finances, inventory, and analytics, all in real time.">
          Your business, <span className="gradient-text">at a glance</span>
        </SectionTitle>

        {/* Dashboard mockup */}
        <div className="animate-float2">
          <div
            className={`rounded-2xl overflow-hidden border
              ${
                dark
                  ? "border-white/[0.1] shadow-[0_40px_100px_rgba(0,0,0,0.65)] bg-[#0d1117]"
                  : "border-black/[0.1] shadow-[0_40px_100px_rgba(0,0,0,0.1)] bg-white"
              }`}
          >
            {/* Title bar */}
            <div
              className={`flex items-center gap-3 px-4 py-3 border-b
              ${dark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-black/[0.06]"}`}
            >
              <div className="flex gap-1.5">
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <span
                    key={c}
                    className="w-3 h-3 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span
                className={`flex-1 text-center text-xs rounded px-3 py-1 mx-4
                ${dark ? "bg-white/[0.05] text-slate-500" : "bg-slate-100 text-slate-400"}`}
              >
                My Real Customer App — Dashboard
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse2" />{" "}
                Live
              </span>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div
                className={`hidden sm:flex w-12 lg:w-14 flex-col items-center gap-2.5 py-4 border-r flex-shrink-0
                ${dark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50/80 border-black/[0.05]"}`}
              >
                {SIDEBAR.map(({ Icon, active }, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center
                      ${active ? "bg-indigo-500/20 text-indigo-400" : dark ? "text-slate-600" : "text-slate-400"}`}
                  >
                    <Icon size={16} />
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="flex-1 p-3 sm:p-4 min-w-0">
                {/* KPIs */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 mb-3">
                  {KPIS.map((k) => (
                    <div
                      key={k.label}
                      className={`rounded-xl p-3 border
                        ${dark ? "bg-white/[0.04] border-white/[0.07]" : "bg-slate-50 border-black/[0.06]"}`}
                    >
                      <div
                        className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5
                        ${dark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        {k.label}
                      </div>
                      <div
                        className={`font-display font-bold text-lg sm:text-xl lg:text-2xl leading-none
                        ${dark ? "text-white" : "text-slate-900"}`}
                      >
                        {k.val}
                      </div>
                      <div className="text-[10px] mt-1.5 text-emerald-400 font-semibold flex items-center gap-1">
                        <TrendingUp size={10} /> {k.chg}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
                  {/* Revenue chart */}
                  <div
                    className={`lg:col-span-2 rounded-xl p-3 border
                    ${dark ? "bg-white/[0.03] border-white/[0.06]" : "bg-slate-50/80 border-black/[0.05]"}`}
                  >
                    <p
                      className={`text-[12px] font-semibold mb-3 ${dark ? "text-slate-200" : "text-slate-800"}`}
                    >
                      Revenue Growth
                    </p>
                    <ResponsiveContainer width="100%" height={130}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="db-rev"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#4F46E5"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4F46E5"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke={
                            dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"
                          }
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 10, fill: "#64748b" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: "#64748b" }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "#1e293b",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                          formatter={(v) => [
                            `$${v.toLocaleString()}`,
                            "Revenue",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#4F46E5"
                          fill="url(#db-rev)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Activity feed */}
                  <div
                    className={`rounded-xl p-3 border
                    ${dark ? "bg-white/[0.03] border-white/[0.06]" : "bg-slate-50/80 border-black/[0.05]"}`}
                  >
                    <p
                      className={`text-[12px] font-semibold mb-3 ${dark ? "text-slate-200" : "text-slate-800"}`}
                    >
                      Recent Activity
                    </p>
                    <div className="flex flex-col gap-3">
                      {ACTIVITY.map((a, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: a.dot,
                              boxShadow: `0 0 6px ${a.dot}`,
                            }}
                          />
                          <div>
                            <p
                              className={`text-[11px] leading-snug ${dark ? "text-slate-400" : "text-slate-600"}`}
                            >
                              {a.text}
                            </p>
                            <p
                              className={`text-[10px] mt-0.5 ${dark ? "text-slate-600" : "text-slate-400"}`}
                            >
                              {a.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
