import { useRef, useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import {
  SectionBadge,
  SectionTitle,
} from "./ui/SectionTitle";
import { faqData } from "../data/pricing";

/* =========================================================
   3D TILT HOOK
========================================================= */

function useTilt() {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 7;

    el.style.setProperty(
      "--rotate-x",
      `${rotateX}deg`
    );

    el.style.setProperty(
      "--rotate-y",
      `${rotateY}deg`
    );

    el.style.setProperty(
      "--mouse-x",
      `${x * 100}%`
    );

    el.style.setProperty(
      "--mouse-y",
      `${y * 100}%`
    );
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty(
      "--rotate-x",
      "0deg"
    );

    el.style.setProperty(
      "--rotate-y",
      "0deg"
    );

    el.style.setProperty(
      "--mouse-x",
      "50%"
    );

    el.style.setProperty(
      "--mouse-y",
      "50%"
    );
  };

  return {
    ref,
    handleMove,
    handleLeave,
  };
}

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  q,
  a,
  dark,
  open,
  onToggle,
  index,
}) {
  const {
    ref,
    handleMove,
    handleLeave,
  } = useTilt();

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        transition-all
        duration-500
        ease-out

        [transform:
          perspective(1200px)
          rotateX(var(--rotate-x,0deg))
          rotateY(var(--rotate-y,0deg))
        ]

        ${
          open
            ? dark
              ? `
                border-indigo-400/30
                bg-white/[0.055]
                shadow-[0_25px_80px_rgba(79,70,229,0.14)]
              `
              : `
                border-indigo-200
                bg-white
                shadow-[0_25px_70px_rgba(99,102,241,0.12)]
              `
            : dark
            ? `
              border-white/[0.07]
              bg-white/[0.025]
              hover:border-indigo-400/20
              hover:bg-white/[0.04]
              hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
            `
            : `
              border-slate-200
              bg-white
              hover:border-indigo-100
              hover:shadow-[0_25px_70px_rgba(15,23,42,0.10)]
            `
        }
      `}
    >
      {/* =====================================================
          MOUSE LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              350px circle
              at var(--mouse-x, 50%)
              var(--mouse-y, 50%),
              rgba(99,102,241,0.16),
              transparent 65%
            )
          `,
        }}
      />

      {/* =====================================================
          PREMIUM TOP LIGHT
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-indigo-400
          to-transparent
          transition-opacity
          duration-500

          ${
            open
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-50"
          }
        `}
      />

      {/* =====================================================
          QUESTION
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="
          relative
          z-10
          flex
          w-full
          items-center
          gap-4
          px-5
          py-5
          text-left

          sm:px-6
          sm:py-6
        "
      >
        {/* Number */}
        <div
          className={`
            relative
            hidden
            h-9
            w-9
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            border
            text-[9px]
            font-bold
            transition-all
            duration-500

            sm:flex

            ${
              open
                ? `
                  border-indigo-400/30
                  bg-gradient-to-br
                  from-indigo-500/15
                  to-violet-500/10
                  text-indigo-400
                  shadow-[0_0_25px_rgba(99,102,241,.15)]
                `
                : dark
                ? `
                  border-white/[0.08]
                  bg-white/[0.025]
                  text-slate-600
                `
                : `
                  border-slate-200
                  bg-slate-50
                  text-slate-400
                `
            }
          `}
        >
          <span className="relative z-10">
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>

          {open && (
            <span
              className="
                absolute
                inset-0
                animate-pulse
                rounded-xl
                bg-indigo-500/10
              "
            />
          )}
        </div>

        {/* Question */}
        <span
          className={`
            flex-1
            text-sm
            font-semibold
            leading-relaxed
            transition-all
            duration-300

            sm:text-[15px]

            ${
              open
                ? dark
                  ? "text-white"
                  : "text-slate-950"
                : dark
                ? "text-slate-200"
                : "text-slate-800"
            }
          `}
        >
          {q}
        </span>

        {/* Chevron container */}
        <div
          className={`
            flex
            h-9
            w-9
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-500

            ${
              open
                ? `
                  rotate-180
                  border-indigo-400/40
                  bg-indigo-500/10
                  text-indigo-400
                  shadow-[0_0_25px_rgba(99,102,241,.15)]
                `
                : dark
                ? `
                  border-white/[0.10]
                  bg-white/[0.02]
                  text-slate-500
                  group-hover:border-indigo-400/20
                  group-hover:text-indigo-300
                `
                : `
                  border-slate-200
                  bg-slate-50
                  text-slate-400
                  group-hover:border-indigo-200
                  group-hover:text-indigo-500
                `
            }
          `}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      {/* =====================================================
          ANSWER
      ===================================================== */}

      <div
        className={`
          relative
          z-10
          grid
          transition-[grid-template-rows]
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]

          ${
            open
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="
              px-5
              pb-6

              sm:px-6
              sm:pb-7
              sm:pl-[84px]
            "
          >
            {/* Divider */}
            <div
              className={`
                mb-5
                h-px
                w-full

                ${
                  dark
                    ? "bg-white/[0.06]"
                    : "bg-slate-100"
                }
              `}
            />

            <div className="flex gap-3">
              {/* Gradient indicator */}
              <div
                className="
                  mt-1.5
                  h-5
                  w-1
                  flex-shrink-0
                  rounded-full
                  bg-gradient-to-b
                  from-indigo-500
                  via-violet-500
                  to-cyan-400
                  shadow-[0_0_15px_rgba(99,102,241,.45)]
                "
              />

              <p
                className={`
                  text-[13.5px]
                  leading-[1.8]

                  sm:text-sm

                  ${
                    dark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                {a}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTIVE SIDE LIGHT
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          bottom-4
          left-0
          top-4
          w-[2px]
          rounded-full
          bg-gradient-to-b
          from-indigo-400
          via-violet-500
          to-cyan-400
          shadow-[0_0_15px_rgba(99,102,241,.6)]
          transition-all
          duration-500

          ${
            open
              ? "translate-x-0 opacity-100"
              : "-translate-x-3 opacity-0"
          }
        `}
      />
    </div>
  );
}

/* =========================================================
   FAQ
========================================================= */

export default function FAQ() {
  const { dark } = useTheme();

  const [openIdx, setOpenIdx] =
    useState(null);

  const toggle = (index) => {
    setOpenIdx((current) =>
      current === index
        ? null
        : index
    );
  };

  return (
    <section
      id="faq"
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
            ? "bg-[#080c18]"
            : "bg-[#f8fafc]"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-180px]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-indigo-500/[0.07]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-[35%]
          h-96
          w-96
          rounded-full
          bg-cyan-500/[0.04]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[10%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-violet-500/[0.05]
          blur-[120px]
        "
      />

      {/* =====================================================
          FLOATING 3D ORBS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[25%]
          h-2
          w-2
          animate-[floatOrb_7s_ease-in-out_infinite]
          rounded-full
          bg-indigo-400/50
          shadow-[0_0_20px_rgba(99,102,241,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[10%]
          top-[18%]
          h-1.5
          w-1.5
          animate-[floatOrb_9s_ease-in-out_infinite]
          rounded-full
          bg-cyan-400/50
          shadow-[0_0_20px_rgba(34,211,238,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[20%]
          left-[15%]
          h-1.5
          w-1.5
          animate-[floatOrb_8s_ease-in-out_infinite]
          rounded-full
          bg-violet-400/50
          shadow-[0_0_20px_rgba(139,92,246,.8)]
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
          max-w-[850px]
        "
      >
        {/* Header */}
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
              flex
              justify-center
            "
          >
            <SectionBadge>
              <span className="flex items-center gap-2">
                <Sparkles size={11} />
                FAQ
              </span>
            </SectionBadge>
          </div>

          <SectionTitle
            subtitle="
              Have questions? We have answers.
              Can't find what you're looking for?
              Chat with us live.
            "
          >
            Frequently Asked{" "}
            <span className="gradient-text">
              Questions
            </span>
          </SectionTitle>
        </div>

        {/* ===================================================
            FAQ LIST
        =================================================== */}

        <div
          className="
            relative
            flex
            flex-col
            gap-4
          "
        >
          {/* Vertical light beam */}
          <div
            className={`
              pointer-events-none
              absolute
              bottom-8
              left-1/2
              top-8
              hidden
              w-px
              -translate-x-1/2
              opacity-30

              lg:block

              ${
                dark
                  ? "bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
                  : "bg-gradient-to-b from-transparent via-indigo-300/40 to-transparent"
              }
            `}
          />

          {faqData.map(
            (item, index) => (
              <FAQItem
                key={index}
                {...item}
                index={index}
                dark={dark}
                open={
                  openIdx === index
                }
                onToggle={() =>
                  toggle(index)
                }
              />
            )
          )}
        </div>

        {/* ===================================================
            PREMIUM CTA
        =================================================== */}

        <div
          className={`
            group
            relative
            mt-12
            overflow-hidden
            rounded-[24px]
            border
            p-6
            text-center
            backdrop-blur-xl
            transition-all
            duration-500

            hover:-translate-y-1

            sm:p-8

            ${
              dark
                ? `
                  border-white/[0.08]
                  bg-white/[0.025]
                  hover:border-indigo-400/20
                `
                : `
                  border-slate-200
                  bg-white/80
                  hover:border-indigo-200
                `
            }
          `}
        >
          {/* CTA gradient */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-indigo-500/[0.06]
              via-transparent
              to-violet-500/[0.06]
            "
          />

          {/* CTA glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-32
              w-72
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-indigo-500/10
              blur-3xl
              transition-transform
              duration-700
              group-hover:scale-150
            "
          />

          <div className="relative">
            {/* Icon */}
            <div
              className="
                mx-auto
                mb-4
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                via-violet-500
                to-cyan-500
                text-white
                shadow-xl
                shadow-indigo-500/20
                transition-transform
                duration-500
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              <MessageCircle
                size={19}
              />
            </div>

            <h3
              className={`
                text-base
                font-bold

                ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              Still have questions?
            </h3>

            <p
              className={`
                mx-auto
                mt-1
                max-w-md
                text-xs
                leading-relaxed

                ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Our team is ready to help you
              find the right solution for
              your business.
            </p>

            <button
              type="button"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-indigo-500
                via-violet-500
                to-indigo-600
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-indigo-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-indigo-500/30
                active:translate-y-0
              "
            >
              <Sparkles size={13} />

              Chat With Us

              <ArrowUpRight
                size={13}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes floatOrb {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -20px, 0)
              scale(1.35);
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