import { Check, ArrowDown, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SectionBadge, SectionTitle } from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { automationSteps } from "../data/features";

const CHECKLIST = [
  "Timezone-Intelligent Message Scheduling",
  "Recurring Campaigns and Drip Sequences",
  "Smart Audience Segmentation & Targeting",
  "Real-Time Delivery Tracking & Auto-retries",
  "AI-Powered Reply Detection and Routing",
  "Webhook Triggers & Third-Party Integrations",
];

export default function AutomationSection() {
  const { dark } = useTheme();

  return (
    <section
      id="automation"
      className={`
        relative overflow-hidden
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8 lg:py-28
        ${dark ? "bg-[#080c18]" : "bg-white"}
      `}
    >
      {/* ─────────────────────────────────────────
          Background effects
      ───────────────────────────────────────── */}
      <GradientBlur
        color={
          dark
            ? "rgba(6,182,212,0.12)"
            : "rgba(6,182,212,0.05)"
        }
        size={500}
        style={{
          top: "50%",
          left: "-150px",
          transform: "translateY(-50%)",
        }}
      />

      <GradientBlur
        color={
          dark
            ? "rgba(79,70,229,0.10)"
            : "rgba(79,70,229,0.04)"
        }
        size={400}
        style={{
          top: "5%",
          right: "-150px",
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        {/* ─────────────────────────────────────────
            Section heading
        ───────────────────────────────────────── */}
        <div className="mb-12 text-center lg:mb-16">
          <SectionBadge>Automation Engine</SectionBadge>

          <SectionTitle
            subtitle="Build Sophisticated Multi-Step Workflows With Our Visual Automation Platform — From Welcome Messages To Complex Re-Engagement Funnels."
          >
            Set It Up Once.{" "}
            <span className="gradient-text">
              Let It Run Forever.
            </span>
          </SectionTitle>
        </div>

        {/* ─────────────────────────────────────────
            Main content
        ───────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start xl:gap-20">
          {/* ═══════════════════════════════════════
              LEFT — Features
          ═══════════════════════════════════════ */}
          <div className="w-full flex-1 lg:max-w-[500px]">
            <div
              className={`
                rounded-3xl border p-6
                sm:p-8
                ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-black/[0.06] bg-slate-50/70"
                }
              `}
            >
              {/* Small heading */}
              <div className="mb-7 flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    border border-cyan-400/20
                    bg-cyan-400/10
                  "
                >
                  <Zap
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    Powerful Automation
                  </p>

                  <p
                    className={`
                      text-xs
                      ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Everything Works Automatically
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                className={`
                  mb-7 text-[15px]
                  leading-relaxed
                  ${
                    dark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                Create Intelligent Workflows That Respond
                To Customer Behavior, Timing, Engagement,
                and Real-Time Events Without Manual
                Intervention.
              </p>

              {/* Checklist */}
              <ul className="flex flex-col gap-3.5">
                {CHECKLIST.map((item, index) => (
                  <li
                    key={index}
                    className="
                      group flex items-start
                      gap-3
                    "
                  >
                    <span
                      className="
                        mt-0.5 flex h-5 w-5
                        flex-shrink-0
                        items-center justify-center
                        rounded-full
                        border
                        border-emerald-500/25
                        bg-emerald-500/10
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:bg-emerald-500/20
                      "
                    >
                      <Check
                        size={11}
                        strokeWidth={3}
                        className="text-emerald-400"
                      />
                    </span>

                    <span
                      className={`
                        text-sm leading-relaxed
                        sm:text-[14px]
                        ${
                          dark
                            ? "text-slate-300"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom stat */}
              <div
                className={`
                  mt-8 flex items-center
                  justify-between
                  rounded-2xl border
                  px-4 py-3
                  ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.025]"
                      : "border-black/[0.05] bg-white"
                  }
                `}
              >
                <div>
                  <p
                    className={`
                      text-xs
                      ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Workflow Status
                  </p>

                  <p
                    className={`
                      mt-0.5 text-sm font-semibold
                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    Running Automatically
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="
                        absolute inline-flex
                        h-full w-full
                        animate-ping
                        rounded-full
                        bg-emerald-400
                        opacity-50
                      "
                    />

                    <span
                      className="
                        relative inline-flex
                        h-2.5 w-2.5
                        rounded-full
                        bg-emerald-400
                      "
                    />
                  </span>

                  <span className="text-xs font-semibold text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              RIGHT — Workflow
          ═══════════════════════════════════════ */}
          <div className="w-full flex-1 lg:max-w-[520px]">
            <div
              className={`
                relative rounded-3xl border
                p-5 sm:p-7
                ${
                  dark
                    ? "border-white/[0.07] bg-white/[0.025]"
                    : "border-black/[0.06] bg-slate-50/70"
                }
              `}
            >
              {/* Workflow header */}
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    Automation Workflow
                  </p>

                  <p
                    className={`
                      mt-1 text-xs
                      ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Trigger → Process → Action
                  </p>
                </div>

                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    bg-indigo-500/10
                    text-indigo-400
                  "
                >
                  <Zap size={16} />
                </div>
              </div>

              {/* Steps */}
              <div className="relative">
                {automationSteps.map((step, index) => {
                  const isLast =
                    index ===
                    automationSteps.length - 1;

                  return (
                    <div
                      key={index}
                      className="
                        relative flex
                        items-stretch gap-4
                      "
                    >
                      {/* Timeline */}
                      <div
                        className="
                          flex w-12
                          flex-shrink-0
                          flex-col items-center
                        "
                      >
                        {/* Node */}
                        <div
                          className="
                            relative z-10
                            flex h-12 w-12
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border-2
                            text-lg
                            transition-all
                            duration-300
                            hover:scale-110
                          "
                          style={{
                            backgroundColor: `${step.color}12`,
                            borderColor: `${step.color}45`,
                            boxShadow: `0 0 25px ${step.color}18`,
                          }}
                        >
                          {step.icon}

                          {/* Number */}
                          <span
                            className="
                              absolute
                              -right-1.5
                              -top-1.5
                              flex h-5 w-5
                              items-center
                              justify-center
                              rounded-full
                              text-[9px]
                              font-bold
                              text-white
                            "
                            style={{
                              backgroundColor:
                                step.color,
                            }}
                          >
                            {index + 1}
                          </span>
                        </div>

                        {/* Connector */}
                        {!isLast && (
                          <div className="relative my-1 w-px flex-1">
                            <div
                              className="
                                absolute inset-0
                                opacity-30
                              "
                              style={{
                                background: `linear-gradient(
                                  to bottom,
                                  ${step.color},
                                  ${
                                    automationSteps[
                                      index + 1
                                    ].color
                                  }
                                )`,
                              }}
                            />

                            {/* Animated pulse */}
                            <div
                              className="
                                absolute left-1/2
                                top-0 h-2 w-2
                                -translate-x-1/2
                                animate-pulse
                                rounded-full
                              "
                              style={{
                                backgroundColor:
                                  step.color,
                                boxShadow: `0 0 10px ${step.color}`,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Card */}
                      <div
                        className={`
                          group mb-4 flex-1
                          rounded-2xl border
                          border-l-[3px]
                          p-4
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          ${
                            dark
                              ? `
                                border-white/[0.07]
                                bg-white/[0.035]
                                hover:bg-white/[0.055]
                              `
                              : `
                                border-black/[0.06]
                                bg-white
                                shadow-sm
                                hover:shadow-md
                              `
                          }
                        `}
                        style={{
                          borderLeftColor:
                            step.color,
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4
                              className={`
                                text-[14px]
                                font-semibold
                                sm:text-[15px]
                                ${
                                  dark
                                    ? "text-white"
                                    : "text-slate-900"
                                }
                              `}
                            >
                              {step.label}
                            </h4>

                            <p
                              className={`
                                mt-1.5
                                text-[12px]
                                leading-relaxed
                                sm:text-[13px]
                                ${
                                  dark
                                    ? "text-slate-500"
                                    : "text-slate-500"
                                }
                              `}
                            >
                              {step.desc}
                            </p>
                          </div>

                          <span
                            className="
                              hidden
                              flex-shrink-0
                              rounded-full
                              px-2 py-1
                              text-[9px]
                              font-semibold
                              sm:block
                            "
                            style={{
                              color: step.color,
                              backgroundColor: `${step.color}10`,
                            }}
                          >
                            STEP {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Workflow complete indicator */}
              <div
                className={`
                  mt-2 flex items-center
                  justify-center gap-2
                  rounded-xl border
                  py-3
                  ${
                    dark
                      ? "border-emerald-500/10 bg-emerald-500/[0.04]"
                      : "border-emerald-500/10 bg-emerald-500/[0.04]"
                  }
                `}
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className="text-emerald-400"
                />

                <span className="text-xs font-semibold text-emerald-400">
                  Workflow Ready To Run
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            Bottom flow hint
        ───────────────────────────────────────── */}
        <div className="mt-10 flex justify-center">
          <div
            className={`
              flex items-center gap-2
              rounded-full border
              px-4 py-2
              ${
                dark
                  ? "border-white/[0.07] bg-white/[0.025]"
                  : "border-black/[0.06] bg-slate-50"
              }
            `}
          >
            <ArrowDown
              size={13}
              className={
                dark
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            />

            <span
              className={`
                text-[11px] font-medium
                ${
                  dark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Fully Automated. Zero Manual Follow-Up.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

