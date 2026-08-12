import { useRef } from "react";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import {
  SectionBadge,
  SectionTitle,
} from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { features } from "../data/features";

/* =========================================================
   3D FEATURE CARD
========================================================= */

function FeatureCard({
  icon: Icon,
  title,
  desc,
  color,
  dark,
  index,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -5;

    const rotateY =
      ((x - centerX) / centerX) * 6;

    card.style.setProperty(
      "--rotate-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--rotate-y",
      `${rotateY}deg`
    );

    card.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    card.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty(
      "--rotate-x",
      "0deg"
    );

    card.style.setProperty(
      "--rotate-y",
      "0deg"
    );

    card.style.setProperty(
      "--mouse-x",
      "50%"
    );

    card.style.setProperty(
      "--mouse-y",
      "50%"
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        feature-card
        group
        relative
        h-full
        overflow-hidden
        rounded-[24px]
        border
        p-5
        transition-all
        duration-500
        ease-out

        sm:p-6

        [transform:
          perspective(1200px)
          rotateX(var(--rotate-x,0deg))
          rotateY(var(--rotate-y,0deg))
        ]

        hover:-translate-y-1
      "
      style={{
        "--feature-color": color,
        "--feature-color-soft": `${color}18`,
      }}
    >
      {/* =====================================================
          GLASS BACKGROUND
      ===================================================== */}

      <div
        className={`
          absolute
          inset-0
          rounded-[24px]
          transition-all
          duration-500

          ${
            dark
              ? "bg-white/[0.035]"
              : "bg-white"
          }
        `}
      />

      {/* =====================================================
          CURSOR LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              280px circle
              at var(--mouse-x, 50%)
              var(--mouse-y, 50%),
              ${color}20,
              transparent 65%
            )
          `,
        }}
      />

      {/* =====================================================
          TOP GRADIENT LINE
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-20
          h-px
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent,
              ${color},
              transparent
            )
          `,
        }}
      />

      {/* =====================================================
          AMBIENT CARD GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          opacity-0
          blur-3xl
          transition-all
          duration-700
          group-hover:opacity-30
          group-hover:scale-125
        "
        style={{
          backgroundColor: color,
        }}
      />

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="relative z-20">
        {/* ===================================================
            ICON
        =================================================== */}

        <div
          className="
            relative
            mb-6
            h-12
            w-12
            transition-all
            duration-500

            group-hover:-translate-y-1
            group-hover:rotate-3
          "
        >
          {/* Icon glow */}
          <div
            className="
              absolute
              inset-0
              rounded-[15px]
              opacity-0
              blur-xl
              transition-opacity
              duration-500
              group-hover:opacity-70
            "
            style={{
              backgroundColor: color,
            }}
          />

          {/* Icon container */}
          <div
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[15px]
              border
              backdrop-blur-xl
              transition-all
              duration-500
              group-hover:scale-110
            "
            style={{
              backgroundColor: `${color}12`,
              borderColor: `${color}30`,
              boxShadow: `0 8px 30px ${color}12`,
            }}
          >
            <Icon
              size={22}
              color={color}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          </div>

          {/* Floating spark */}
          <Sparkles
            size={9}
            className="
              absolute
              -right-1
              -top-1
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
              group-hover:rotate-90
            "
            color={color}
          />
        </div>

        {/* ===================================================
            INDEX
        =================================================== */}

        <div
          className={`
            mb-2
            text-[9px]
            font-bold
            tracking-[0.2em]
            transition-colors
            duration-300

            ${
              dark
                ? "text-slate-600"
                : "text-slate-300"
            }

            group-hover:text-[var(--feature-color)]
          `}
        >
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </div>

        {/* ===================================================
            TITLE
        =================================================== */}

        <h3
          className={`
            mb-2
            text-[15px]
            font-semibold
            tracking-[-0.01em]
            transition-colors
            duration-300

            ${
              dark
                ? "text-slate-100"
                : "text-slate-900"
            }

            group-hover:text-[var(--feature-color)]
          `}
        >
          {title}
        </h3>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className={`
            text-[13.5px]
            leading-[1.75]

            ${
              dark
                ? "text-slate-500"
                : "text-slate-500"
            }
          `}
        >
          {desc}
        </p>

        {/* ===================================================
            BOTTOM INDICATOR
        =================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              h-px
              w-8
              transition-all
              duration-500
              group-hover:w-14
            "
            style={{
              background: `
                linear-gradient(
                  90deg,
                  ${color},
                  transparent
                )
              `,
            }}
          />

          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              opacity-0
              translate-x-2
              transition-all
              duration-500
              group-hover:translate-x-0
              group-hover:opacity-100
            "
            style={{
              borderColor: `${color}35`,
              backgroundColor: `${color}10`,
              color,
            }}
          >
            <ArrowUpRight
              size={13}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          DEPTH LAYER
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-20
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: `
            linear-gradient(
              to top,
              ${color}08,
              transparent
            )
          `,
        }}
      />

      {/* =====================================================
          BORDER GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[24px]
          border
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          borderColor: `${color}35`,
          boxShadow: `
            inset 0 0 30px ${color}06,
            0 0 30px ${color}05
          `,
        }}
      />
    </div>
  );
}

/* =========================================================
   FEATURES SECTION
========================================================= */

export default function Features() {
  const { dark } = useTheme();

  return (
    <section
      id="features"
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
            ? "bg-[#06080f]"
            : "bg-slate-50"
        }
      `}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(99,102,241,0.14)"
            : "rgba(99,102,241,0.06)"
        }
        size={550}
        style={{
          top: "5%",
          right: "-160px",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(34,211,238,0.055)"
            : "rgba(34,211,238,0.035)"
        }
        size={400}
        style={{
          bottom: "5%",
          left: "-160px",
        }}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-[20%]
          h-1.5
          w-1.5
          animate-[featureFloat_7s_ease-in-out_infinite]
          rounded-full
          bg-indigo-400/50
          shadow-[0_0_18px_rgba(99,102,241,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[28%]
          h-1
          w-1
          animate-[featureFloat_9s_ease-in-out_infinite]
          rounded-full
          bg-cyan-400/50
          shadow-[0_0_18px_rgba(34,211,238,.8)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          left-[12%]
          h-1
          w-1
          animate-[featureFloat_8s_ease-in-out_infinite]
          rounded-full
          bg-violet-400/50
          shadow-[0_0_18px_rgba(139,92,246,.8)]
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
          max-w-[1240px]
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
                Core Features
              </span>
            </SectionBadge>
          </div>

          <SectionTitle
            subtitle="
              Everything You Need to Run Business
              Communication, Inventory, And Finances —
              Unified In One Powerful Automated Platform.
            "
          >
            One Platform,{" "}
            <span className="gradient-text">
              Infinite Possibilities
            </span>
          </SectionTitle>
        </div>

        {/* ===================================================
            FEATURE GRID
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2

            lg:grid-cols-3

            xl:grid-cols-4
          "
        >
          {features.map(
            (feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                index={index}
                dark={dark}
              />
            )
          )}
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes featureFloat {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -18px, 0)
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