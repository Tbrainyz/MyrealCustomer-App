import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaUsers,
  FaChartLine,
  FaClock,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

import {
  MdEmail,
  MdInventory2,
  MdOutlineSms,
  MdOutlineDashboard,
} from "react-icons/md";

import {
  BsRobot,
  BsLightningChargeFill,
  BsFileEarmarkTextFill,
} from "react-icons/bs";

import {
  RiCustomerService2Fill,
  RiMoneyDollarCircleFill,
  RiMessage2Fill,
} from "react-icons/ri";

import { HiSparkles } from "react-icons/hi2";

export const features = [
  {
    icon: RiMessage2Fill,
    title: "Multi-Platform Messaging",
    desc: "Unified inbox for WhatsApp, Instagram, Facebook, SMS, Email and more.",
    color: "#4F46E5",
  },
  {
    icon: BsRobot,
    title: "WhatsApp Automation",
    desc: "AI-powered chatbots with instant response and smart routing workflows.",
    color: "#25D366",
  },
  {
    icon: FaInstagram,
    title: "Instagram & Facebook DMs",
    desc: "Social media DMs managed from one sleek centralized dashboard.",
    color: "#E1306C",
  },
  {
    icon: MdOutlineSms,
    title: "Bulk SMS Campaigns",
    desc: "Launch targeted campaigns to thousands of contacts instantly.",
    color: "#F59E0B",
  },
  {
    icon: HiSparkles,
    title: "AI Personalization",
    desc: "ML-driven content tailored uniquely for every individual recipient.",
    color: "#8B5CF6",
  },
  {
    icon: FaClock,
    title: "Scheduled Messaging",
    desc: "Deliver messages at peak engagement times, automatically.",
    color: "#06B6D4",
  },
  {
    icon: MdInventory2,
    title: "Inventory Management",
    desc: "Real-time stock tracking across all warehouses and locations.",
    color: "#F97316",
  },
  {
    icon: RiMoneyDollarCircleFill,
    title: "Financial Tracking",
    desc: "P&L, cash flow, expenses — full financial oversight in one place.",
    color: "#10B981",
  },
  {
    icon: BsFileEarmarkTextFill,
    title: "Invoice Management",
    desc: "Create, send, and track invoices with zero friction or setup.",
    color: "#6366F1",
  },
  {
    icon: FaUsers,
    title: "Contact CRM",
    desc: "Manage leads, customers and relationships at any scale.",
    color: "#22D3EE",
  },
  {
    icon: FaChartLine,
    title: "Analytics Dashboard",
    desc: "Real-time KPIs, delivery metrics and AI business insights.",
    color: "#EC4899",
  },
  {
    icon: FaCog,
    title: "Workflow Automation",
    desc: "No-code visual builder with 200+ triggers and actions.",
    color: "#F59E0B",
  },
  {
    icon: BsFileEarmarkTextFill,
    title: "Message Templates",
    desc: "Save and reuse high-converting message templates across channels.",
    color: "#10B981",
  },
  {
    icon: FaShieldAlt,
    title: "Team Collaboration",
    desc: "Multi-user workspace with fine-grained role permissions.",
    color: "#8B5CF6",
  },
  {
    icon: MdOutlineDashboard,
    title: "Real-Time Logs",
    desc: "Monitor every message, delivery, and automation event live.",
    color: "#F97316",
  },
  {
    icon: BsLightningChargeFill,
    title: "Background Engine",
    desc: "24/7 automation engine that works reliably while you sleep.",
    color: "#14B8A6",
  },
];

export const platforms = [
  { icon: FaWhatsapp, name: "WhatsApp", glow: "#25D366" },
  { icon: FaInstagram, name: "Instagram", glow: "#E1306C" },
  { icon: FaFacebook, name: "Facebook", glow: "#1877F2" },
  { icon: FaTiktok, name: "TikTok", glow: "#EE1D52" },
  { icon: MdEmail, name: "Email", glow: "#F59E0B" },
  { icon: MdOutlineSms, name: "SMS", glow: "#8B5CF6" },
];

