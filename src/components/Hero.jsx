import { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  MessageSquare,
  Package,
  DollarSign,
  BarChart2,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";
import { GradientBlur } from "./ui/GradientBlur";
import { stats, chartData } from "../data/features";

const WORDS = ["Messaging", "Inventory", "Finances", "Automation"];

function useTypewriter() {
  const [typed, setTyped] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nigeriaTime = now.toLocaleString("en-NG", {
        timeZone: "Africa/Lagos",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(nigeriaTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const current = WORDS[wIdx];
    let t;
    if (!deleting && typed.length < current.length) {
      t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 85);
    } else if (!deleting && typed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(typed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setWIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, wIdx]);

  return { typed, currentTime };
}

const KPIS = [
  { label: "Revenue",     val: "₦52.8K",  chg: "+18.2%", up: true },
  { label: "Messages",    val: "16,920",   chg: "+31.4%", up: true },
  { label: "Contacts",    val: "4,281",    chg: "+8.7%",  up: true },
  { label: "Automations", val: "2,847",    chg: "+52%",   up: true },
];

const SIDEBAR_ICONS = [
  { Icon: LayoutDashboard, active: true },
  { Icon: MessageSquare },
  { Icon: Package },
  { Icon: DollarSign },
  { Icon: BarChart2 },
  { Icon: Users },
];

export default function Hero() {
  const { dark } = useTheme();
  const { typed, currentTime } = useTypewriter();

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16
        ${dark ? "bg-[#06080f]" : "bg-slate-50"}`}
    >
      {/* Background blobs */}
      <GradientBlur
        color={dark ? "rgba(79,70,229,0.18)" : "rgba(79,70,229,0.09)"}
        size={600}
        style={{ top: "-80px", left: "-150px" }}
      />
      <GradientBlur
        color={dark ? "rgba(6,182,212,0.14)" : "rgba(6,182,212,0.07)"}
        size={500}
        style={{ bottom: "-60px", right: "-100px" }}
      />
      <GradientBlur
        color={dark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.05)"}
        size={350}
        style={{ top: "40%", left: "45%" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Text content ── */}
        <div className="text-center mb-14">

          {/* Badge + Clock row */}
          <div className="flex flex-col items-center gap-3 mb-7">
            {/* Eyebrow badge */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold tracking-wide
                ${dark ? "bg-white/[0.05] border-white/[0.12] text-slate-300" : "bg-white border-black/[0.1] text-slate-600 shadow-sm"}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#4ade80] animate-pulse block" />
              Welcome to My Real Customer App
            </div>

            {/* Clock */}
            <div className={`flex items-center gap-2 text-[13px] font-mono ${dark ? "text-slate-400" : "text-slate-400"}`}>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>{currentTime || "Loading time..."}</span>
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold tracking-tight leading-[1.08] mb-6
              text-[clamp(36px,6.5vw,78px)]
              ${dark ? "text-slate-50" : "text-slate-900"}`}
          >
            Automate Your{" "}
            <span className="gradient-text">
              {typed}
              <span
                className="cursor-blink text-indigo-500"
                style={{ WebkitTextFillColor: "#6366f1" }}
              >
                |
              </span>
            </span>
            <br />
            From One Platform
          </h1>

          {/* Subtitle */}
          <p
            className={`text-[clamp(15px,1.8vw,19px)] leading-relaxed max-w-2xl mx-auto mb-10
              ${dark ? "text-slate-400" : "text-slate-500"}`}
          >
            Manage WhatsApp, Instagram, Facebook, TikTok, Bookkeeping,
            Inventory, Invoicing, CRM contacts, and Automation Workflows — All
            From One Centralized Dashboard.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-14">
            <Button
              variant="primary"
              size="xl"
              onClick={() =>
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>⚡</span> Get Started <ArrowRight size={18} />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 sm:gap-x-14">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className={`font-display font-bold text-[clamp(24px,3.5vw,38px)] leading-none
                    ${dark ? "text-white" : "text-slate-900"}`}
                >
                  {s.value}
                </div>
                <div className={`text-xs mt-1.5 ${dark ? "text-slate-500" : "text-slate-400"}`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dashboard preview ── */}
        <div className="animate-float max-w-[960px] mx-auto">
          <div
            className={`rounded-2xl overflow-hidden border
              ${dark
                ? "border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] bg-[#0d1117]"
                : "border-black/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.12)] bg-white"
              }`}
          >
            {/* Title bar */}
            <div
              className={`flex items-center gap-3 px-4 py-3 border-b
                ${dark ? "bg-white/[0.03] border-white/[0.07]" : "bg-slate-50 border-black/[0.07]"}`}
            >
              <div className="flex gap-1.5">
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <span key={c} className="w-3 h-3 rounded-full block" style={{ background: c }} />
                ))}
              </div>
              <div
                className={`flex-1 text-center text-[12px] rounded-md px-3 py-1 mx-4
                  ${dark ? "bg-white/[0.05] text-slate-500" : "bg-black/[0.04] text-slate-400"}`}
              >
                MessagePro — Dashboard
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" /> Live
              </span>
            </div>

            {/* Dashboard body */}
            <div className="flex">
              {/* Sidebar */}
              <div
                className={`hidden sm:flex w-12 lg:w-14 flex-col items-center gap-2.5 py-4 border-r flex-shrink-0
                  ${dark ? "bg-white/[0.02] border-white/[0.06]" : "bg-slate-50/60 border-black/[0.05]"}`}
              >
                {SIDEBAR_ICONS.map(({ Icon, active }, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${active
                        ? "bg-indigo-500/20 text-indigo-400"
                        : dark
                          ? "text-slate-600 hover:text-slate-400"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    <Icon size={16} />
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-3 sm:p-4 min-w-0">
                {/* KPI row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
                  {KPIS.map((k) => (
                    <div
                      key={k.label}
                      className={`rounded-xl p-3 border
                        ${dark ? "bg-white/[0.04] border-white/[0.07]" : "bg-slate-50 border-black/[0.06]"}`}
                    >
                      <div className={`text-[10px] font-medium uppercase tracking-wide mb-1
                        ${dark ? "text-slate-500" : "text-slate-400"}`}>
                        {k.label}
                      </div>
                      <div className={`font-display font-bold text-lg sm:text-xl leading-none
                        ${dark ? "text-white" : "text-slate-900"}`}>
                        {k.val}
                      </div>
                      <div className={`text-[10px] mt-1.5 flex items-center gap-1 font-semibold
                        ${k.up ? "text-emerald-400" : "text-red-400"}`}>
                        <TrendingUp size={10} /> {k.chg}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className={`rounded-xl p-3 border
                    ${dark ? "bg-white/[0.03] border-white/[0.06]" : "bg-slate-50/80 border-black/[0.05]"}`}>
                    <p className={`text-[11px] font-semibold mb-2 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                      Revenue Growth
                    </p>
                    <ResponsiveContainer width="100%" height={90}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#4F46E5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, fontSize: 11 }}
                          formatter={(v) => [`₦${v.toLocaleString()}`, "Revenue"]}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="url(#rev-grad)" strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`rounded-xl p-3 border
                    ${dark ? "bg-white/[0.03] border-white/[0.06]" : "bg-slate-50/80 border-black/[0.05]"}`}>
                    <p className={`text-[11px] font-semibold mb-2 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                      Message Volume
                    </p>
                    <ResponsiveContainer width="100%" height={90}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, fontSize: 11 }}
                          formatter={(v) => [v.toLocaleString(), "Messages"]}
                        />
                        <Bar dataKey="messages" fill="#06B6D4" radius={[3, 3, 0, 0]} opacity={0.8} />
                      </BarChart>
                    </ResponsiveContainer>
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