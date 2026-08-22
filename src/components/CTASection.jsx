import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { GradientBlur } from "./ui/GradientBlur";
import { Button } from "./ui/Button";

export default function CTASection() {
  const { dark } = useTheme();

  return (
    <section
      id="cta"
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8
        ${dark ? "bg-[#080c18]" : "bg-white"}`}
    >
      <div className="max-w-[960px] mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-20 text-center border"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,27,75,0.95) 0%, rgba(8,15,26,0.95) 50%, rgba(8,47,73,0.95) 100%)",
            borderColor: "rgba(79,70,229,0.35)",
            boxShadow:
              "0 0 80px rgba(79,70,229,0.2), inset 0 0 80px rgba(6,182,212,0.04)",
          }}
        >
          {/* Inner blobs */}
          <GradientBlur
            color="rgba(79,70,229,0.25)"
            size={350}
            style={{ top: "-100px", left: "20%" }}
          />
          <GradientBlur
            color="rgba(6,182,212,0.15)"
            size={300}
            style={{ bottom: "-80px", right: "15%" }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25">
              <Sparkles size={13} />
              Start scaling today
            </div>

            <h2
              className="font-display font-bold text-white leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(28px,5vw,58px)" }}
            >
              Scale Your Business With{" "}
              <span className="gradient-text">Intelligent Automation</span>
            </h2>

            <p className="text-[clamp(15px,1.8vw,18px)] text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
              Join 100+ businesses using My Real Customer App to automate
              communication, inventory, and financial operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Button
                variant="cta"
                size="xl"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto"
              >
                ⚡ Get Started <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
