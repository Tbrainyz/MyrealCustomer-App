import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  DollarSign,
  BarChart2,
  Users,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Activity,
  Zap,
  ShoppingBag,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import {
  AreaChart,
  Area,
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

/* =========================================================
   DATA
========================================================= */

const KPIS = [
  {
    label: "Total Revenue",
    value: 52840,
    prefix: "₦",
    chg: "+18.2%",
    icon: DollarSign,
    color: "#6366F1",
  },
  {
    label: "Messages Sent",
    value: 16920,
    prefix: "",
    chg: "+31.4%",
    icon: MessageSquare,
    color: "#06B6D4",
  },
  {
    label: "Active Contacts",
    value: 4281,
    prefix: "",
    chg: "+8.7%",
    icon: Users,
    color: "#10B981",
  },
  {
    label: "Automations",
    value: 2847,
    prefix: "",
    chg: "+52.1%",
    icon: Zap,
    color: "#F59E0B",
  },
];

const SIDEBAR = [
  {
    Icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    Icon: MessageSquare,
    label: "Messages",
  },
  {
    Icon: Package,
    label: "Inventory",
  },
  {
    Icon: DollarSign,
    label: "Finance",
  },
  {
    Icon: BarChart2,
    label: "Analytics",
  },
  {
    Icon: Users,
    label: "Customers",
  },
];

const ACTIVITY = [
  {
    text: 'Campaign "Summer Sale" Sent to 4,200 Contacts',
    time: "2m ago",
    icon: MessageSquare,
    color: "#6366F1",
  },
  {
    text: "New Invoice #INV-0042 Created For ₦351,200",
    time: "8m ago",
    icon: DollarSign,
    color: "#10B981",
  },
  {
    text: "Stock Alert: iPhone 17 Pro — only 3 units left",
    time: "15m ago",
    icon: Package,
    color: "#F59E0B",
  },
  {
    text: "WhatsApp bot Handled 142 Conversations",
    time: "1h ago",
    icon: MessageSquare,
    color: "#06B6D4",
  },
];

const FLOATERS = [
  {
    x: "8%",
    y: "18%",
    size: 4,
    delay: "0s",
    duration: "7s",
  },
  {
    x: "18%",
    y: "72%",
    size: 3,
    delay: "-2s",
    duration: "9s",
  },
  {
    x: "86%",
    y: "22%",
    size: 3,
    delay: "-4s",
    duration: "8s",
  },
  {
    x: "92%",
    y: "68%",
    size: 5,
    delay: "-1s",
    duration: "10s",
  },
  {
    x: "73%",
    y: "10%",
    size: 2,
    delay: "-5s",
    duration: "6s",
  },
  {
    x: "38%",
    y: "88%",
    size: 3,
    delay: "-3s",
    duration: "8s",
  },
];

/* =========================================================
   REDUCED MOTION
========================================================= */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReduced(media.matches);
    };

    update();

    media.addEventListener?.("change", update);

    return () => {
      media.removeEventListener?.("change", update);
    };
  }, []);

  return reduced;
}

/* =========================================================
   3D TILT
========================================================= */

function useTilt(disabled = false) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || disabled) return;

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 4;

      element.style.setProperty(
        "--rx",
        `${rotateX}deg`
      );

      element.style.setProperty(
        "--ry",
        `${rotateY}deg`
      );

      element.style.setProperty(
        "--mx",
        `${x * 100}%`
      );

      element.style.setProperty(
        "--my",
        `${y * 100}%`
      );
    };

    const reset = () => {
      element.style.setProperty("--rx", "0deg");
      element.style.setProperty("--ry", "0deg");
      element.style.setProperty("--mx", "50%");
      element.style.setProperty("--my", "50%");
    };

    element.addEventListener(
      "pointermove",
      handleMove
    );

    element.addEventListener(
      "pointerleave",
      reset
    );

    return () => {
      element.removeEventListener(
        "pointermove",
        handleMove
      );

      element.removeEventListener(
        "pointerleave",
        reset
      );
    };
  }, [disabled]);

  return ref;
}

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({
  value,
  prefix = "",
  duration = 1100,
}) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame;

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplay(
        Math.round(value * eased)
      );

      if (progress < 1) {
        frame =
          requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [
    value,
    duration,
    reduced,
  ]);

  return `${prefix}${display.toLocaleString()}`;
}

