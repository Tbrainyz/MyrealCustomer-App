/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5bafc",
          400: "#8196f8",
          500: "#6272f1",
          600: "#4f56e5",
          700: "#4044ca",
          800: "#3538a3",
          900: "#303481",
        },

        brand: {
          purple: "#6272f1",
          dark: "#0f0f1a",
          darker: "#080810",
          card: "#161628",
          border: "#2a2a4a",
          muted: "#6b6b8a",
        },

        accent: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          light: "#818CF8",
        },

        cyan: {
          DEFAULT: "#06B6D4",
        },
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(240,100%,74%,0.07) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.05) 0px, transparent 50%)",
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        float2: "float2 5s ease-in-out 1s infinite",
        pulse2: "pulse2 2s infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },

        float2: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        pulse2: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },

        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(79,70,229,0.3), 0 8px 32px rgba(79,70,229,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(79,70,229,0.7), 0 8px 32px rgba(79,70,229,0.5), 0 0 80px rgba(6,182,212,0.2)" },
        },
      },
    },
  },

  plugins: [],
};
