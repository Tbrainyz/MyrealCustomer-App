import { Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SectionBadge, SectionTitle } from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { automationSteps } from "../data/features";

const CHECKLIST = [
  "Timezone-intelligent message scheduling",
  "Recurring campaigns and drip sequences",
  "Smart audience segmentation & targeting",
  "Real-time delivery tracking & auto-retries",
  "AI-powered reply detection and routing",
  "Webhook triggers & third-party integrations",
];

export default function AutomationSection() {
  const { dark } = useTheme();

  return (
    <section
      id="automation"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? "bg-[#080c18]" : "bg-white"}`}
    >
      <GradientBlur
        color={dark ? "rgba(6,182,212,0.1)" : "rgba(6,182,212,0.05)"}
        size={450}
        style={{ top: "50%", left: "-120px", transform: "translateY(-50%)" }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
          {/* Left: text */}
          <div className="flex-1 w-full lg:max-w-[500px]">
            <SectionBadge>Automation Engine</SectionBadge>
            <h2
              className={`font-display font-bold leading-tight tracking-tight mb-5
              text-[clamp(28px,4vw,46px)]
              ${dark ? "text-white" : "text-slate-900"}`}
            >
              Set it up once.{" "}
              <span className="gradient-text">Let it run forever.</span>
            </h2>
            <p
              className={`text-[clamp(15px,1.6vw,17px)] leading-relaxed mb-8
              ${dark ? "text-slate-400" : "text-slate-500"}`}
            >
              Build sophisticated multi-step workflows with our visual Platform
              — from simple welcome messages to complex re-engagement funnels.
            </p>

            <ul className="flex flex-col gap-3">
              {CHECKLIST.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm sm:text-[15px]"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-emerald-400" />
                  </span>
                  <span className={dark ? "text-slate-300" : "text-slate-600"}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: flow steps */}
          <div className="flex-1 w-full lg:max-w-[480px]">
            <div className="flex flex-col">
              {automationSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 relative z-10"
                      style={{
                        background: `${step.color}15`,
                        borderColor: `${step.color}40`,
                        boxShadow: `0 0 20px ${step.color}25`,
                      }}
                    >
                      {step.icon}
                      {/* Step number badge */}
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: step.color }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    {i < automationSteps.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[28px] my-1 opacity-30"
                        style={{
                          background: `linear-gradient(${step.color}, ${automationSteps[i + 1].color})`,
                        }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div
                    className={`flex-1 rounded-xl p-4 mb-4 border-l-[3px] transition-all duration-300 hover:-translate-y-0.5
                      ${dark ? "bg-white/[0.04] border-white/[0.07]" : "bg-white border-black/[0.07] shadow-sm"}`}
                    style={{ borderLeftColor: step.color }}
                  >
                    <h4
                      className={`font-semibold text-[15px] mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}
                    >
                      {step.label}
                    </h4>
                    <p
                      className={`text-[13px] leading-relaxed ${dark ? "text-slate-500" : "text-slate-500"}`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