/* =========================================================
   MINI SPARKLINE
========================================================= */

function MiniSparkline({ color }) {
  return (
    <svg
      viewBox="0 0 100 35"
      className="
        h-8
        w-20
        opacity-80
        transition-transform
        duration-500
        group-hover:scale-110
      "
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="
          M0 28
          C12 25, 15 20, 25 22
          S38 27, 48 17
          S62 14, 70 16
          S82 5, 100 3
        "
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="
          M0 28
          C12 25, 15 20, 25 22
          S38 27, 48 17
          S62 14, 70 16
          S82 5, 100 3
          L100 35
          L0 35
          Z
        "
        fill={color}
        opacity="0.08"
      />
    </svg>
  );
}

/* =========================================================
   GLASS CARD
========================================================= */

function GlassCard({
  children,
  className = "",
  dark,
  tilt = false,
}) {
  const reduced = useReducedMotion();

  const ref = useTilt(
    !tilt || reduced
  );

  return (
    <div
      ref={ref}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        backdrop-blur-xl
        transition-[transform,box-shadow,border-color]
        duration-500
        ease-out

        [transform:
          perspective(1200px)
          rotateX(var(--rx,0deg))
          rotateY(var(--ry,0deg))
        ]

        hover:shadow-2xl

        ${
          dark
            ? `
              border-white/[0.07]
              bg-white/[0.035]
              hover:border-indigo-400/20
              hover:shadow-indigo-950/30
            `
            : `
              border-slate-200/80
              bg-white/80
              hover:border-indigo-200
              hover:shadow-slate-300/50
            `
        }

        ${className}
      `}
    >
      {/* Cursor glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-px
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background:
            `
            radial-gradient(
              260px circle
              at var(--mx,50%)
              var(--my,50%),
              rgba(99,102,241,.13),
              transparent 65%
            )
            `,
        }}
      />

      <div className="relative">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function DashboardPreview() {
  const { dark } = useTheme();

  const reduced = useReducedMotion();

  const shellRef = useTilt(reduced);

  return (
    <section
      className={`
        relative
        isolate
        overflow-hidden
        px-4
        py-16
        transition-colors
        duration-700

        sm:px-6
        sm:py-20

        lg:px-8
        lg:py-28

        ${
          dark
            ? "bg-[#050816]"
            : "bg-[#f8fafc]"
        }
      `}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(99,102,241,0.16)"
            : "rgba(99,102,241,0.09)"
        }
        size={760}
        style={{
          top: "7%",
          left: "50%",
          transform:
            "translateX(-50%)",
        }}
      />

      {/* Cyan glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -left-28
          top-[42%]
          h-96
          w-96
          rounded-full
          blur-3xl

          ${
            dark
              ? "bg-cyan-500/[0.06]"
              : "bg-cyan-400/[0.08]"
          }
        `}
      />

      {/* Violet glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-32
          bottom-[5%]
          h-[30rem]
          w-[30rem]
          rounded-full
          blur-3xl

          ${
            dark
              ? "bg-violet-600/[0.07]"
              : "bg-violet-400/[0.07]"
          }
        `}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      {!reduced && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {FLOATERS.map(
            (particle, index) => (
              <span
                key={index}
                className={`
                  absolute
                  rounded-full

                  ${
                    dark
                      ? "bg-indigo-300/40"
                      : "bg-indigo-500/30"
                  }
                `}
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  animation:
                    `
                    dashboardFloat
                    ${particle.duration}
                    ease-in-out
                    ${particle.delay}
                    infinite
                    `,
                }}
              />
            )
          )}
        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
        "
      >
        {/* ===================================================
            HEADING
        =================================================== */}

        <div
          className="
            mb-10
            text-center

            sm:mb-14
          "
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-indigo-400/20
              bg-indigo-500/[0.06]
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-indigo-400
              shadow-sm
              backdrop-blur-md
            "
          >
            <Sparkles
              size={11}
              className="animate-pulse"
            />

            Live Dashboard
          </div>

          <SectionTitle
            subtitle="
              A Unified Command Center For Your
              Entire Business — Messaging,
              Finances, Inventory, and Analytics,
              All in Real Time.
            "
          >
            Your Business,{" "}
            <span className="gradient-text">
              At a Glance
            </span>
          </SectionTitle>
        </div>

        {/* ===================================================
            3D SHOWCASE
        =================================================== */}

        <div
          className="
            relative
            [perspective:1800px]
          "
        >
          {/* Outer glow */}
          <div
            className={`
              absolute
              -inset-5
              rounded-[36px]
              blur-3xl
              transition-opacity
              duration-700

              ${
                dark
                  ? "bg-indigo-600/[0.13]"
                  : "bg-indigo-400/[0.12]"
              }
            `}
          />

          {/* Dashboard */}
          <div
            ref={shellRef}
            className={`
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              shadow-2xl
              transition-[transform,box-shadow]
              duration-500
              ease-out

              [transform:
                perspective(1800px)
                rotateX(var(--rx,0deg))
                rotateY(var(--ry,0deg))
              ]

              ${
                dark
                  ? `
                    border-white/[0.11]
                    bg-[#0a0f1c]/95
                    shadow-black/60
                  `
                  : `
                    border-slate-200/90
                    bg-white/95
                    shadow-slate-300/50
                  `
              }
            `}
          >
            {/* =================================================
                INTERACTIVE SPOTLIGHT
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
              style={{
                background:
                  `
                  radial-gradient(
                    420px circle
                    at var(--mx,50%)
                    var(--my,50%),
                    rgba(99,102,241,.12),
                    transparent 65%
                  )
                  `,
              }}
            />

            {/* =================================================
                BROWSER HEADER
            ================================================= */}

            <div
              className={`
                relative
                z-30
                flex
                h-12
                items-center
                gap-3
                border-b
                px-4

                sm:h-14
                sm:px-5

                ${
                  dark
                    ? `
                      border-white/[0.07]
                      bg-white/[0.025]
                    `
                    : `
                      border-slate-200
                      bg-slate-50/90
                    `
                }
              `}
            >
              {/* Browser buttons */}
              <div className="flex gap-1.5">
                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#ff5f57]
                    shadow-sm

                    sm:h-3
                    sm:w-3
                  "
                />

                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#ffbd2e]
                    shadow-sm

                    sm:h-3
                    sm:w-3
                  "
                />

                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#28ca41]
                    shadow-sm

                    sm:h-3
                    sm:w-3
                  "
                />
              </div>

              {/* Address */}
              <div
                className={`
                  mx-auto
                  hidden
                  max-w-md
                  flex-1
                  items-center
                  justify-center
                  rounded-lg
                  px-4
                  py-1.5
                  text-[11px]
                  shadow-inner

                  sm:flex

                  ${
                    dark
                      ? `
                        bg-white/[0.04]
                        text-slate-500
                      `
                      : `
                        border
                        border-slate-200
                        bg-white
                        text-slate-400
                      `
                  }
                `}
              >
                My-Real-Customer-App/Dashboard
              </div>

              {/* Live status */}
              <div
                className="
                  ml-auto
                  flex
                  items-center
                  gap-2
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
                      bg-emerald-400
                      opacity-75
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
                  className="
                    text-[10px]
                    font-semibold
                    text-emerald-400

                    sm:text-[11px]
                  "
                >
                  Live
                </span>
              </div>
            </div>

            {/* =================================================
                DASHBOARD BODY
            ================================================= */}

            <div
              className="
                relative
                z-30
                flex
                min-h-[500px]
              "
            >
              {/* =================================================
                  SIDEBAR
              ================================================= */}

              <aside
                className={`
                  hidden
                  w-14
                  flex-col
                  items-center
                  border-r
                  py-5

                  sm:flex
                  lg:w-16

                  ${
                    dark
                      ? `
                        border-white/[0.06]
                        bg-[#080d19]
                      `
                      : `
                        border-slate-200
                        bg-slate-50/80
                      `
                  }
                `}
              >
                {/* Logo */}
                <div
                  className="
                    relative
                    mb-7
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-indigo-500
                    via-violet-600
                    to-cyan-500
                    shadow-lg
                    shadow-indigo-500/25
                  "
                >
                  <Activity
                    size={16}
                    className="text-white"
                  />

                  {!reduced && (
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-indigo-400/30
                        blur-md
                        animate-pulse
                      "
                    />
                  )}
                </div>

                {/* Navigation */}
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                  "
                >
                  {SIDEBAR.map(
                    ({
                      Icon,
                      label,
                      active,
                    }) => (
                      <div
                        key={label}
                        title={label}
                        className={`
                          group
                          relative
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          transition-all
                          duration-300
                          hover:scale-110

                          ${
                            active
                              ? `
                                bg-indigo-500
                                text-white
                                shadow-lg
                                shadow-indigo-500/30
                              `
                              : dark
                              ? `
                                text-slate-600
                                hover:bg-white/[0.05]
                                hover:text-slate-300
                              `
                              : `
                                text-slate-400
                                hover:bg-white
                                hover:text-slate-700
                              `
                          }
                        `}
                      >
                        <Icon size={16} />

                        {active && (
                          <span
                            className="
                              absolute
                              -right-[18px]
                              h-5
                              w-0.5
                              rounded-full
                              bg-indigo-400
                              shadow-[0_0_10px_rgba(99,102,241,.8)]
                            "
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </aside>

              {/* =================================================
                  MAIN DASHBOARD
              ================================================= */}

              <main
                className="
                  min-w-0
                  flex-1
                  p-3

                  sm:p-5
                  lg:p-6
                "
              >
                {/* =================================================
                    TOP BAR
                ================================================= */}

                <div
                  className="
                    mb-5
                    flex
                    flex-col
                    justify-between
                    gap-3

                    sm:flex-row
                    sm:items-center
                  "
                >
                  <div>
                    <p
                      className={`
                        mb-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]

                        ${
                          dark
                            ? "text-slate-600"
                            : "text-slate-400"
                        }
                      `}
                    >
                      Overview
                    </p>

                    <h3
                      className={`
                        text-lg
                        font-bold
                        tracking-tight

                        sm:text-xl

                        ${
                          dark
                            ? "text-white"
                            : "text-slate-900"
                        }
                      `}
                    >
                      Greetings 🫡,
                    </h3>
                  </div>

                  <button
                    className={`
                      self-start
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      px-3
                      py-2
                      text-[10px]
                      font-medium
                      transition-all
                      duration-300
                      hover:-translate-y-0.5

                      sm:self-auto

                      ${
                        dark
                          ? `
                            border-white/[0.07]
                            bg-white/[0.04]
                            text-slate-400
                            hover:bg-white/[0.07]
                            hover:text-slate-200
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-500
                            hover:border-indigo-200
                            hover:text-slate-700
                          `
                      }
                    `}
                  >
                    Last 30 days

                    <ChevronDown size={12} />
                  </button>
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

                    sm:gap-3

                    xl:grid-cols-4
                  "
                >
                  {KPIS.map(
                    (k, index) => {
                      const Icon = k.icon;

                      return (
                        <div
                          key={k.label}
                          className={`
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            p-3.5
                            transition-all
                            duration-500
                            hover:-translate-y-1

                            sm:p-4

                            ${
                              dark
                                ? `
                                  border-white/[0.07]
                                  bg-white/[0.035]
                                  hover:border-white/[0.12]
                                  hover:bg-white/[0.055]
                                  hover:shadow-xl
                                  hover:shadow-black/20
                                `
                                : `
                                  border-slate-200
                                  bg-white
                                  hover:border-indigo-100
                                  hover:shadow-xl
                                  hover:shadow-slate-200/60
                                `
                            }
                          `}
                          style={{
                            animationDelay:
                              `${index * 70}ms`,
                          }}
                        >
                          {/* Accent glow */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-10
                              -top-10
                              h-24
                              w-24
                              rounded-full
                              blur-2xl
                              opacity-20
                              transition-all
                              duration-500
                              group-hover:scale-150
                              group-hover:opacity-30
                            "
                            style={{
                              background:
                                k.color,
                            }}
                          />

                          {/* Bottom accent */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-x-0
                              bottom-0
                              h-px
                              opacity-0
                              transition-opacity
                              duration-500
                              group-hover:opacity-100
                            "
                            style={{
                              background:
                                `
                                linear-gradient(
                                  90deg,
                                  transparent,
                                  ${k.color},
                                  transparent
                                )
                                `,
                            }}
                          />

                          {/* Icon */}
                          <div
                            className="
                              relative
                              mb-4
                              flex
                              items-start
                              justify-between
                            "
                          >
                            <div
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-xl
                                transition-transform
                                duration-500
                                group-hover:rotate-6
                                group-hover:scale-110
                              "
                              style={{
                                background:
                                  `${k.color}18`,
                                color:
                                  k.color,
                              }}
                            >
                              <Icon size={15} />
                            </div>

                            <ArrowUpRight
                              size={14}
                              className={`
                                transition-transform
                                duration-500
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5

                                ${
                                  dark
                                    ? "text-slate-700"
                                    : "text-slate-300"
                                }
                              `}
                            />
                          </div>

                          {/* Label */}
                          <div
                            className={`
                              mb-1
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]

                              ${
                                dark
                                  ? "text-slate-500"
                                  : "text-slate-400"
                              }
                            `}
                          >
                            {k.label}
                          </div>

                          {/* Animated number */}
                          <div
                            className={`
                              text-lg
                              font-bold
                              tracking-tight

                              sm:text-xl

                              ${
                                dark
                                  ? "text-white"
                                  : "text-slate-900"
                              }
                            `}
                          >
                            <AnimatedNumber
                              value={k.value}
                              prefix={k.prefix}
                            />
                          </div>

                          {/* Change + sparkline */}
                          <div
                            className="
                              mt-2
                              flex
                              items-center
                              justify-between
                            "
                          >
                            <span
                              className="
                                flex
                                items-center
                                gap-1
                                text-[9px]
                                font-semibold
                                text-emerald-400
                              "
                            >
                              <TrendingUp size={9} />

                              {k.chg}
                            </span>

                            <MiniSparkline
                              color={k.color}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-3

                    lg:grid-cols-3
                  "
                >
                  {/* =================================================
                      REVENUE
                  ================================================= */}

                  <GlassCard
                    dark={dark}
                    tilt
                    className="lg:col-span-2"
                  >
                    <div className="p-4 sm:p-5">
                      {/* Header */}
                      <div
                        className="
                          mb-5
                          flex
                          items-start
                          justify-between
                        "
                      >
                        <div>
                          <div
                            className="
                              mb-1
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <p
                              className={`
                                text-[12px]
                                font-semibold

                                ${
                                  dark
                                    ? "text-slate-200"
                                    : "text-slate-800"
                                }
                              `}
                            >
                              Revenue Growth
                            </p>

                            <span
                              className="
                                rounded-md
                                bg-emerald-500/10
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-bold
                                text-emerald-400
                              "
                            >
                              +18.2%
                            </span>
                          </div>

                          <p
                            className={`
                              text-[9px]

                              ${
                                dark
                                  ? "text-slate-600"
                                  : "text-slate-400"
                              }
                            `}
                          >
                            Revenue Performance
                            Over Time
                          </p>
                        </div>

                        <button
                          aria-label="
                            More revenue options
                          "
                          className={`
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            transition-all
                            duration-300
                            hover:scale-110

                            ${
                              dark
                                ? `
                                  bg-white/[0.04]
                                  text-slate-500
                                  hover:bg-white/[0.08]
                                  hover:text-slate-300
                                `
                                : `
                                  bg-slate-50
                                  text-slate-400
                                  hover:bg-slate-100
                                `
                            }
                          `}
                        >
                          <MoreHorizontal
                            size={15}
                          />
                        </button>
                      </div>

                      {/* Chart */}
                      <div
                        className="
                          h-[150px]

                          sm:h-[175px]
                        "
                      >
                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                        >
                          <AreaChart
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 5,
                              left: -15,
                              bottom: 0,
                            }}
                          >
                            <defs>
                              {/* Gradient */}
                              <linearGradient
                                id="premiumRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#6366F1"
                                  stopOpacity={0.4}
                                />

                                <stop
                                  offset="55%"
                                  stopColor="#8B5CF6"
                                  stopOpacity={0.12}
                                />

                                <stop
                                  offset="100%"
                                  stopColor="#6366F1"
                                  stopOpacity={0}
                                />
                              </linearGradient>

                              {/* Glow */}
                              <filter
                                id="revenueGlow"
                              >
                                <feGaussianBlur
                                  stdDeviation="3"
                                  result="blur"
                                />

                                <feMerge>
                                  <feMergeNode
                                    in="blur"
                                  />

                                  <feMergeNode
                                    in="SourceGraphic"
                                  />
                                </feMerge>
                              </filter>
                            </defs>

                            {/* Grid */}
                            <CartesianGrid
                              vertical={false}
                              stroke={
                                dark
                                  ? "rgba(255,255,255,0.045)"
                                  : "rgba(15,23,42,0.05)"
                              }
                              strokeDasharray="4 5"
                            />

                            {/* X Axis */}
                            <XAxis
                              dataKey="month"
                              tick={{
                                fontSize: 9,
                                fill: "#64748b",
                              }}
                              axisLine={false}
                              tickLine={false}
                              dy={8}
                            />

                            {/* Y Axis */}
                            <YAxis
                              tick={{
                                fontSize: 9,
                                fill: "#64748b",
                              }}
                              axisLine={false}
                              tickLine={false}
                              tickFormatter={(v) =>
                                `₦${(
                                  v / 1000
                                ).toFixed(0)}k`
                              }
                            />

                            {/* Tooltip */}
                            <Tooltip
                              cursor={{
                                stroke:
                                  "#6366F1",
                                strokeDasharray:
                                  "4 4",
                              }}
                              contentStyle={{
                                background:
                                  dark
                                    ? "rgba(17,24,39,.94)"
                                    : "rgba(15,23,42,.96)",
                                border:
                                  "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 12,
                                fontSize: 11,
                                color: "#fff",
                                boxShadow:
                                  "0 15px 40px rgba(0,0,0,0.25)",
                                backdropFilter:
                                  "blur(12px)",
                              }}
                              formatter={(value) => [
                                `₦${Number(
                                  value
                                ).toLocaleString()}`,
                                "Revenue",
                              ]}
                            />

                            {/* Area */}
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stroke="#6366F1"
                              fill="url(#premiumRevenue)"
                              strokeWidth={2.5}
                              dot={false}
                              filter="url(#revenueGlow)"
                              animationDuration={
                                reduced
                                  ? 0
                                  : 1400
                              }
                              animationEasing="ease-out"
                              activeDot={{
                                r: 5,
                                fill: "#6366F1",
                                stroke:
                                  dark
                                    ? "#0a0f1c"
                                    : "#fff",
                                strokeWidth: 3,
                              }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </GlassCard>

                  {/* =================================================
                      ACTIVITY
                  ================================================= */}

                  <GlassCard
                    dark={dark}
                    tilt
                  >
                    <div className="p-4 sm:p-5">
                      {/* Header */}
                      <div
                        className="
                          mb-5
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div>
                          <p
                            className={`
                              text-[12px]
                              font-semibold

                              ${
                                dark
                                  ? "text-slate-200"
                                  : "text-slate-800"
                              }
                            `}
                          >
                            Recent Activity
                          </p>

                          <p
                            className={`
                              mt-1
                              text-[9px]

                              ${
                                dark
                                  ? "text-slate-600"
                                  : "text-slate-400"
                              }
                            `}
                          >
                            Latest Business
                            Events
                          </p>
                        </div>

                        <div
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-indigo-500/10
                            text-indigo-400
                            shadow-sm
                            shadow-indigo-500/10
                          "
                        >
                          <Activity
                            size={13}
                          />
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="relative">
                        <div
                          className={`
                            absolute
                            bottom-2
                            left-[15px]
                            top-2
                            w-px

                            ${
                              dark
                                ? "bg-white/[0.07]"
                                : "bg-slate-200"
                            }
                          `}
                        />

                        <div
                          className="
                            flex
                            flex-col
                            gap-4
                          "
                        >
                          {ACTIVITY.map(
                            (a, i) => {
                              const Icon =
                                a.icon;

                              return (
                                <div
                                  key={i}
                                  className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-3
                                    transition-transform
                                    duration-300
                                    hover:translate-x-1
                                  "
                                >
                                  {/* Activity icon */}
                                  <div
                                    className="
                                      relative
                                      z-10
                                      flex
                                      h-8
                                      w-8
                                      flex-shrink-0
                                      items-center
                                      justify-center
                                      rounded-xl
                                      border
                                      transition-transform
                                      duration-300
                                      group-hover:scale-110
                                    "
                                    style={{
                                      background:
                                        `${a.color}12`,
                                      borderColor:
                                        `${a.color}20`,
                                      color:
                                        a.color,
                                    }}
                                  >
                                    <Icon
                                      size={13}
                                    />
                                  </div>

                                  {/* Text */}
                                  <div
                                    className="
                                      min-w-0
                                      pt-0.5
                                    "
                                  >
                                    <p
                                      className={`
                                        text-[10px]
                                        leading-[1.45]

                                        ${
                                          dark
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                        }
                                      `}
                                    >
                                      {a.text}
                                    </p>

                                    <p
                                      className={`
                                        mt-1
                                        text-[9px]

                                        ${
                                          dark
                                            ? "text-slate-600"
                                            : "text-slate-400"
                                        }
                                      `}
                                    >
                                      {a.time}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* View all */}
                      <button
                        className={`
                          mt-5
                          w-full
                          rounded-lg
                          py-2
                          text-[9px]
                          font-semibold
                          transition-all
                          duration-300
                          hover:-translate-y-0.5

                          ${
                            dark
                              ? `
                                bg-white/[0.035]
                                text-slate-500
                                hover:bg-white/[0.06]
                                hover:text-slate-300
                              `
                              : `
                                bg-slate-50
                                text-slate-500
                                hover:bg-slate-100
                              `
                          }
                        `}
                      >
                        View All Activity
                      </button>
                    </div>
                  </GlassCard>
                </div>

                {/* =================================================
                    BOTTOM STATS
                ================================================= */}

                <div
                  className="
                    mt-3
                    grid
                    grid-cols-3
                    gap-3
                  "
                >
                  {[
                    {
                      icon: ShoppingBag,
                      label: "Orders",
                      value: "1,284",
                      change: "+12.5%",
                    },
                    {
                      icon: MessageSquare,
                      label: "Response Rate",
                      value: "94.8%",
                      change: "+4.2%",
                    },
                    {
                      icon: Users,
                      label: "New Customers",
                      value: "386",
                      change: "+21.8%",
                    },
                  ].map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`
                            group
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            p-3
                            transition-all
                            duration-300
                            hover:-translate-y-0.5

                            ${
                              dark
                                ? `
                                  border-white/[0.05]
                                  bg-white/[0.02]
                                  hover:border-white/[0.09]
                                  hover:bg-white/[0.035]
                                `
                                : `
                                  border-slate-200
                                  bg-slate-50/70
                                  hover:border-slate-300
                                  hover:bg-white
                                `
                            }
                          `}
                        >
                          {/* Icon */}
                          <div
                            className={`
                              hidden
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg

                              sm:flex

                              ${
                                dark
                                  ? `
                                    bg-white/[0.04]
                                    text-slate-500
                                  `
                                  : `
                                    bg-white
                                    text-slate-400
                                  `
                              }
                            `}
                          >
                            <Icon
                              size={14}
                            />
                          </div>

                          {/* Stats */}
                          <div className="min-w-0">
                            <p
                              className={`
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-wider

                                ${
                                  dark
                                    ? "text-slate-600"
                                    : "text-slate-400"
                                }
                              `}
                            >
                              {item.label}
                            </p>

                            <div
                              className="
                                mt-0.5
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <span
                                className={`
                                  text-[12px]
                                  font-bold

                                  ${
                                    dark
                                      ? "text-slate-200"
                                      : "text-slate-800"
                                  }
                                `}
                              >
                                {item.value}
                              </span>

                              <span
                                className="
                                  text-[8px]
                                  font-semibold
                                  text-emerald-400
                                "
                              >
                                {item.change}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </main>
            </div>
          </div>

          {/* =====================================================
              DEPTH REFLECTION
          ===================================================== */}

          <div
            className={`
              pointer-events-none
              absolute
              -bottom-10
              left-1/2
              h-20
              w-3/4
              -translate-x-1/2
              rounded-full
              blur-3xl

              ${
                dark
                  ? "bg-indigo-500/10"
                  : "bg-indigo-400/15"
              }
            `}
          />
        </div>
      </div>

      {/* =======================================================
          ANIMATIONS
      ======================================================= */}

      <style>{`
        @keyframes dashboardFloat {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);

            opacity: 0.35;
          }

          50% {
            transform:
              translate3d(0, -18px, 0)
              scale(1.25);

            opacity: 0.85;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}