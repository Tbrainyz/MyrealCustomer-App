import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  MessageSquare,
  Package,
  DollarSign,
  BarChart2,
  Users,
  Sparkles,
  Activity,
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

/* =========================================================
   TYPEWRITER
========================================================= */

const WORDS = [
  "Messaging",
  "Inventory",
  "Finances",
  "Automation",
];

function useTypewriter() {
  const [typed, setTyped] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [currentTime, setCurrentTime] =
    useState("");

  /* Lagos clock */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const nigeriaTime =
        now.toLocaleString("en-NG", {
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

    const interval =
      setInterval(updateTime, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  /* Typewriter */
  useEffect(() => {
    const current = WORDS[wIdx];
    let timer;

    if (
      !deleting &&
      typed.length < current.length
    ) {
      timer = setTimeout(() => {
        setTyped(
          current.slice(
            0,
            typed.length + 1
          )
        );
      }, 85);
    } else if (
      !deleting &&
      typed.length === current.length
    ) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, 1800);
    } else if (
      deleting &&
      typed.length > 0
    ) {
      timer = setTimeout(() => {
        setTyped(
          typed.slice(0, -1)
        );
      }, 45);
    } else {
      setDeleting(false);
      setWIdx(
        (i) =>
          (i + 1) % WORDS.length
      );
    }

    return () =>
      clearTimeout(timer);
  }, [
    typed,
    deleting,
    wIdx,
  ]);

  return {
    typed,
    currentTime,
  };
}

/* =========================================================
   DASHBOARD DATA
========================================================= */

const KPIS = [
  {
    label: "Revenue",
    val: "₦52.8K",
    chg: "+18.2%",
    up: true,
    color: "#6366f1",
  },
  {
    label: "Messages",
    val: "16,920",
    chg: "+31.4%",
    up: true,
    color: "#06b6d4",
  },
  {
    label: "Contacts",
    val: "4,281",
    chg: "+8.7%",
    up: true,
    color: "#8b5cf6",
  },
  {
    label: "Automations",
    val: "2,847",
    chg: "+52%",
    up: true,
    color: "#10b981",
  },
];

const SIDEBAR_ICONS = [
  {
    Icon: LayoutDashboard,
    active: true,
  },
  {
    Icon: MessageSquare,
  },
  {
    Icon: Package,
  },
  {
    Icon: DollarSign,
  },
  {
    Icon: BarChart2,
  },
  {
    Icon: Users,
  },
];

/* =========================================================
   3D DASHBOARD
========================================================= */

function DashboardPreview({ dark }) {
  const dashboardRef =
    useRef(null);

  const handleMouseMove = (e) => {
    const element =
      dashboardRef.current;

    if (!element) return;

    const rect =
      element.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y - rect.height / 2) /
        (rect.height / 2)) *
      -3.5;

    const rotateY =
      ((x - rect.width / 2) /
        (rect.width / 2)) *
      4.5;

    element.style.setProperty(
      "--hero-rotate-x",
      `${rotateX}deg`
    );

    element.style.setProperty(
      "--hero-rotate-y",
      `${rotateY}deg`
    );

    element.style.setProperty(
      "--hero-mouse-x",
      `${x}px`
    );

    element.style.setProperty(
      "--hero-mouse-y",
      `${y}px`
    );
  };

  const handleMouseLeave = () => {
    const element =
      dashboardRef.current;

    if (!element) return;

    element.style.setProperty(
      "--hero-rotate-x",
      "0deg"
    );

    element.style.setProperty(
      "--hero-rotate-y",
      "0deg"
    );
  };

  return (
    <div
      className="
        relative
        mx-auto
        max-w-[1000px]
        [perspective:1600px]
      "
    >
      {/* ===================================================
          OUTER GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-10
          rounded-[50px]
          bg-indigo-500/[0.07]
          blur-[70px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[40%]
          w-[60%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.04]
          blur-[80px]
        "
      />

      {/* ===================================================
          DASHBOARD
      =================================================== */}

      <div
        ref={dashboardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          hero-dashboard
          group
          relative
          overflow-hidden
          rounded-[22px]
          border
          transition-transform
          duration-300
          ease-out

          [transform:
            perspective(1600px)
            rotateX(var(--hero-rotate-x,0deg))
            rotateY(var(--hero-rotate-y,0deg))
          ]

          hover:shadow-[0_45px_120px_rgba(0,0,0,.45)]
        "
      >
        {/* =================================================
            CURSOR LIGHT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          style={{
            background: `
              radial-gradient(
                420px circle
                at var(--hero-mouse-x,50%)
                var(--hero-mouse-y,50%),
                rgba(99,102,241,.12),
                transparent 65%
              )
            `,
          }}
        />

        {/* =================================================
            TOP HIGHLIGHT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            z-40
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-400/50
            to-transparent
          "
        />

        {/* =================================================
            WINDOW BAR
        ================================================= */}

        <div
          className={`
            relative
            z-20
            flex
            items-center
            gap-3
            border-b
            px-4
            py-3

            ${
              dark
                ? "border-white/[0.07] bg-[#0d1117]/90"
                : "border-black/[0.07] bg-white/90"
            }

            backdrop-blur-xl
          `}
        >
          {/* Traffic lights */}
          <div
            className="
              flex
              gap-1.5
            "
          >
            {[
              "#FF5F57",
              "#FFBD2E",
              "#28CA41",
            ].map((color) => (
              <span
                key={color}
                className="
                  block
                  h-2.5
                  w-2.5
                  rounded-full
                  shadow-sm
                "
                style={{
                  backgroundColor:
                    color,
                }}
              />
            ))}
          </div>

          {/* Address */}
          <div
            className={`
              mx-3
              flex-1
              rounded-lg
              px-3
              py-1.5
              text-center
              text-[10px]

              ${
                dark
                  ? "bg-white/[0.045] text-slate-500"
                  : "bg-black/[0.035] text-slate-400"
              }
            `}
          >
            My Real Customer App
            — Dashboard
          </div>

          {/* Live */}
          <div
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              text-emerald-400
            "
          >
            <span
              className="
                relative
                flex
                h-2
                w-2
              "
            >
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400/50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />
            </span>

            Live
          </div>
        </div>

        {/* =================================================
            DASHBOARD BODY
        ================================================= */}

        <div
          className={`
            relative
            flex

            ${
              dark
                ? "bg-[#0b0f15]"
                : "bg-white"
            }
          `}
        >
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div
            className={`
              hidden
              w-14
              flex-shrink-0
              flex-col
              items-center
              gap-2.5
              border-r
              py-4

              sm:flex

              ${
                dark
                  ? "border-white/[0.06] bg-white/[0.018]"
                  : "border-black/[0.05] bg-slate-50/60"
              }
            `}
          >
            {SIDEBAR_ICONS.map(
              (
                { Icon, active },
                i
              ) => (
                <div
                  key={i}
                  className={`
                    group/icon
                    relative
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          bg-indigo-500/15
                          text-indigo-400
                          shadow-[0_0_20px_rgba(99,102,241,.1)]
                        `
                        : dark
                          ? `
                            text-slate-600
                            hover:bg-white/[0.04]
                            hover:text-slate-400
                          `
                          : `
                            text-slate-400
                            hover:bg-black/[0.03]
                            hover:text-slate-600
                          `
                    }
                  `}
                >
                  <Icon
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover/icon:scale-110
                    "
                  />

                  {active && (
                    <span
                      className="
                        absolute
                        -right-[1px]
                        h-4
                        w-0.5
                        rounded-full
                        bg-indigo-400
                      "
                    />
                  )}
                </div>
              )
            )}
          </div>

          {/* =================================================
              MAIN
          ================================================= */}

          <div
            className="
              min-w-0
              flex-1
              p-3

              sm:p-4
            "
          >
            {/* =================================================
                MINI HEADER
            ================================================= */}

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
              "
            >
              <div>
                <div
                  className={`
                    text-[12px]
                    font-bold

                    ${
                      dark
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                >
                  Overview
                </div>

                <div
                  className={`
                    mt-0.5
                    text-[9px]

                    ${
                      dark
                        ? "text-slate-600"
                        : "text-slate-400"
                    }
                  `}
                >
                  Here's What's Happening
                  Today.
                </div>
              </div>

              <div
                className="
                  hidden
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-indigo-500/20
                  bg-indigo-500/[0.06]
                  px-2.5
                  py-1.5
                  text-[9px]
                  font-semibold
                  text-indigo-400

                  sm:flex
                "
              >
                <Activity size={10} />
                Live Analytics
              </div>
            </div>

            {/* =================================================
                KPI CARDS
            ================================================= */}

            <div
              className="
                mb-3
                grid
                grid-cols-2
                gap-2.5

                lg:grid-cols-4
              "
            >
              {KPIS.map((kpi) => (
                <div
                  key={kpi.label}
                  className={`
                    group/kpi
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    p-3
                    transition-all
                    duration-300
                    hover:-translate-y-0.5

                    ${
                      dark
                        ? `
                          border-white/[0.07]
                          bg-white/[0.035]
                          hover:border-white/[0.12]
                        `
                        : `
                          border-black/[0.06]
                          bg-slate-50
                          hover:border-indigo-100
                        `
                    }
                  `}
                >
                  {/* KPI glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-6
                      -top-6
                      h-16
                      w-16
                      rounded-full
                      opacity-0
                      blur-2xl
                      transition-opacity
                      duration-500
                      group-hover/kpi:opacity-100
                    "
                    style={{
                      backgroundColor:
                        kpi.color,
                    }}
                  />

                  <div
                    className={`
                      relative
                      mb-1
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-wide

                      ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {kpi.label}
                  </div>

                  <div
                    className={`
                      relative
                      font-display
                      text-lg
                      font-bold
                      leading-none

                      sm:text-xl

                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {kpi.val}
                  </div>

                  <div
                    className="
                      relative
                      mt-1.5
                      flex
                      items-center
                      gap-1
                      text-[9px]
                      font-semibold
                      text-emerald-400
                    "
                  >
                    <TrendingUp size={9} />

                    {kpi.chg}
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                CHARTS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-2.5

                sm:grid-cols-2
              "
            >
              {/* Revenue */}
              <div
                className={`
                  rounded-xl
                  border
                  p-3

                  ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.025]"
                      : "border-black/[0.05] bg-slate-50/70"
                  }
                `}
              >
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className={`
                      text-[10px]
                      font-semibold

                      ${
                        dark
                          ? "text-slate-300"
                          : "text-slate-700"
                      }
                    `}
                  >
                    Revenue Growth
                  </p>

                  <span
                    className="
                      text-[8px]
                      font-medium
                      text-emerald-400
                    "
                  >
                    +18.2%
                  </span>
                </div>

                <ResponsiveContainer
                  width="100%"
                  height={95}
                >
                  <AreaChart
                    data={chartData}
                  >
                    <defs>
                      <linearGradient
                        id="hero-rev-gradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={
                            dark
                              ? 0.38
                              : 0.25
                          }
                        />

                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 8,
                        fill: "#64748b",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          dark
                            ? "#111827"
                            : "#ffffff",
                        border:
                          dark
                            ? "1px solid rgba(255,255,255,.08)"
                            : "1px solid rgba(0,0,0,.08)",
                        borderRadius: 10,
                        fontSize: 10,
                        color: dark
                          ? "#fff"
                          : "#0f172a",
                      }}
                      formatter={(value) => [
                        `₦${Number(
                          value
                        ).toLocaleString()}`,
                        "Revenue",
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366F1"
                      fill="url(#hero-rev-gradient)"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1400}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Messages */}
              <div
                className={`
                  rounded-xl
                  border
                  p-3

                  ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.025]"
                      : "border-black/[0.05] bg-slate-50/70"
                  }
                `}
              >
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className={`
                      text-[10px]
                      font-semibold

                      ${
                        dark
                          ? "text-slate-300"
                          : "text-slate-700"
                      }
                    `}
                  >
                    Message Volume
                  </p>

                  <span
                    className="
                      text-[8px]
                      font-medium
                      text-cyan-400
                    "
                  >
                    +31.4%
                  </span>
                </div>

                <ResponsiveContainer
                  width="100%"
                  height={95}
                >
                  <BarChart
                    data={chartData}
                  >
                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 8,
                        fill: "#64748b",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          dark
                            ? "#111827"
                            : "#ffffff",
                        border:
                          dark
                            ? "1px solid rgba(255,255,255,.08)"
                            : "1px solid rgba(0,0,0,.08)",
                        borderRadius: 10,
                        fontSize: 10,
                      }}
                      formatter={(value) => [
                        Number(
                          value
                        ).toLocaleString(),
                        "Messages",
                      ]}
                    />

                    <Bar
                      dataKey="messages"
                      fill="#06B6D4"
                      radius={[
                        4,
                        4,
                        0,
                        0,
                      ]}
                      opacity={0.82}
                      animationDuration={1200}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            REFLECTION
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-40
            h-20
            bg-gradient-to-t
            from-white/[0.025]
            to-transparent
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const { dark } = useTheme();

  const {
    typed,
    currentTime,
  } = useTypewriter();

  return (
    <section
      id="hero"
      className={`
        relative
        isolate
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-4
        pb-16
        pt-24
        transition-colors
        duration-700

        sm:px-6

        lg:px-8

        ${
          dark
            ? "bg-[#06080f]"
            : "bg-slate-50"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(79,70,229,0.18)"
            : "rgba(79,70,229,0.09)"
        }
        size={600}
        style={{
          top: "-80px",
          left: "-150px",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(6,182,212,0.14)"
            : "rgba(6,182,212,0.07)"
        }
        size={500}
        style={{
          bottom: "-60px",
          right: "-100px",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(139,92,246,0.10)"
            : "rgba(139,92,246,0.05)"
        }
        size={350}
        style={{
          top: "40%",
          left: "45%",
        }}
      />

      {/* Grid */}
      <div
        className="
          grid-overlay
          pointer-events-none
          absolute
          inset-0
          opacity-60
        "
      />

      {/* =====================================================
          AMBIENT ORBS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[32%]
          h-1.5
          w-1.5
          animate-[heroParticle_8s_ease-in-out_infinite]
          rounded-full
          bg-indigo-400/60
          shadow-[0_0_20px_rgba(99,102,241,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[10%]
          top-[22%]
          h-1
          w-1
          animate-[heroParticle_10s_ease-in-out_infinite]
          rounded-full
          bg-cyan-400/60
          shadow-[0_0_20px_rgba(34,211,238,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[20%]
          left-[15%]
          h-1
          w-1
          animate-[heroParticle_7s_ease-in-out_infinite]
          rounded-full
          bg-violet-400/50
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1240px]
        "
      >
        {/* ===================================================
            HERO TEXT
        =================================================== */}

        <div
          className="
            mb-14
            text-center

            sm:mb-16
          "
        >
          {/* Live time */}
          <div
            className="
              mb-7
              flex
              flex-col
              items-center
              gap-3
            "
          >
            <div
              className={`
                group
                flex
                items-center
                gap-3
                rounded-full
                border
                px-6
                py-4
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-0.5

                ${
                  dark
                    ? `
                      border-white/[0.08]
                      bg-white/[0.035]
                      shadow-[0_8px_30px_rgba(0,0,0,.15)]
                    `
                    : `
                      border-black/[0.06]
                      bg-white/70
                      shadow-sm
                    `
                }
              `}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400/60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              <span
                className={`
                  font-mono
                  text-[13px]
                  font-bold
                  tracking-wide

                  ${
                    dark
                      ? "text-pink-500"
                      : "text-pink-700"
                  }
                `}
              >
                {currentTime ||
                  "Loading time..."}
              </span>
            </div>
          </div>

          {/* =================================================
              HEADLINE
          ================================================= */}

          <h1
            className={`
              mx-auto
              mb-6
              max-w-[1000px]
              font-display
              text-[clamp(38px,6.5vw,78px)]
              font-bold
              leading-[1.04]
              tracking-[-0.045em]

              ${
                dark
                  ? "text-slate-50"
                  : "text-slate-900"
              }
            `}
          >
            Automate Your{" "}
            <span className="gradient-text relative">
              {typed}

              <span
                className="
                  cursor-blink
                  text-indigo-500
                "
                style={{
                  WebkitTextFillColor:
                    "#6366f1",
                }}
              >
                |
              </span>
            </span>

            <br />

            <span
              className="
                relative
                inline-block
              "
            >
              From One Platform

              {/* subtle underline */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -bottom-2
                  left-1/2
                  h-px
                  w-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-indigo-500/50
                  to-transparent
                "
              />
            </span>
          </h1>

          {/* =================================================
              SUBTITLE
          ================================================= */}

          <p
            className={`
              mx-auto
              mb-10
              max-w-2xl
              text-[clamp(15px,1.8vw,19px)]
              leading-relaxed

              ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            Manage WhatsApp, Instagram,
            Facebook, TikTok, Bookkeeping,
            Inventory, Invoicing, CRM
            contacts, and Automation
            Workflows — All From One
            Centralized Dashboard.
          </p>

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className="
              mb-14
              flex
              flex-col
              items-center
              justify-center
              gap-3.5

              sm:flex-row
            "
          >
            <div
              className="
                group
                relative
              "
            >
              {/* CTA glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-3
                  rounded-2xl
                  bg-indigo-500/20
                  opacity-0
                  blur-xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <Button
                variant="primary"
                size="xl"
                onClick={() =>
                  document
                    .getElementById(
                      "pricing"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                <span>⚡</span>

                Get Started

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Button>
            </div>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-x-8
              gap-y-6

              sm:gap-x-14
            "
          >
            {stats.map(
              (stat, index) => (
                <div
                  key={stat.label}
                  className="
                    group
                    text-center
                  "
                >
                  <div
                    className={`
                      font-display
                      text-[clamp(24px,3.5vw,38px)]
                      font-bold
                      leading-none
                      tracking-tight
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1

                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {stat.value}
                  </div>

                  <div
                    className={`
                      mt-1.5
                      text-xs

                      ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {stat.label}
                  </div>

                  {index <
                    stats.length -
                      1 && (
                    <span />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <div
          className="
            animate-[heroFloat_7s_ease-in-out_infinite]
          "
        >
          <DashboardPreview
            dark={dark}
          />
        </div>
      </div>

      {/* =====================================================
          CSS ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes heroFloat {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(0, -8px, 0);
          }
        }

        @keyframes heroParticle {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -20px, 0)
              scale(1.4);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}