export const companies = [
  "Shopify",
  "Stripe",
  "Notion",
  "Linear",
  "Slack",
  "Atlassian",
  "HubSpot",
  "Salesforce",
  "Zendesk",
];

export const stats = [
  { value: "5M+", label: "Messages Sent" },
  { value: "2,500+", label: "Active Businesses" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "Customer Rating" },
];

export const chartData = [
  { month: "Jan", revenue: 18000, messages: 4200 },
  { month: "Feb", revenue: 24000, messages: 5800 },
  { month: "Mar", revenue: 31000, messages: 7600 },
  { month: "Apr", revenue: 39000, messages: 9800 },
  { month: "May", revenue: 47000, messages: 12100 },
  { month: "Jun", revenue: 56000, messages: 14900 },
  { month: "Jul", revenue: 64000, messages: 17100 },
  { month: "Aug", revenue: 73000, messages: 19800 },
  { month: "Sep", revenue: 81000, messages: 22600 },
  { month: "Oct", revenue: 92000, messages: 25400 },
  { month: "Nov", revenue: 108000, messages: 29600 },
  { month: "Dec", revenue: 128000, messages: 35400 },
];

export const inventoryItems = [
  {
    name: 'MacBook Pro 14"',
    sku: "MBP-14-M3",
    stock: 24,
    status: "In Stock",
    statusColor: "green",
    price: "₦2,450,000",
  },
  {
    name: "iPhone 15 Pro",
    sku: "IP15P-256",
    stock: 3,
    status: "Low Stock",
    statusColor: "amber",
    price: "₦1,850,000",
  },
  {
    name: "AirPods Pro",
    sku: "APP-2ND",
    stock: 0,
    status: "Out of Stock",
    statusColor: "red",
    price: "₦480,000",
  },
  {
    name: "Apple Watch S9",
    sku: "AWS9-45",
    stock: 48,
    status: "In Stock",
    statusColor: "green",
    price: "₦720,000",
  },
  {
    name: 'iPad Pro 12.9"',
    sku: "IPP-1TB",
    stock: 11,
    status: "In Stock",
    statusColor: "green",
    price: "₦1,950,000",
  },
];

export const analyticsKPIs = [
  {
    label: "Delivery Rate",
    value: "98.7%",
    change: "↑ 1.2% this month",
    color: "#10B981",
  },
  {
    label: "Open Rate",
    value: "61.4%",
    change: "↑ 23.1% this month",
    color: "#4F46E5",
  },
  {
    label: "Conversion Rate",
    value: "12.8%",
    change: "↑ 4.9% this month",
    color: "#06B6D4",
  },
  {
    label: "Avg Response Time",
    value: "4.2s",
    change: "↓ 78% faster",
    color: "#F59E0B",
  },
];

export const automationSteps = [
  {
    icon: "✉",
    label: "Create",
    color: "#4F46E5",
    desc: "Compose messages or pick from 200+ AI-powered templates built for every industry.",
  },
  {
    icon: "🕐",
    label: "Schedule",
    color: "#06B6D4",
    desc: "Set triggers, timing rules and audience conditions with our visual workflow builder.",
  },
  {
    icon: "⚡",
    label: "Automate",
    color: "#F59E0B",
    desc: "Our 24/7 background engine executes your workflows reliably while you focus on growth.",
  },
  {
    icon: "📊",
    label: "Track",
    color: "#10B981",
    desc: "Monitor delivery rates, opens, conversions, and revenue attribution in real time.",
  },
];

export const financeCards = [
  {
    label: "Monthly Revenue",
    value: "₦884,230",
    change: "↑ 22.4% vs last month",
    changeType: "up",
    color: "#4F46E5",
  },
  {
    label: "Total Expenses",
    value: "₦318,840",
    change: "↑ 5.1% vs last month",
    changeType: "down",
    color: "#EF4444",
  },
  {
    label: "Net Profit",
    value: "₦529,390",
    change: "↑ 34.8% margin",
    changeType: "up",
    color: "#10B981",
  },
  {
    label: "Pending Invoices",
    value: "₦120,500",
    change: "4 awaiting payment",
    changeType: "warn",
    color: "#F59E0B",
  },
];
