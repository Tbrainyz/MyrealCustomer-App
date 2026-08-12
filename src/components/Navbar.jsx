import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Zap,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Platforms", href: "#platforms" },
  { label: "Finance", href: "#inventory" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* =========================================================
   NAV LINK
========================================================= */

function NavLink({
  link,
  dark,
  active,
}) {
  return (
    <a
      href={link.href}
      className={`
        group
        relative
        rounded-xl
        px-3.5
        py-2.5
        text-[13px]
        font-semibold
        transition-all
        duration-300

        ${
          active
            ? dark
              ? "text-white"
              : "text-slate-900"
            : dark
              ? "text-slate-400 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
        }
      `}
    >
      {/* Hover background */}

      <span
        className={`
          absolute
          inset-0
          -z-10
          rounded-xl
          opacity-0
          transition-all
          duration-300

          group-hover:opacity-100

          ${
            dark
              ? "bg-white/[0.055]"
              : "bg-black/[0.035]"
          }
        `}
      />

      {/* Label */}

      <span className="relative z-10">
        {link.label}
      </span>

      {/* Active indicator */}

      <span
        className={`
          absolute
          bottom-0.5
          left-1/2
          h-[2px]
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          to-cyan-400
          transition-all
          duration-300

          ${
            active
              ? "w-5 opacity-100"
              : "w-0 opacity-0"
          }
        `}
      />
    </a>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Brand({
  dark,
}) {
  return (
    <a
      href="#hero"
      className="
        group
        flex
        shrink-0
        items-center
        gap-2.5
      "
    >
      {/* Logo container */}

      <div
        className="
          relative
          [perspective:500px]
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            -inset-2
            rounded-xl
            bg-indigo-500/30
            opacity-0
            blur-lg
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
            h-8
            w-8
            items-center
            justify-center
            overflow-hidden
            rounded-[10px]
            border
            border-white/10
            bg-gradient-to-br
            from-indigo-600
            via-indigo-500
            to-cyan-500
            shadow-[0_8px_25px_rgba(79,70,229,.3)]
            transition-all
            duration-500
            group-hover:-rotate-3
            group-hover:scale-110
            sm:h-9
            sm:w-9
          "
        >
          {/* Shine */}

          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />

          <Zap
            size={17}
            className="
              relative
              z-10
              text-white
              transition-transform
              duration-500
              group-hover:scale-110
            "
            fill="currentColor"
          />
        </div>
      </div>

      {/* Brand name */}

      <span
        className={`
          font-display
          text-[17px]
          font-bold
          tracking-tight
          transition-colors
          duration-300

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
  );
}

/* =========================================================
   THEME BUTTON
========================================================= */

function ThemeButton({
  dark,
  toggleTheme,
  mobile = false,
}) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        group
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
        duration-300

        ${
          dark
            ? `
              border-white/[0.08]
              bg-white/[0.045]
              text-slate-400
              hover:border-indigo-400/40
              hover:text-white
            `
            : `
              border-black/[0.07]
              bg-black/[0.035]
              text-slate-500
              hover:border-indigo-400/50
              hover:text-slate-900
            `
        }

        ${
          mobile
            ? "sm:hidden"
            : "hidden sm:flex"
        }
      `}
    >
      {/* Hover glow */}

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          bg-indigo-500/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <span className="relative z-10">
        {dark ? (
          <Sun
            size={15}
            className="
              transition-all
              duration-500
              group-hover:rotate-45
            "
          />
        ) : (
          <Moon
            size={15}
            className="
              transition-all
              duration-500
              group-hover:-rotate-12
            "
          />
        )}
      </span>
    </button>
  );
}

/* =========================================================
   MOBILE MENU BUTTON
========================================================= */

function MenuButton({
  open,
  dark,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={
        open
          ? "Close menu"
          : "Open menu"
      }
      aria-expanded={open}
      className={`
        relative
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-xl
        border
        transition-all
        duration-300

        md:hidden

        ${
          dark
            ? `
              border-white/[0.08]
              bg-white/[0.045]
              text-white
              hover:border-indigo-400/40
            `
            : `
              border-black/[0.07]
              bg-black/[0.035]
              text-slate-800
              hover:border-indigo-400/50
            `
        }
      `}
    >
      <span
        className={`
          transition-all
          duration-300
          ${
            open
              ? "rotate-90 scale-90"
              : "rotate-0 scale-100"
          }
        `}
      >
        {open ? (
          <X size={18} />
        ) : (
          <Menu size={18} />
        )}
      </span>
    </button>
  );
}

/* =========================================================
   MOBILE DRAWER
========================================================= */

function MobileDrawer({
  dark,
  menuOpen,
  setMenuOpen,
}) {
  if (!menuOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <div
        className="
          fixed
          inset-0
          z-[-1]
          bg-black/20
          backdrop-blur-[2px]
          md:hidden
        "
        onClick={() =>
          setMenuOpen(false)
        }
      />

      {/* Drawer */}

      <div
        className={`
          absolute
          left-3
          right-3
          top-[calc(100%+8px)]
          overflow-hidden
          rounded-2xl
          border
          shadow-[0_25px_70px_rgba(0,0,0,.2)]
          md:hidden

          ${
            dark
              ? `
                border-white/[0.08]
                bg-[#0a0e17]/95
                backdrop-blur-2xl
              `
              : `
                border-black/[0.07]
                bg-white/95
                backdrop-blur-2xl
              `
          }
        `}
      >
        {/* Top glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-1/2
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-indigo-500
            to-transparent
          "
        />

        <div className="p-3">
          {NAV_LINKS.map(
            (link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border-b
                  px-4
                  py-3.5
                  text-[14px]
                  font-semibold
                  transition-all
                  duration-200

                  ${
                    dark
                      ? `
                        border-white/[0.05]
                        text-slate-300
                        hover:bg-white/[0.04]
                        hover:text-white
                      `
                      : `
                        border-black/[0.045]
                        text-slate-600
                        hover:bg-black/[0.025]
                        hover:text-slate-900
                      `
                  }
                `}
                style={{
                  animationDelay: `${
                    index * 40
                  }ms`,
                }}
              >
                <span>
                  {link.label}
                </span>

                <ChevronRight
                  size={15}
                  className="
                    text-slate-500
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </a>
            )
          )}

          {/* Actions */}

          <div className="mt-4 flex gap-3">
            <Link
              to="/login"
              onClick={() =>
                setMenuOpen(false)
              }
              className={`
                flex
                flex-1
                items-center
                justify-center
                rounded-xl
                border
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  dark
                    ? `
                      border-white/[0.1]
                      text-slate-300
                      hover:border-indigo-400/40
                      hover:text-white
                    `
                    : `
                      border-black/[0.08]
                      text-slate-600
                      hover:border-indigo-400/50
                      hover:text-slate-900
                    `
                }
              `}
            >
              Sign In
            </Link>

            <Link
              to="/register"
              onClick={() =>
                setMenuOpen(false)
              }
              className="flex-[1.4]"
            >
              <Button
                variant="primary"
                size="md"
                className="
                  w-full
                  justify-center
                  rounded-xl
                "
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar({
  scrolled,
}) {
  const {
    dark,
    toggleTheme,
  } = useTheme();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("");

  /* =======================================================
     ACTIVE SECTION DETECTION
  ======================================================= */

  useEffect(() => {
    const sections =
      NAV_LINKS.map(
        (link) =>
          document.querySelector(
            link.href
          )
      ).filter(Boolean);

    if (!sections.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];

          if (visible) {
            setActiveSection(
              `#${visible.target.id}`
            );
          }
        },
        {
          rootMargin:
            "-25% 0px -60% 0px",
          threshold: [
            0,
            0.1,
            0.25,
            0.5,
          ],
        }
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     CLOSE MOBILE MENU ON RESIZE
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >= 768
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  /* =======================================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ======================================================= */

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /* =======================================================
     NAV BACKGROUND
  ======================================================= */

  const navBg = scrolled
    ? dark
      ? `
        border-b
        border-white/[0.07]
        bg-[#06080f]/80
        backdrop-blur-2xl
      `
      : `
        border-b
        border-black/[0.06]
        bg-white/80
        backdrop-blur-2xl
        shadow-[0_8px_35px_rgba(15,23,42,.05)]
      `
    : `
      border-b
      border-transparent
      bg-transparent
    `;

  return (
    <nav
      className={`
        fixed
        left-0
        right-0
        top-0
        z-[1000]
        transition-all
        duration-500
        ${navBg}
      `}
    >
      {/* =================================================
          TOP GRADIENT LINE
      ================================================= */}

      {scrolled && (
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-px
            w-1/3
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-indigo-500/50
            to-transparent
          "
        />
      )}

      {/* =================================================
          NAV CONTAINER
      ================================================= */}

      <div
        className="
          mx-auto
          flex
          h-16
          max-w-[1240px]
          items-center
          justify-between
          gap-4
          px-4

          sm:h-[68px]
          sm:px-6

          lg:px-8
        "
      >
        {/* BRAND */}

        <Brand dark={dark} />

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-0.5

            md:flex
          "
        >
          {NAV_LINKS.map(
            (link) => (
              <NavLink
                key={link.label}
                link={link}
                dark={dark}
                active={
                  activeSection ===
                  link.href
                }
              />
            )
          )}
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-2.5
          "
        >
          {/* Desktop theme */}

          <ThemeButton
            dark={dark}
            toggleTheme={
              toggleTheme
            }
          />

          {/* Sign in */}

          <Link
            to="/login"
            className={`
              hidden
              rounded-xl
              border
              px-5
              py-2.5
              text-[12px]
              font-bold
              transition-all
              duration-300

              md:block

              ${
                dark
                  ? `
                    border-white/[0.09]
                    text-slate-400
                    hover:border-indigo-400/40
                    hover:bg-white/[0.04]
                    hover:text-white
                  `
                  : `
                    border-black/[0.08]
                    text-slate-600
                    hover:border-indigo-400/50
                    hover:bg-black/[0.02]
                    hover:text-slate-900
                  `
              }
            `}
          >
            Sign In
          </Link>

          {/* Sign up */}

          <Link
            to="/register"
            className="
              hidden
              md:inline-flex
            "
          >
            <Button
              variant="primary"
              size="bold"
              className="
                group
                rounded-xl
                px-5
                py-2.5
                text-[12px]
              "
            >
              <span>
                Sign Up
              </span>

              <ChevronRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </Button>
          </Link>

          {/* Mobile theme */}

          <ThemeButton
            dark={dark}
            toggleTheme={
              toggleTheme
            }
            mobile
          />

          {/* Mobile menu */}

          <MenuButton
            open={menuOpen}
            dark={dark}
            onClick={() =>
              setMenuOpen(
                (open) => !open
              )
            }
          />
        </div>
      </div>

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      <MobileDrawer
        dark={dark}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </nav>
  );
}