import { useRef, useState } from "react";
import {
  Zap,
  Send,
  Mail,
  Globe,
  MessageSquare,
  Shield,
  ArrowUpRight,
  Sparkles,
  Check,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

/* =========================================================
   FOOTER DATA
========================================================= */

const FOOTER_COLS = [
  {
    title: "Product",
    links: ["Features", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Security",
    ],
  },
];

const SOCIALS = [
  {
    Icon: Mail,
    label: "Email",
    color: "#6366f1",
  },
  {
    Icon: Globe,
    label: "Website",
    color: "#06b6d4",
  },
  {
    Icon: MessageSquare,
    label: "Discord",
    color: "#8b5cf6",
  },
  {
    Icon: Shield,
    label: "Security",
    color: "#10b981",
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const { dark } = useTheme();

  const [email, setEmail] =
    useState("");

  const [subscribed, setSubscribed] =
    useState(false);

  const brandRef = useRef(null);

  /* =======================================================
     BRAND 3D EFFECT
  ======================================================= */

  const handleBrandMove = (e) => {
    const el = brandRef.current;
    if (!el) return;

    const rect =
      el.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y - rect.height / 2) /
        (rect.height / 2)) *
      -8;

    const rotateY =
      ((x - rect.width / 2) /
        (rect.width / 2)) *
      10;

    el.style.setProperty(
      "--brand-x",
      `${rotateX}deg`
    );

    el.style.setProperty(
      "--brand-y",
      `${rotateY}deg`
    );
  };

  const handleBrandLeave = () => {
    const el = brandRef.current;
    if (!el) return;

    el.style.setProperty(
      "--brand-x",
      "0deg"
    );

    el.style.setProperty(
      "--brand-y",
      "0deg"
    );
  };

  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      className={`
        relative
        isolate
        overflow-hidden
        border-t
        transition-colors
        duration-700

        ${
          dark
            ? "bg-[#06080f] border-white/[0.06]"
            : "bg-white border-black/[0.07]"
        }
      `}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[400px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-indigo-500/[0.055]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-80
          w-80
          rounded-full
          bg-cyan-500/[0.035]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/3
          h-96
          w-96
          rounded-full
          bg-violet-500/[0.035]
          blur-[110px]
        "
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[30%]
          h-1.5
          w-1.5
          animate-[footerFloat_8s_ease-in-out_infinite]
          rounded-full
          bg-indigo-400/50
          shadow-[0_0_18px_rgba(99,102,241,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[20%]
          h-1
          w-1
          animate-[footerFloat_10s_ease-in-out_infinite]
          rounded-full
          bg-cyan-400/50
          shadow-[0_0_18px_rgba(34,211,238,.8)]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1240px]
          px-4
          pb-8
          pt-12

          sm:px-6
          sm:pb-10
          sm:pt-16

          lg:px-8
        "
      >
        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            mb-12

            sm:grid-cols-2
            sm:gap-8

            lg:grid-cols-5
            lg:gap-10
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div
            className="
              sm:col-span-2
            "
          >
            <div
              ref={brandRef}
              onMouseMove={handleBrandMove}
              onMouseLeave={handleBrandLeave}
              className="
                inline-block
                [transform:
                  perspective(800px)
                  rotateX(var(--brand-x,0deg))
                  rotateY(var(--brand-y,0deg))
                ]
                transition-transform
                duration-300
              "
            >
              <a
                href="#hero"
                className="
                  group
                  relative
                  flex
                  w-fit
                  items-center
                  gap-3
                "
              >
                {/* Logo glow */}
                <div
                  className="
                    absolute
                    -inset-3
                    rounded-2xl
                    bg-indigo-500/10
                    opacity-0
                    blur-xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Logo */}
                <div
                  className="
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[13px]
                    bg-gradient-to-br
                    from-indigo-600
                    via-violet-600
                    to-cyan-500
                    shadow-xl
                    shadow-indigo-500/25
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-3
                  "
                >
                  <Zap
                    size={18}
                    className="text-white"
                    fill="currentColor"
                  />

                  {/* Logo shine */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[13px]
                      bg-gradient-to-br
                      from-white/20
                      to-transparent
                    "
                  />
                </div>

                <span
                  className={`
                    relative
                    font-display
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
                  My Real Customer App
                </span>
              </a>
            </div>

            {/* Description */}
            <p
              className={`
                mt-5
                max-w-[330px]
                text-sm
                leading-[1.8]

                ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              A Platform That
              Unifies Messaging, Inventory,
              And Financial Operations For
              Modern Businesses.
            </p>

            {/* =================================================
                NEWSLETTER CARD
            ================================================= */}

            <div
              className={`
                group
                relative
                mt-7
                max-w-[400px]
                overflow-hidden
                rounded-2xl
                border
                p-4
                backdrop-blur-xl
                transition-all
                duration-500

                ${
                  dark
                    ? `
                      border-white/[0.07]
                      bg-white/[0.025]
                      hover:border-indigo-400/20
                    `
                    : `
                      border-slate-200
                      bg-slate-50/70
                      hover:border-indigo-200
                    `
                }
              `}
            >
              {/* Newsletter glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-indigo-500/10
                  blur-3xl
                  transition-transform
                  duration-700
                  group-hover:scale-150
                "
              />

              <div className="relative">
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Sparkles
                    size={13}
                    className="text-indigo-400"
                  />

                  <span
                    className={`
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.15em]

                      ${
                        dark
                          ? "text-slate-300"
                          : "text-slate-700"
                      }
                    `}
                  >
                    Stay Updated
                  </span>
                </div>

                {subscribed ? (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      py-2
                      text-sm
                      font-semibold
                      text-emerald-400
                    "
                  >
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-500/10
                        border
                        border-emerald-500/20
                      "
                    >
                      <Check size={13} />
                    </div>

                    You're subscribed!
                  </div>
                ) : (
                  <form
                    onSubmit={
                      handleSubscribe
                    }
                    className="
                      flex
                      gap-2
                    "
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="your@email.com"
                      className={`
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        px-3.5
                        py-2.5
                        text-sm
                        outline-none
                        transition-all
                        duration-300

                        focus:ring-2
                        focus:ring-indigo-500/10

                        ${
                          dark
                            ? `
                              border-white/[0.08]
                              bg-white/[0.04]
                              text-white
                              placeholder:text-slate-600
                              focus:border-indigo-500/60
                            `
                            : `
                              border-slate-200
                              bg-white
                              text-slate-900
                              placeholder:text-slate-400
                              focus:border-indigo-400
                            `
                        }
                      `}
                    />

                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="
                        group/send
                        flex
                        h-10
                        w-10
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-violet-600
                        text-white
                        shadow-lg
                        shadow-indigo-500/20
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:scale-105
                        hover:shadow-xl
                        hover:shadow-indigo-500/30
                        active:translate-y-0
                      "
                    >
                      <Send
                        size={14}
                        className="
                          transition-transform
                          duration-300
                          group-hover/send:translate-x-0.5
                          group-hover/send:-translate-y-0.5
                        "
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              LINK COLUMNS
          ================================================= */}

          {FOOTER_COLS.map(
            (column, columnIndex) => (
              <div
                key={column.title}
                className="
                  relative
                "
              >
                <h4
                  className={`
                    mb-5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]

                    ${
                      dark
                        ? "text-slate-300"
                        : "text-slate-800"
                    }
                  `}
                >
                  {column.title}
                </h4>

                <ul
                  className="
                    flex
                    flex-col
                    gap-3
                  "
                >
                  {column.links.map(
                    (link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className={`
                            group/link
                            flex
                            w-fit
                            items-center
                            gap-1.5
                            text-sm
                            transition-all
                            duration-300

                            ${
                              dark
                                ? `
                                  text-slate-500
                                  hover:text-indigo-400
                                `
                                : `
                                  text-slate-500
                                  hover:text-indigo-600
                                `
                            }
                          `}
                        >
                          <span>
                            {link}
                          </span>

                          <ArrowUpRight
                            size={11}
                            className="
                              -translate-x-1
                              opacity-0
                              transition-all
                              duration-300
                              group-hover/link:translate-x-0
                              group-hover/link:opacity-100
                            "
                          />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
          )}
        </div>

        {/* ===================================================
            DIVIDER
        =================================================== */}

        <div
          className={`
            relative
            h-px
            w-full

            ${
              dark
                ? "bg-white/[0.06]"
                : "bg-black/[0.06]"
            }
          `}
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              h-px
              w-24
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-indigo-500/50
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            BOTTOM BAR
        =================================================== */}

        <div
          className="
            flex
            flex-col
            items-start
            justify-between
            gap-5
            pt-6

            sm:flex-row
            sm:items-center
          "
        >
          <p
            className={`
              text-[11px]

              ${
                dark
                  ? "text-slate-600"
                  : "text-slate-400"
              }
            `}
          >
            ©{" "}
            {new Date().getFullYear()}{" "}
            My Real Customer App, Inc.
            All rights reserved.
          </p>

          {/* =================================================
              SOCIALS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {SOCIALS.map(
              ({
                Icon,
                label,
                color,
              }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`
                    social-button
                    group/social
                    relative
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border
                    transition-all
                    duration-400

                    ${
                      dark
                        ? `
                          border-white/[0.08]
                          bg-white/[0.025]
                          text-slate-500
                          hover:bg-white/[0.06]
                        `
                        : `
                          border-slate-200
                          bg-slate-50
                          text-slate-400
                          hover:bg-white
                        `
                    }
                  `}
                  style={{
                    "--social-color":
                      color,
                  }}
                >
                  {/* Glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover/social:opacity-100
                    "
                    style={{
                      background: `
                        radial-gradient(
                          circle at center,
                          ${color}20,
                          transparent 70%
                        )
                      `,
                    }}
                  />

                  <Icon
                    size={14}
                    className="
                      relative
                      z-10
                      transition-all
                      duration-300
                      group-hover/social:scale-110
                    "
                    style={{
                      color:
                        "currentColor",
                    }}
                  />

                  {/* Bottom accent */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-px
                      w-0
                      -translate-x-1/2
                      transition-all
                      duration-300
                      group-hover/social:w-5
                    "
                    style={{
                      backgroundColor:
                        color,
                    }}
                  />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes footerFloat {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -16px, 0)
              scale(1.3);
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
    </footer>
  );
}