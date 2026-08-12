import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import {
  SectionBadge,
  SectionTitle,
} from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { platforms } from "../data/features";

/* =========================================================
   PLATFORM CARD
========================================================= */

function PlatformCard({
  icon: Icon,
  name,
  glow,
  dark,
  index,
}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* -------------------------------------------------------
     3D MOUSE TILT
  ------------------------------------------------------- */

  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y - rect.height / 2) /
        (rect.height / 2)) *
      -7;

    const rotateY =
      ((x - rect.width / 2) /
        (rect.width / 2)) *
      7;

    card.style.setProperty(
      "--platform-x",
      `${x}px`
    );

    card.style.setProperty(
      "--platform-y",
      `${y}px`
    );

    card.style.setProperty(
      "--platform-rotate-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--platform-rotate-y",
      `${rotateY}deg`
    );
  };

  const resetTilt = () => {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty(
      "--platform-rotate-x",
      "0deg"
    );

    card.style.setProperty(
      "--platform-rotate-y",
      "0deg"
    );
  };

  return (
    <div
      className="
        relative
        [perspective:1200px]
      "
    >
      {/* =================================================
          OUTER GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-5
          rounded-[30px]
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
        "
        style={{
          background: glow,
          opacity: hovered
            ? 0.08
            : 0,
        }}
      />

      {/* =================================================
          CARD
      ================================================= */}

      <div
        ref={cardRef}
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() => {
          setHovered(false);
          resetTilt();
        }}
        onMouseMove={handleMouseMove}
        className={`
          platform-card
          group
          relative
          min-h-[170px]
          overflow-hidden
          rounded-[22px]
          border
          p-5
          text-center
          transition-all
          duration-300
          ease-out

          [transform:
            perspective(1200px)
            rotateX(var(--platform-rotate-x,0deg))
            rotateY(var(--platform-rotate-y,0deg))
            translateY(${hovered ? "-7px" : "0px"})
          ]

          ${
            dark
              ? `
                border-white/[0.08]
                bg-white/[0.035]
                shadow-[0_12px_35px_rgba(0,0,0,.15)]
              `
              : `
                border-black/[0.065]
                bg-white
                shadow-[0_12px_35px_rgba(15,23,42,.05)]
              `
          }
        `}
        style={{
          animationDelay: `${index * 80}ms`,
          boxShadow: hovered
            ? `
              0 25px 60px rgba(0,0,0,${
                dark ? "0.35" : "0.10"
              }),
              0 0 35px ${glow}25
            `
            : undefined,
        }}
      >
        {/* =================================================
            MOUSE FOLLOWING LIGHT
        ================================================= */}

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
                180px circle
                at var(--platform-x,50%)
                var(--platform-y,50%),
                ${glow}12,
                transparent 70%
              )
            `,
          }}
        />

        {/* =================================================
            TOP LIGHT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            h-px
            opacity-30
            transition-opacity
            duration-500
            group-hover:opacity-80
          "
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent,
                ${glow},
                transparent
              )
            `,
          }}
        />

        {/* =================================================
            FLOATING PARTICLE
        ================================================= */}

        <span
          className="
            pointer-events-none
            absolute
            right-4
            top-4
            h-1
            w-1
            rounded-full
            opacity-20
            transition-all
            duration-500
            group-hover:scale-[2]
            group-hover:opacity-80
          "
          style={{
            background: glow,
            boxShadow: `0 0 10px ${glow}`,
          }}
        />

        {/* =================================================
            PLATFORM ICON
        ================================================= */}

        <div className="relative z-10 flex justify-center">
          <div
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border-2
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:rotate-3
            "
            style={{
              background: `${glow}12`,
              borderColor: hovered
                ? `${glow}65`
                : `${glow}25`,
              boxShadow: hovered
                ? `
                  0 0 30px ${glow}45,
                  inset 0 0 20px ${glow}10
                `
                : `0 0 15px ${glow}15`,
            }}
          >
            {/* Orbital ring */}

            <span
              className="
                pointer-events-none
                absolute
                -inset-2
                rounded-full
                border
                border-dashed
                opacity-0
                transition-all
                duration-700
                group-hover:rotate-180
                group-hover:opacity-50
              "
              style={{
                borderColor: `${glow}45`,
              }}
            />

            <Icon
              size={27}
              color={glow}
              strokeWidth={1.8}
              className="
                relative
                z-10
                transition-all
                duration-500
                group-hover:scale-110
              "
            />
          </div>
        </div>

        {/* =================================================
            NAME
        ================================================= */}

        <p
          className={`
            relative
            z-10
            mt-5
            text-[13px]
            font-bold
            tracking-tight
            transition-all
            duration-300

            ${
              hovered
                ? dark
                  ? "text-white"
                  : "text-slate-900"
                : dark
                  ? "text-slate-400"
                  : "text-slate-500"
            }
          `}
        >
          {name}
        </p>

        {/* =================================================
            ACTIVE LINE
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            mt-3
            h-[2px]
            rounded-full
            transition-all
            duration-500
          "
          style={{
            width: hovered
              ? "42px"
              : "22px",
            background: glow,
            opacity: hovered
              ? 1
              : 0.35,
            boxShadow: hovered
              ? `0 0 12px ${glow}`
              : "none",
          }}
        />

        {/* =================================================
            HOVER ARROW
        ================================================= */}

        <div
          className="
            absolute
            bottom-4
            right-4
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-0.5
            group-hover:opacity-100
          "
          style={{
            color: glow,
            borderColor: `${glow}30`,
            background: `${glow}08`,
          }}
        >
          <ArrowUpRight size={11} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function MessagingPlatforms() {
  const { dark } = useTheme();

  return (
    <section
      id="platforms"
      className={`
        relative
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
          BACKGROUND GLOW
      ===================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(236,72,153,0.08)"
            : "rgba(236,72,153,0.04)"
        }
        size={450}
        style={{
          top: "50%",
          right: "-100px",
          transform:
            "translateY(-50%)",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(99,102,241,0.06)"
            : "rgba(99,102,241,0.035)"
        }
        size={350}
        style={{
          top: "5%",
          left: "-120px",
        }}
      />

      {/* =====================================================
          BACKGROUND ORB
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-pink-500/[0.025]
          blur-[100px]
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
          flex
          max-w-[1240px]
          flex-col
          items-center
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">
          <SectionBadge>
            Integrations
          </SectionBadge>
        </div>

        <SectionTitle
          subtitle="
            Connect Every Channel Your Customers Use
            And Manage Everything From One Centralized,
            Intelligent Inbox.
          "
        >
          All Your Channels,{" "}
          <span className="gradient-text">
            One Inbox
          </span>
        </SectionTitle>

        {/* =================================================
            PLATFORM GRID
        ================================================= */}

        <div
          className="
            grid
            w-full
            grid-cols-2
            gap-3

            sm:grid-cols-3
            sm:gap-4

            lg:grid-cols-6
            lg:gap-5
          "
        >
          {platforms.map(
            (platform, index) => (
              <PlatformCard
                key={index}
                {...platform}
                dark={dark}
                index={index}
              />
            )
          )}
        </div>

        {/* =================================================
            CONNECTION STATUS
        ================================================= */}

        <div
          className={`
            mt-8
            flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]

            ${
              dark
                ? `
                  border-white/[0.07]
                  bg-white/[0.025]
                  text-slate-500
                `
                : `
                  border-black/[0.06]
                  bg-white
                  text-slate-400
                  shadow-sm
                `
            }
          `}
        >
          <span
            className="
              relative
              flex
              h-1.5
              w-1.5
            "
          >
            <span
              className="
                absolute
                inset-0
                animate-ping
                rounded-full
                bg-emerald-400/50
              "
            />

            <span
              className="
                relative
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />
          </span>

          <Zap
            size={10}
            className="text-indigo-400"
          />

          All Systems Connected
        </div>
      </div>

      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .platform-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}