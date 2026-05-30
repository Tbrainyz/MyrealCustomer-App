import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMemo } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Header({
  title,
  subtitle,
  onMobileMenuClick,
  showGreeting = false
}) {
  const {
    user
  } = useAuth();

  // Dynamic Greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  // Use custom title or default with greeting
  const displayTitle = title || `${greeting}, ${user?.name?.split(' ')[0] || 'User'} 👋`;
  return /*#__PURE__*/_jsxs("header", {
    className: "flex items-center justify-between px-4 md:px-6 py-4 border-b border-brand-border bg-brand-darker/80 backdrop-blur-md sticky top-0 z-30",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3",
      children: [/*#__PURE__*/_jsx("button", {
        onClick: onMobileMenuClick,
        className: "p-2 rounded-lg hover:bg-brand-border text-brand-muted hover:text-white lg:hidden",
        children: /*#__PURE__*/_jsx(Menu, {
          size: 20
        })
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "page-title text-lg md:text-xl",
          children: displayTitle
        }), subtitle && /*#__PURE__*/_jsx("p", {
          className: "text-sm text-brand-muted mt-0.5 hidden md:block",
          children: subtitle
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex items-center gap-3",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "relative hidden md:flex items-center",
        children: [/*#__PURE__*/_jsx(Search, {
          size: 14,
          className: "absolute left-3 text-brand-muted"
        }), /*#__PURE__*/_jsx("input", {
          placeholder: "Quick search...",
          className: "input pl-8 w-56 text-xs bg-brand-card border-brand-border focus:border-primary-500",
          readOnly: true
        })]
      }), /*#__PURE__*/_jsxs("button", {
        className: "relative p-2.5 rounded-lg hover:bg-brand-border text-brand-muted hover:text-white transition-colors",
        children: [/*#__PURE__*/_jsx(Bell, {
          size: 18
        }), /*#__PURE__*/_jsx("span", {
          className: "absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-brand-darker"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all",
        children: user?.name?.[0]?.toUpperCase() || 'U'
      })]
    })]
  });
}
