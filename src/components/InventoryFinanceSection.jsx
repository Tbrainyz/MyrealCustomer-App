import { useRef } from "react";
import {
  Boxes,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Activity,
  Sparkles,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { SectionBadge } from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import {
  inventoryItems,
  financeCards,
} from "../data/features";

/* =========================================================
   STATUS STYLES
========================================================= */

const STATUS_STYLES = {
  green: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
    dot: "bg-emerald-400",
  },

  amber: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/15",
    dot: "bg-amber-400",
  },

  red: {
    badge: "bg-red-500/10 text-red-400 border-red-500/15",
    dot: "bg-red-400",
  },
};

/* =========================================================
   CHANGE ICON
========================================================= */

function ChangeIcon({ type }) {
  if (type === "down") {
    return <ArrowDownRight size={12} />;
  }

  if (type === "warn") {
    return <AlertTriangle size={11} />;
  }

  return <ArrowUpRight size={12} />;
}

/* =========================================================
   FINANCE CARD
========================================================= */

function FinanceCard({
  card,
  dark,
  index,
}) {
  const changeClass = {
    up: "text-emerald-400",
    down: "text-red-400",
    warn: "text-amber-400",
  };

  return (
    <div
      className={`
        finance-card
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        p-4
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]

        ${
          dark
            ? `
              border-white/[0.08]
              bg-white/[0.035]
              hover:border-white/[0.14]
            `
            : `
              border-black/[0.07]
              bg-white
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
              hover:border-indigo-200
            `
        }
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* =================================================
          CARD GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-28
          w-28
          rounded-full
          opacity-0
          blur-3xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: card.color,
        }}
      />

      {/* =================================================
          TOP LINE
      ================================================= */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          opacity-40
        "
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${card.color},
            transparent
          )`,
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className={`
              mb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.14em]

              ${
                dark
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            {card.label}
          </p>

          <p
            className="
              font-display
              text-2xl
              font-bold
              leading-none
              tracking-tight
            "
            style={{
              color: card.color,
            }}
          >
            {card.value}
          </p>
        </div>

        {/* Icon bubble */}
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            border
            transition-transform
            duration-500
            group-hover:rotate-6
            group-hover:scale-110
          "
          style={{
            background: `${card.color}12`,
            borderColor: `${card.color}25`,
          }}
        >
          <Activity
            size={14}
            style={{
              color: card.color,
            }}
          />
        </div>
      </div>

      {/* =================================================
          CHANGE
      ================================================= */}

      <div
        className={`
          relative
          z-10
          mt-3
          flex
          items-center
          gap-1
          text-[11px]
          font-semibold

          ${changeClass[card.changeType]}
        `}
      >
        <ChangeIcon
          type={card.changeType}
        />

        {card.change}
      </div>
    </div>
  );
}

/* =========================================================
   INVENTORY ROW
========================================================= */

function InventoryRow({
  item,
  index,
  dark,
}) {
  const status =
    STATUS_STYLES[
      item.statusColor
    ] || STATUS_STYLES.green;

  return (
    <tr
      className={`
        inventory-row
        group
        border-b
        last:border-b-0
        transition-all
        duration-300

        ${
          dark
            ? `
              border-white/[0.045]
              hover:bg-white/[0.035]
            `
            : `
              border-black/[0.045]
              hover:bg-slate-50/80
            `
        }
      `}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* PRODUCT */}

      <td
        className="
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* Product icon */}

          <div
            className={`
              hidden
              h-8
              w-8
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              border

              sm:flex

              ${
                dark
                  ? `
                    border-white/[0.07]
                    bg-white/[0.04]
                    text-slate-500
                  `
                  : `
                    border-black/[0.06]
                    bg-slate-50
                    text-slate-400
                  `
              }
            `}
          >
            <Boxes size={14} />
          </div>

          <div>
            <div
              className={`
                text-[13px]
                font-semibold
                transition-colors
                duration-200

                ${
                  dark
                    ? `
                      text-slate-200
                      group-hover:text-white
                    `
                    : `
                      text-slate-800
                      group-hover:text-indigo-600
                    `
                }
              `}
            >
              {item.name}
            </div>

            {/* Mobile SKU */}

            <div
              className={`
                mt-0.5
                text-[9px]
                font-mono

                sm:hidden

                ${
                  dark
                    ? "text-slate-600"
                    : "text-slate-400"
                }
              `}
            >
              {item.sku}
            </div>
          </div>
        </div>
      </td>

      {/* SKU */}

      <td
        className={`
          hidden
          px-4
          py-4
          text-[11px]
          font-mono

          sm:table-cell

          ${
            dark
              ? "text-slate-500"
              : "text-slate-400"
          }
        `}
      >
        {item.sku}
      </td>

      {/* STOCK */}

      <td
        className={`
          px-4
          py-4
          text-[13px]
          font-bold

          ${
            dark
              ? "text-slate-200"
              : "text-slate-800"
          }
        `}
      >
        {item.stock}
      </td>

      {/* STATUS */}

      <td
        className="
          px-4
          py-4
        "
      >
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            whitespace-nowrap
            rounded-full
            border
            px-2.5
            py-1
            text-[9px]
            font-bold
            uppercase
            tracking-wide

            ${status.badge}
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${status.dot}
            `}
          />

          {item.status}
        </span>
      </td>

      {/* PRICE */}

      <td
        className={`
          px-4
          py-4
          text-[13px]
          font-semibold

          ${
            dark
              ? "text-slate-300"
              : "text-slate-600"
          }
        `}
      >
        {item.price}
      </td>
    </tr>
  );
}

/* =========================================================
   3D INVENTORY PANEL
========================================================= */

function InventoryPanel({
  dark,
}) {
  const panelRef =
    useRef(null);

  const handleMove = (event) => {
    const panel =
      panelRef.current;

    if (!panel) return;

    const rect =
      panel.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateX =
      ((y - rect.height / 2) /
        (rect.height / 2)) *
      -2.5;

    const rotateY =
      ((x - rect.width / 2) /
        (rect.width / 2)) *
      3;

    panel.style.setProperty(
      "--inventory-x",
      `${x}px`
    );

    panel.style.setProperty(
      "--inventory-y",
      `${y}px`
    );

    panel.style.setProperty(
      "--inventory-rotate-x",
      `${rotateX}deg`
    );

    panel.style.setProperty(
      "--inventory-rotate-y",
      `${rotateY}deg`
    );
  };

  const handleLeave = () => {
    const panel =
      panelRef.current;

    if (!panel) return;

    panel.style.setProperty(
      "--inventory-rotate-x",
      "0deg"
    );

    panel.style.setProperty(
      "--inventory-rotate-y",
      "0deg"
    );
  };

  return (
    <div
      className="
        relative
        [perspective:1400px]
      "
    >
      {/* External glow */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-8
          rounded-[40px]
          bg-emerald-500/[0.05]
          blur-3xl
        "
      />

      <div
        ref={panelRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`
          inventory-panel
          group
          relative
          overflow-hidden
          rounded-[22px]
          border
          transition-transform
          duration-300
          ease-out

          [transform:
            perspective(1400px)
            rotateX(var(--inventory-rotate-x,0deg))
            rotateY(var(--inventory-rotate-y,0deg))
          ]

          ${
            dark
              ? `
                border-white/[0.09]
                bg-[#0c1118]
                shadow-[0_35px_100px_rgba(0,0,0,.38)]
              `
              : `
                border-black/[0.07]
                bg-white
                shadow-[0_35px_90px_rgba(15,23,42,.10)]
              `
          }
        `}
      >
        {/* =================================================
            CURSOR LIGHT
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
            background: `
              radial-gradient(
                350px circle
                at var(--inventory-x,50%)
                var(--inventory-y,50%),
                rgba(16,185,129,.08),
                transparent 65%
              )
            `,
          }}
        />

        {/* =================================================
            TOP EDGE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            z-30
            h-px
            bg-gradient-to-r
            from-transparent
            via-emerald-400/40
            to-transparent
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className={`
            relative
            z-10
            flex
            items-center
            justify-between
            border-b
            px-4
            py-4

            ${
              dark
                ? "border-white/[0.06] bg-white/[0.02]"
                : "border-black/[0.06] bg-slate-50/70"
            }
          `}
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                text-emerald-400
                shadow-[0_0_25px_rgba(16,185,129,.08)]
              "
            >
              <Boxes size={16} />
            </div>

            <div>
              <h3
                className={`
                  text-[13px]
                  font-bold

                  ${
                    dark
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                Inventory Overview
              </h3>

              <p
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
                Real-time Stock Management
              </p>
            </div>
          </div>

          {/* Live */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/15
              bg-emerald-500/[0.07]
              px-3
              py-1.5
            "
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
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                "
              />
            </span>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wide
                text-emerald-400
              "
            >
              Live Sync
            </span>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div
          className="
            relative
            z-10
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
              min-w-[560px]
            "
          >
            <thead>
              <tr
                className={
                  dark
                    ? "bg-white/[0.018]"
                    : "bg-slate-50/80"
                }
              >
                {[
                  "Product",
                  "SKU",
                  "Stock",
                  "Status",
                  "Price",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`
                      border-b
                      px-4
                      py-3
                      text-left
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.15em]

                      ${
                        dark
                          ? `
                            border-white/[0.055]
                            text-slate-600
                          `
                          : `
                            border-black/[0.055]
                            text-slate-400
                          `
                      }
                    `}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {inventoryItems.map(
                (item, index) => (
                  <InventoryRow
                    key={index}
                    item={item}
                    index={index}
                    dark={dark}
                  />
                )
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className={`
            relative
            z-10
            flex
            items-center
            justify-between
            border-t
            px-4
            py-3

            ${
              dark
                ? "border-white/[0.05] bg-white/[0.015]"
                : "border-black/[0.05] bg-slate-50/60"
            }
          `}
        >
          <div
            className={`
              flex
              items-center
              gap-2
              text-[9px]

              ${
                dark
                  ? "text-slate-600"
                  : "text-slate-400"
              }
            `}
          >
            <Activity size={10} />

            Inventory Synced Automatically
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              text-[9px]
              font-semibold
              text-emerald-400
            "
          >
            <Sparkles size={9} />

            Real-Time Updates
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function InventoryFinanceSection() {
  const { dark } = useTheme();

  return (
    <section
      id="inventory"
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
            ? "bg-[#080c18]"
            : "bg-white"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <GradientBlur
        color={
          dark
            ? "rgba(16,185,129,0.08)"
            : "rgba(16,185,129,0.04)"
        }
        size={500}
        style={{
          top: "20%",
          left: "50%",
          transform:
            "translateX(-50%)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-30
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-emerald-500/[0.025]
            blur-[100px]
          "
        />
      </div>

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
        <div
          className="
            flex
            flex-col
            items-start
            gap-12

            lg:flex-row
            lg:gap-16
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              w-full
              flex-1

              lg:max-w-[440px]
            "
          >
            <SectionBadge>
              Inventory &amp; Finance
            </SectionBadge>

            <h2
              className={`
                mb-5
                mt-4
                font-display
                text-[clamp(28px,4vw,46px)]
                font-bold
                leading-[1.08]
                tracking-tight

                ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              Full Financial &amp;

              <br />

              <span className="gradient-text">
                Stock Control
              </span>
            </h2>

            <p
              className={`
                mb-8
                max-w-[430px]
                text-[clamp(14px,1.6vw,16px)]
                leading-relaxed

                ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            >
              Track Inventory Across
              Warehouses, Manage Cash
              Flow, Create Invoices, And
              Monitor Expenses — All
              Synced With Your Messaging
              Workflows.
            </p>

            {/* Finance cards */}

            <div
              className="
                grid
                grid-cols-1
                gap-3

                sm:grid-cols-2
              "
            >
              {financeCards.map(
                (card, index) => (
                  <FinanceCard
                    key={index}
                    card={card}
                    dark={dark}
                    index={index}
                  />
                )
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="
              w-full
              min-w-0
              flex-1
            "
          >
            <InventoryPanel
              dark={dark}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .finance-card,
          .inventory-row,
          .inventory-panel {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}