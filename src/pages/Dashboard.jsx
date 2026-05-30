import { useEffect, useState } from 'react';
import { Users, MessageSquare, TrendingUp, Package } from 'lucide-react';
import Header from '../components/layout/Header';
import { StatCard, LoadingScreen } from '../components/ui';
import { dashboardAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export default function Dashboard() {
  const {
    user
  } = useAuth();
  const [stats, setStats] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsRes, cashflowRes] = await Promise.all([dashboardAPI.getStats(), dashboardAPI.getCashFlow()]);
        setStats(statsRes.data?.data || null);
        const trendData = cashflowRes.data?.data || [];
        setMonthlyTrend(trendData.map(d => ({
          month: d.month || d.name,
          income: d.income || 0,
          expenses: d.expenses || 0
        })));
      } catch (err) {
        console.error("Dashboard data failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  if (loading) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Header, {
        showGreeting: true
      }), /*#__PURE__*/_jsx(LoadingScreen, {})]
    });
  }
  if (!stats) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Header, {
        showGreeting: true
      }), /*#__PURE__*/_jsx("div", {
        className: "p-6",
        children: /*#__PURE__*/_jsx("p", {
          className: "text-brand-muted",
          children: "Unable to load dashboard data. Please check your connection."
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      showGreeting: true,
      subtitle: `Today is ${format(new Date(), 'EEEE, MMMM d, yyyy')}`
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 space-y-8 animate-fade-in",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        children: [/*#__PURE__*/_jsx(StatCard, {
          label: "Total Contacts",
          value: stats.totalContacts?.toLocaleString() || '0',
          icon: Users,
          color: "blue"
        }), /*#__PURE__*/_jsx(StatCard, {
          label: "Messages Sent",
          value: stats.messagesSent?.toLocaleString() || '0',
          icon: MessageSquare,
          color: "purple"
        }), /*#__PURE__*/_jsx(StatCard, {
          label: "Net Cash Flow",
          value: `₦${(stats.netCashFlow || 0).toLocaleString()}`,
          icon: TrendingUp,
          color: "green"
        }), /*#__PURE__*/_jsx(StatCard, {
          label: "Low Stock Items",
          value: stats.lowStockItems || 0,
          icon: Package,
          color: stats.lowStockItems > 0 ? 'red' : 'green'
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "card p-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "section-title mb-4",
            children: "Revenue Trend"
          }), monthlyTrend.length > 0 ? /*#__PURE__*/_jsx(ResponsiveContainer, {
            width: "100%",
            height: 320,
            children: /*#__PURE__*/_jsxs(AreaChart, {
              data: monthlyTrend,
              children: [/*#__PURE__*/_jsx("defs", {
                children: /*#__PURE__*/_jsxs("linearGradient", {
                  id: "colorIncome",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [/*#__PURE__*/_jsx("stop", {
                    offset: "5%",
                    stopColor: "#10b981",
                    stopOpacity: 0.3
                  }), /*#__PURE__*/_jsx("stop", {
                    offset: "95%",
                    stopColor: "#10b981",
                    stopOpacity: 0
                  })]
                })
              }), /*#__PURE__*/_jsx(CartesianGrid, {
                strokeDasharray: "3 3",
                stroke: "#2a2a4a"
              }), /*#__PURE__*/_jsx(XAxis, {
                dataKey: "month",
                tick: {
                  fill: '#6b6b8a',
                  fontSize: 12
                }
              }), /*#__PURE__*/_jsx(YAxis, {
                tick: {
                  fill: '#6b6b8a',
                  fontSize: 12
                },
                tickFormatter: v => `₦${(v / 1000000).toFixed(1)}M`
              }), /*#__PURE__*/_jsx(Tooltip, {
                contentStyle: {
                  background: '#161628',
                  border: '1px solid #2a2a4a',
                  borderRadius: 8
                }
              }), /*#__PURE__*/_jsx(Area, {
                type: "monotone",
                dataKey: "income",
                stroke: "#10b981",
                fill: "url(#colorIncome)",
                strokeWidth: 3
              })]
            })
          }) : /*#__PURE__*/_jsx("div", {
            className: "h-80 flex items-center justify-center text-brand-muted",
            children: "Revenue trend will appear here"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "card p-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "section-title mb-4",
            children: "Income vs Expenses"
          }), monthlyTrend.length > 0 ? /*#__PURE__*/_jsx(ResponsiveContainer, {
            width: "100%",
            height: 320,
            children: /*#__PURE__*/_jsxs(BarChart, {
              data: monthlyTrend,
              children: [/*#__PURE__*/_jsx(CartesianGrid, {
                strokeDasharray: "3 3",
                stroke: "#2a2a4a"
              }), /*#__PURE__*/_jsx(XAxis, {
                dataKey: "month",
                tick: {
                  fill: '#6b6b8a'
                }
              }), /*#__PURE__*/_jsx(YAxis, {
                tick: {
                  fill: '#6b6b8a'
                },
                tickFormatter: v => `₦${(v / 1000000).toFixed(1)}M`
              }), /*#__PURE__*/_jsx(Tooltip, {
                contentStyle: {
                  background: '#161628',
                  border: 'none',
                  borderRadius: 8
                }
              }), /*#__PURE__*/_jsx(Bar, {
                dataKey: "income",
                fill: "#10b981",
                name: "Income",
                radius: 6
              }), /*#__PURE__*/_jsx(Bar, {
                dataKey: "expenses",
                fill: "#ef4444",
                name: "Expenses",
                radius: 6
              })]
            })
          }) : /*#__PURE__*/_jsx("div", {
            className: "h-80 flex items-center justify-center text-brand-muted",
            children: "Income vs Expenses chart will appear here"
          })]
        })]
      })]
    })]
  });
}
