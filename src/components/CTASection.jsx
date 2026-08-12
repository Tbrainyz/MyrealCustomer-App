
import { useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { GradientBlur } from "./ui/GradientBlur";
import { Button } from "./ui/Button";

const TRUST_ITEMS = [
  {
    icon: Check,
    text: "No Complicated Setup",
  },
  {
    icon: Clock3,
    text: "Automate in Minutes",
  },
  {
    icon: BarChart3,
    text: "Built to Scale",
  },
];

const PARTICLES = [
  { x: "8%", y: "18%", delay: "0s", size: 4 },
  { x: "18%", y: "72%", delay: "1s", size: 3 },
  { x: "31%", y: "12%", delay: "2s", size: 5 },
  { x: "48%", y: "78%", delay: "0.5s", size: 3 },
  { x: "62%", y: "17%", delay: "1.5s", size: 4 },
  { x: "78%", y: "68%", delay: "2.5s", size: 3 },
  { x: "91%", y: "25%", delay: "0.8s", size: 4 },
];

export default function CTASection() {
  const { dark } = useTheme();

  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const scrollToPricing = () => {
    document
      .getElementById("pricing")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 7,
      y: (x - 0.5) * 9,
    });
  };

  const resetTilt = () => {
    setTilt({
      x: 0,
      y: 0,
    });
  };

  return (
    <section
      id="cta"
      className={`
        relative overflow-hidden
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8 lg:py-28
        transition-colors duration-500
        ${
          dark
            ? "bg-[#050713]"
            : "bg-slate-50"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(79,70,229,0.18)"
            : "rgba(79,70,229,0.055)"
        }
        size={650}
        style={{
          top: "0",
          left: "-260px",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(6,182,212,0.13)"
            : "rgba(6,182,212,0.045)"
        }
        size={550}
        style={{
          bottom: "-180px",
          right: "-200px",
        }}
      />

      {/* =====================================================
          BACKGROUND PARTICLES
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className={`
              absolute
              animate-pulse
              rounded-full
              transition-colors
              duration-500
              ${
                dark
                  ? "bg-cyan-300"
                  : "bg-indigo-400/40"
              }
            `}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              boxShadow: dark
                ? "0 0 15px rgba(34,211,238,0.8)"
                : "0 0 12px rgba(99,102,241,0.25)",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1240px]">

        {/* =====================================================
            3D CTA CARD
        ====================================================== */}

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          className={`
            group
            relative
            overflow-hidden
            rounded-[32px]
            border
            transition-all
            duration-500
            ease-out

            ${
              dark
                ? `
                  border-indigo-400/25
                  bg-[#090d20]
                  shadow-[0_40px_120px_rgba(0,0,0,0.5),0_0_90px_rgba(79,70,229,0.15)]
                `
                : `
                  border-slate-200/80
                  bg-white
                  shadow-[0_35px_100px_rgba(15,23,42,0.12),0_0_70px_rgba(79,70,229,0.06)]
                `
            }
          `}
          style={{
            transform: `
              perspective(1600px)
              rotateX(${tilt.x}deg)
              rotateY(${tilt.y}deg)
            `,
            transformStyle: "preserve-3d",
          }}
        >

          {/* =================================================
              PREMIUM GRID
          ================================================== */}

          <div
            className={`
              pointer-events-none
              absolute
              inset-0
              transition-opacity
              duration-500
              ${
                dark
                  ? "opacity-[0.07]"
                  : "opacity-[0.045]"
              }
            `}
            style={{
              backgroundImage: `
                linear-gradient(
                  ${dark
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(15,23,42,0.15)"
                  } 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  ${dark
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(15,23,42,0.15)"
                  } 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "44px 44px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />

          {/* =================================================
              LIGHT MODE AMBIENT BLOBS
          ================================================== */}

          {!dark && (
            <>
              <div
                className="
                  pointer-events-none
                  absolute
                  -left-32
                  -top-32
                  h-96
                  w-96
                  rounded-full
                  bg-indigo-400/10
                  blur-[100px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-40
                  -right-20
                  h-[450px]
                  w-[450px]
                  rounded-full
                  bg-cyan-400/10
                  blur-[110px]
                "
              />
            </>
          )}

          {/* =================================================
              DARK MODE AMBIENT BLOBS
          ================================================== */}

          {dark && (
            <>
              <div
                className="
                  pointer-events-none
                  absolute
                  -left-32
                  -top-32
                  h-96
                  w-96
                  rounded-full
                  bg-indigo-600/20
                  blur-[100px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-40
                  -right-20
                  h-[450px]
                  w-[450px]
                  rounded-full
                  bg-cyan-500/10
                  blur-[110px]
                "
              />
            </>
          )}

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-20
              grid
              items-center
              gap-12
              px-6
              py-12
              sm:px-10
              sm:py-16
              lg:grid-cols-[1.05fr_0.95fr]
              lg:gap-4
              lg:px-16
              lg:py-20
              xl:px-20
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-30
                max-w-[650px]
              "
              style={{
                transform: "translateZ(50px)",
              }}
            >

              {/* Badge */}

              <div
                className={`
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  transition-all
                  duration-500

                  ${
                    dark
                      ? `
                        border-indigo-400/25
                        bg-indigo-400/10
                        text-indigo-300
                        shadow-[0_0_30px_rgba(99,102,241,0.12)]
                      `
                      : `
                        border-indigo-200
                        bg-indigo-50
                        text-indigo-600
                        shadow-[0_8px_30px_rgba(99,102,241,0.08)]
                      `
                  }
                `}
              >
                <Sparkles
                  size={13}
                  className={
                    dark
                      ? "text-indigo-300"
                      : "text-indigo-500"
                  }
                />

                Start Scaling Today
              </div>

              {/* Heading */}

              <h2
                className={`
                  font-display
                  font-bold
                  leading-[1.02]
                  tracking-tight
                  transition-colors
                  duration-500
                  ${
                    dark
                      ? "text-white"
                      : "text-slate-950"
                  }
                `}
                style={{
                  fontSize:
                    "clamp(34px,5vw,64px)",
                }}
              >
                Scale Your Business With{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-fuchsia-500
                    via-indigo-500
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Intelligent Automation
                </span>
              </h2>

              {/* Description */}

              <p
                className={`
                  mt-6
                  max-w-xl
                  text-[15px]
                  leading-relaxed
                  transition-colors
                  duration-500
                  sm:text-[17px]
                  ${
                    dark
                      ? "text-white/55"
                      : "text-slate-500"
                  }
                `}
              >
                Join 100+ Businesses Using My Real
                Customer App to Automate Communication,
                Inventory, and Financial Operations —
                all From One Intelligent Platform.
              </p>

              {/* Trust chips */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-2.5
                "
              >
                {TRUST_ITEMS.map(
                  ({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3.5
                        py-2
                        backdrop-blur-md
                        transition-all
                        duration-500

                        ${
                          dark
                            ? `
                              border-white/10
                              bg-white/[0.045]
                            `
                            : `
                              border-slate-200
                              bg-slate-50/80
                            `
                        }
                      `}
                    >
                      <Icon
                        size={13}
                        className={
                          dark
                            ? "text-cyan-400"
                            : "text-indigo-500"
                        }
                      />

                      <span
                        className={`
                          text-[11px]
                          font-medium
                          ${
                            dark
                              ? "text-white/55"
                              : "text-slate-500"
                          }
                        `}
                      >
                        {text}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* CTA */}

              <div className="mt-9">
                <Button
                  variant="cta"
                  size="xl"
                  onClick={scrollToPricing}
                  className="
                    group/button
                    relative
                    w-full
                    overflow-hidden
                    shadow-[0_15px_50px_rgba(79,70,229,0.25)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_60px_rgba(79,70,229,0.35)]
                    sm:w-auto
                  "
                >
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-full
                      w-1/2
                      skew-x-[-20deg]
                      bg-white/20
                      transition-all
                      duration-700
                      group-hover/button:left-[120%]
                    "
                  />

                  <Zap
                    size={17}
                    className="relative"
                  />

                  <span className="relative">
                    Get Started Now
                  </span>

                  <ArrowRight
                    size={18}
                    className="
                      relative
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                  />
                </Button>
              </div>
            </div>

            {/* =================================================
                RIGHT 3D SCENE
            ================================================== */}

            <div
              className="
                relative
                flex
                min-h-[390px]
                items-center
                justify-center
                lg:min-h-[470px]
              "
              style={{
                transform: "translateZ(80px)",
                transformStyle: "preserve-3d",
              }}
            >

              {/* =================================================
                  HOLOGRAPHIC RINGS
              ================================================== */}

              <div
                className={`
                  absolute
                  h-[280px]
                  w-[280px]
                  animate-[spin_18s_linear_infinite]
                  rounded-full
                  border
                  transition-all
                  duration-500
                  sm:h-[350px]
                  sm:w-[350px]
                  ${
                    dark
                      ? "border-cyan-400/25"
                      : "border-indigo-400/20"
                  }
                `}
                style={{
                  transform:
                    "rotateX(70deg) rotateZ(15deg)",
                  boxShadow: dark
                    ? "0 0 35px rgba(6,182,212,0.08)"
                    : "0 0 35px rgba(79,70,229,0.06)",
                }}
              />

              <div
                className={`
                  absolute
                  h-[230px]
                  w-[230px]
                  animate-[spinReverse_12s_linear_infinite]
                  rounded-full
                  border
                  transition-all
                  duration-500
                  sm:h-[290px]
                  sm:w-[290px]
                  ${
                    dark
                      ? "border-indigo-400/30"
                      : "border-cyan-400/20"
                  }
                `}
                style={{
                  transform:
                    "rotateX(70deg) rotateZ(-25deg)",
                }}
              />

              {/* =================================================
                  FLOATING ICONS
              ================================================== */}

              <FloatingIcon
                dark={dark}
                className="
                  left-[5%]
                  top-[18%]
                "
                color="emerald"
                delay="0s"
              >
                <MessageCircle size={21} />
              </FloatingIcon>

              <FloatingIcon
                dark={dark}
                className="
                  right-[5%]
                  top-[25%]
                "
                color="indigo"
                delay="1.2s"
              >
                <Mail size={20} />
              </FloatingIcon>

              <FloatingIcon
                dark={dark}
                className="
                  left-[12%]
                  bottom-[25%]
                "
                color="cyan"
                delay="2s"
              >
                <BarChart3 size={21} />
              </FloatingIcon>

              {/* =================================================
                  GROWTH CARD
              ================================================== */}

              <div
                className={`
                  absolute
                  right-[2%]
                  top-[10%]
                  z-30
                  rounded-2xl
                  border
                  px-4
                  py-3
                  backdrop-blur-xl
                  animate-[float_4s_ease-in-out_infinite]
                  transition-all
                  duration-500
                  sm:right-[4%]

                  ${
                    dark
                      ? `
                        border-indigo-400/25
                        bg-slate-950/80
                        shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                      `
                      : `
                        border-indigo-100
                        bg-white/90
                        shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                      `
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        dark
                          ? "bg-emerald-400/10"
                          : "bg-emerald-50"
                      }
                    `}
                  >
                    <TrendingUp
                      size={17}
                      className="text-emerald-500"
                    />
                  </div>

                  <div>
                    <p
                      className={`
                        text-[10px]
                        ${
                          dark
                            ? "text-white/40"
                            : "text-slate-400"
                        }
                      `}
                    >
                      Growth
                    </p>

                    <p
                      className={`
                        text-sm
                        font-bold
                        ${
                          dark
                            ? "text-white"
                            : "text-slate-900"
                        }
                      `}
                    >
                      +127%
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  3D DASHBOARD
              ================================================== */}

              <div
                className={`
                  relative
                  z-20
                  w-[245px]
                  rotate-[-7deg]
                  rounded-[24px]
                  border
                  p-3
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  sm:w-[310px]

                  ${
                    dark
                      ? `
                        border-white/15
                        bg-slate-950/90
                        shadow-[0_35px_80px_rgba(0,0,0,0.6)]
                      `
                      : `
                        border-slate-200
                        bg-white/95
                        shadow-[0_35px_80px_rgba(15,23,42,0.18)]
                      `
                  }
                `}
                style={{
                  transform:
                    "perspective(1000px) rotateY(-12deg) rotateX(5deg) rotateZ(-5deg)",
                }}
              >

                {/* Dashboard glow */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -inset-3
                    -z-10
                    rounded-[30px]
                    blur-2xl
                    ${
                      dark
                        ? "bg-indigo-500/20"
                        : "bg-indigo-400/10"
                    }
                  `}
                />

                {/* Dashboard header */}

                <div
                  className={`
                    mb-3
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-3
                    py-2
                    ${
                      dark
                        ? `
                          border-white/5
                          bg-white/[0.035]
                        `
                        : `
                          border-slate-100
                          bg-slate-50
                        `
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_10px_rgba(52,211,153,0.8)]
                      "
                    />

                    <span
                      className={`
                        text-[9px]
                        font-semibold
                        ${
                          dark
                            ? "text-white/60"
                            : "text-slate-600"
                        }
                      `}
                    >
                      Analytics
                    </span>
                  </div>

                  <span className="text-[8px] text-emerald-500">
                    LIVE
                  </span>
                </div>

                {/* Revenue */}

                <div
                  className={`
                    mb-3
                    rounded-xl
                    border
                    p-3
                    ${
                      dark
                        ? `
                          border-white/5
                          bg-white/[0.035]
                        `
                        : `
                          border-slate-100
                          bg-slate-50
                        `
                    }
                  `}
                >
                  <div className="flex justify-between">
                    <div>
                      <p
                        className={`
                          text-[8px]
                          ${
                            dark
                              ? "text-white/35"
                              : "text-slate-400"
                          }
                        `}
                      >
                        Revenue
                      </p>

                      <p
                        className={`
                          mt-1
                          text-lg
                          font-bold
                          ${
                            dark
                              ? "text-white"
                              : "text-slate-900"
                          }
                        `}
                      >
                        $93.8K
                      </p>
                    </div>

                    <TrendingUp
                      size={15}
                      className="text-emerald-500"
                    />
                  </div>

                  {/* Mini chart */}

                  <div className="mt-4 flex h-16 items-end gap-1">
                    {[28, 38, 34, 48, 42, 58, 52, 72, 65, 88].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="
                            flex-1
                            rounded-t
                            bg-gradient-to-t
                            from-indigo-600
                            to-cyan-400
                            opacity-80
                          "
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Metrics */}

                <div className="grid grid-cols-2 gap-2">
                  <MetricCard
                    dark={dark}
                    label="Messages"
                    value="48.2K"
                    change="+18%"
                  />

                  <MetricCard
                    dark={dark}
                    label="Conversion"
                    value="32.8%"
                    change="+9%"
                  />
                </div>

                {/* Chat */}

                <div
                  className={`
                    absolute
                    -bottom-5
                    -right-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    backdrop-blur-xl
                    ${
                      dark
                        ? `
                          border-cyan-300/30
                          bg-cyan-400/15
                          text-cyan-300
                          shadow-[0_0_30px_rgba(6,182,212,0.25)]
                        `
                        : `
                          border-cyan-200
                          bg-cyan-50
                          text-cyan-600
                          shadow-[0_0_30px_rgba(6,182,212,0.15)]
                        `
                    }
                  `}
                >
                  <MessageCircle size={21} />
                </div>
              </div>

              {/* =================================================
                  3D BASE
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[7%]
                  h-5
                  w-[270px]
                  rounded-[50%]
                  bg-gradient-to-r
                  from-fuchsia-500/60
                  via-cyan-400
                  to-indigo-500/60
                  blur-[2px]
                  shadow-[0_0_50px_rgba(6,182,212,0.35)]
                  sm:w-[350px]
                "
              />

              <div
                className={`
                  absolute
                  bottom-[6%]
                  h-10
                  w-[240px]
                  rounded-[50%]
                  border
                  transition-colors
                  duration-500
                  sm:w-[320px]
                  ${
                    dark
                      ? "border-cyan-400/30 bg-cyan-400/5"
                      : "border-indigo-300/30 bg-indigo-400/5"
                  }
                `}
              />
            </div>
          </div>

          {/* =====================================================
              TRUST BAR
          ====================================================== */}

          <div
            className={`
              relative
              z-20
              mx-6
              border-t
              px-2
              py-6
              transition-colors
              duration-500
              sm:mx-10
              lg:mx-16
              xl:mx-20
              ${
                dark
                  ? "border-white/10"
                  : "border-slate-200"
              }
            `}
          >
            <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-3 sm:divide-x sm:divide-slate-200/20">

              {/* Users */}

              <div>
                <p
                  className={`
                    text-xl
                    font-bold
                    ${
                      dark
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                >
                  +100
                </p>

                <p
                  className={`
                    mt-1
                    text-[10px]
                    ${
                      dark
                        ? "text-white/35"
                        : "text-slate-400"
                    }
                  `}
                >
                  Businesses Scaling With Us
                </p>
              </div>

              {/* Rating */}

              <div>
                <div className="flex justify-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Sparkles
                        key={star}
                        size={11}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

                <p
                  className={`
                    mt-2
                    text-[10px]
                    ${
                      dark
                        ? "text-white/35"
                        : "text-slate-400"
                    }
                  `}
                >
                  Trusted by Growing Teams
                </p>
              </div>

              {/* Uptime */}

              <div>
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-cyan-500"
                  />

                  <p
                    className={`
                      text-xl
                      font-bold
                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    99.9%
                  </p>
                </div>

                <p
                  className={`
                    mt-1
                    text-[10px]
                    ${
                      dark
                        ? "text-white/35"
                        : "text-slate-400"
                    }
                  `}
                >
                  Uptime & Reliability
                </p>
              </div>

            </div>
          </div>

          {/* =====================================================
              NEON BOTTOM LINE
          ====================================================== */}

          <div
            className={`
              absolute
              bottom-0
              left-1/2
              h-px
              w-[75%]
              -translate-x-1/2
              transition-all
              duration-500
              ${
                dark
                  ? `
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400
                    to-transparent
                    opacity-70
                    shadow-[0_0_15px_rgba(34,211,238,0.8)]
                  `
                  : `
                    bg-gradient-to-r
                    from-transparent
                    via-indigo-400
                    to-transparent
                    opacity-40
                  `
              }
            `}
          />
        </div>
      </div>

      {/* =====================================================
          COMPONENT ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes spin {
          from {
            transform:
              rotateX(70deg)
              rotateZ(0deg);
          }

          to {
            transform:
              rotateX(70deg)
              rotateZ(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform:
              rotateX(70deg)
              rotateZ(360deg);
          }

          to {
            transform:
              rotateX(70deg)
              rotateZ(0deg);
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   FLOATING ICON
========================================================= */

function FloatingIcon({
  children,
  className = "",
  color = "cyan",
  delay = "0s",
  dark,
}) {
  const colors = {
    cyan: {
      dark:
        "border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_35px_rgba(6,182,212,0.25)]",
      light:
        "border-cyan-200 bg-cyan-50 text-cyan-600 shadow-[0_0_35px_rgba(6,182,212,0.12)]",
    },

    indigo: {
      dark:
        "border-indigo-400/25 bg-indigo-400/10 text-indigo-300 shadow-[0_0_35px_rgba(99,102,241,0.25)]",
      light:
        "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-[0_0_35px_rgba(99,102,241,0.12)]",
    },

    emerald: {
      dark:
        "border-emerald-400/25 bg-emerald-400/10 text-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.25)]",
      light:
        "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_0_35px_rgba(52,211,153,0.12)]",
    },
  };

  const theme = dark
    ? colors[color].dark
    : colors[color].light;

  return (
    <div
      className={`
        absolute
        z-30
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        backdrop-blur-xl
        animate-[float_4s_ease-in-out_infinite]
        transition-all
        duration-500
        ${theme}
        ${className}
      `}
      style={{
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  label,
  value,
  change,
  dark,
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        p-3
        transition-all
        duration-500
        ${
          dark
            ? `
              border-white/5
              bg-white/[0.035]
            `
            : `
              border-slate-100
              bg-slate-50
            `
        }
      `}
    >
      <p
        className={`
          text-[8px]
          ${
            dark
              ? "text-white/30"
              : "text-slate-400"
          }
        `}
      >
        {label}
      </p>

      <div className="mt-1 flex items-end justify-between">
        <p
          className={`
            text-sm
            font-bold
            ${
              dark
                ? "text-white"
                : "text-slate-900"
            }
          `}
        >
          {value}
        </p>

        <span className="text-[8px] font-semibold text-emerald-500">
          {change}
        </span>
      </div>
    </div>
  );
}

