import Sidebar from './Sidebar';
import '../../styles/admin.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function Layout({ children }) {
  return _jsxs("div", {
    className: "admin-shell flex h-screen overflow-hidden",
    children: [
      _jsx(Sidebar, {}),
      _jsx("main", {
        className: "admin-main flex-1 overflow-y-auto",
        children: children
      })
    ]
  });
}