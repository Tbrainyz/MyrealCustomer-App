import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SectionBadge, SectionTitle } from "./ui/SectionTitle";
import { GradientBlur } from "./ui/GradientBlur";
import { pricingPlans } from "../data/pricing";

function PricingCard({ plan, yearly, dark }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const savings = (plan.monthly - plan.yearly) * 12;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-2
        ${
          plan.popular
            ? dark
              ? "bg-white/[0.07] border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.2)]"
              : "bg-white border-indigo-500 shadow-[0_20px_60px_rgba(79,70,229,0.15)]"
            : dark
              ? "bg-white/[0.04] border-white/[0.08]"
              : "bg-white border-black/[0.07] shadow-sm"
        }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[11px] font-bold text-white whitespace-nowrap shadow-lg"
          style={{
            background: `linear-gradient(135deg, #4F46E5, #8B5CF6)`,
            boxShadow: "0 4px 20px rgba(79,70,229,0.5)",
          }}
        >
          ⭐ Most Popular
        </div>
      )}

      {/* Tier name */}
      <p
        className="text-[11px] font-bold tracking-widest uppercase mb-3"
        style={{ color: plan.color }}
      >
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span
          className={`font-display font-bold text-[clamp(40px,5vw,54px)] leading-none
            ${dark ? "text-white" : "text-slate-900"}`}
        >
          ₦{price}
        </span>
        <span
          className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`}
        >
          /mo
        </span>
      </div>

      {yearly && (
        <p className="text-xs font-semibold text-emerald-400 mb-1">
          Billed annually — save ${savings}/yr
        </p>
      )}
      <p
        className={`text-xs mb-6 ${dark ? "text-slate-500" : "text-slate-400"}`}
      >
        {yearly ? "Billed annually" : "Billed monthly"}
      </p>

      <div
        className={`h-px mb-6 ${dark ? "bg-white/[0.08]" : "bg-black/[0.07]"}`}
      />

      {/* Features */}
      <ul className="flex-1 flex flex-col gap-2.5 mb-7">
        {plan.features.map((feat, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <CheckCircle
              size={15}
              style={{ color: plan.color, flexShrink: 0 }}
            />
            <span className={dark ? "text-slate-300" : "text-slate-600"}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`w-full py-3.5 rounded-xl text-[15px] font-bold transition-all duration-200
          ${
            plan.popular
              ? "text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              : dark
                ? "bg-transparent border border-white/[0.12] text-slate-300 hover:border-indigo-400 hover:text-indigo-300"
                : "bg-transparent border border-black/[0.1] text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
          }`}
        style={
          plan.popular
            ? {
                background: `linear-gradient(135deg, #4F46E5, #6366F1)`,
                boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
              }
            : {}
        }
      >
        {plan.name === "Enterprise" ? "Subscribe" : "Subscribe →"}
      </button>
    </div>
  );
}

export default function Pricing() {
  const { dark } = useTheme();
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? "bg-[#06080f]" : "bg-slate-50"}`}
    >
      <GradientBlur
        color={dark ? "rgba(79,70,229,0.1)" : "rgba(79,70,229,0.05)"}
        size={600}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <SectionBadge>Pricing</SectionBadge>
        </div>
        <SectionTitle subtitle="Subscribe Now, No Credit Card Required, Scale Seamlessly as your Business Grows.">
          Simple, <span className="gradient-text">transparent pricing</span>
        </SectionTitle>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-semibold ${!yearly ? (dark ? "text-white" : "text-slate-900") : dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly((y) => !y)}
            className={`w-12 h-6 rounded-full transition-colors duration-300 relative
              ${yearly ? "bg-indigo-600" : dark ? "bg-white/15 border border-white/10" : "bg-black/10 border border-black/10"}`}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300"
              style={{ left: yearly ? "26px" : "2px" }}
            />
          </button>
          <span
            className={`text-sm font-semibold flex items-center gap-2
            ${yearly ? (dark ? "text-white" : "text-slate-900") : dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Yearly
            <span className="text-[11px] font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={i} plan={plan} yearly={yearly} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
}
