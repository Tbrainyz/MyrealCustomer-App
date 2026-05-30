import Sidebar from './Sidebar';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Layout({
  children
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "flex h-screen overflow-hidden bg-brand-dark",
    children: [/*#__PURE__*/_jsx(Sidebar, {}), /*#__PURE__*/_jsx("main", {
      className: "flex-1 overflow-y-auto bg-gradient-mesh",
      children: children
    })]
  });
}
