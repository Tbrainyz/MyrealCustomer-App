import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Header from '../components/layout/Header';
import { dashboardAPI } from '../api';
import { expensesAPI } from '../api'; // ← Added this
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const COLORS = ['#6272f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b6b8a'];
export default function CashFlow() {
  const [monthly, setMonthly] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Cash Flow (Monthly)
        const cashRes = await dashboardAPI.getCashFlow();
        const cashData = cashRes.data?.data || [];
        const formattedMonthly = cashData.map(d => ({
          ...d,
          net: (d.income || 0) - (d.expenses || 0)
        }));
        setMonthly(formattedMonthly);

        // Fetch Expenses and Compute Breakdown
        const expRes = await expensesAPI.getAll({
          limit: 1000
        });
        const expenses = expRes.data?.data || [];
        if (expenses.length > 0) {
          const breakdownMap = expenses.reduce((acc, exp) => {
            const category = exp.category || 'Other';
            acc[category] = (acc[category] || 0) + Number(exp.amount || 0);
            return acc;
          }, {});
          const breakdownArray = Object.entries(breakdownMap).map(([name, value]) => ({
            name,
            value: value
          }));
          setExpenseBreakdown(breakdownArray);
        } else {
          setExpenseBreakdown([]);
        }
      } catch (err) {
        console.error("Failed to fetch cash flow data:", err);
        setMonthly([]);
        setExpenseBreakdown([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const totalIncome = monthly.reduce((sum, item) => sum + (item.income || 0), 0);
  const totalExpenses = monthly.reduce((sum, item) => sum + (item.expenses || 0), 0);
  const netFlow = totalIncome - totalExpenses;
  if (loading) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Header, {
        title: "Cash Flow",
        subtitle: "Financial overview and trends"
      }), /*#__PURE__*/_jsx("div", {
        className: "p-6",
        children: /*#__PURE__*/_jsxs("div", {
          className: "animate-pulse space-y-6",
          children: [/*#__PURE__*/_jsx("div", {
            className: "grid grid-cols-3 gap-4",
            children: [1, 2, 3].map(i => /*#__PURE__*/_jsx("div", {
              className: "h-28 rounded-xl bg-brand-border"
            }, i))
          }), /*#__PURE__*/_jsx("div", {
            className: "h-96 rounded-xl bg-brand-border"
          })]
        })
      })]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Header, {
      title: "Cash Flow",
      subtitle: "Financial overview and trends"
    }), /*#__PURE__*/_jsxs("div", {
      className: "p-6 animate-fade-in space-y-8",
      children: [/*#__PURE__*/_jsx("div", {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        children: [{
          label: 'Total Income',
          value: `₦${totalIncome.toLocaleString()}`,
          icon: TrendingUp,
          color: 'bg-emerald-500/10 text-emerald-400'
        }, {
          label: 'Total Expenses',
          value: `₦${totalExpenses.toLocaleString()}`,
          icon: TrendingDown,
          color: 'bg-red-500/10 text-red-400'
        }, {
          label: 'Net Cash Flow',
          value: `₦${netFlow.toLocaleString()}`,
          icon: DollarSign,
          color: netFlow >= 0 ? 'bg-primary-500/10 text-primary-400' : 'bg-red-500/10 text-red-400'
        }].map((s, i) => /*#__PURE__*/_jsxs("div", {
          className: "card p-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3 mb-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-12 h-12 rounded-2xl flex items-center justify-center ${s.color}`,
              children: /*#__PURE__*/_jsx(s.icon, {
                size: 26
              })
            }), /*#__PURE__*/_jsx("span", {
              className: "text-sm text-brand-muted",
              children: s.label
            })]
          }), /*#__PURE__*/_jsx("p", {
            className: "text-4xl font-display font-bold text-white tracking-tight",
            children: s.value
          })]
        }, i))
      }), /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "card p-6 lg:col-span-2",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "section-title mb-4",
            children: "Income vs Expenses Trend"
          }), monthly.length > 0 ? /*#__PURE__*/_jsx(ResponsiveContainer, {
            width: "100%",
            height: 380,
            children: /*#__PURE__*/_jsxs(AreaChart, {
              data: monthly,
              children: [/*#__PURE__*/_jsxs("defs", {
                children: [/*#__PURE__*/_jsxs("linearGradient", {
                  id: "incomeGrad",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [/*#__PURE__*/_jsx("stop", {
                    offset: "5%",
                    stopColor: "#10b981",
                    stopOpacity: 0.35
                  }), /*#__PURE__*/_jsx("stop", {
                    offset: "95%",
                    stopColor: "#10b981",
                    stopOpacity: 0
                  })]
                }), /*#__PURE__*/_jsxs("linearGradient", {
                  id: "expenseGrad",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [/*#__PURE__*/_jsx("stop", {
                    offset: "5%",
                    stopColor: "#ef4444",
                    stopOpacity: 0.25
                  }), /*#__PURE__*/_jsx("stop", {
                    offset: "95%",
                    stopColor: "#ef4444",
                    stopOpacity: 0
                  })]
                })]
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
                  borderRadius: 10
                }
              }), /*#__PURE__*/_jsx(Area, {
                type: "monotone",
                dataKey: "income",
                stroke: "#10b981",
                fill: "url(#incomeGrad)",
                strokeWidth: 3
              }), /*#__PURE__*/_jsx(Area, {
                type: "monotone",
                dataKey: "expenses",
                stroke: "#ef4444",
                fill: "url(#expenseGrad)",
                strokeWidth: 3
              })]
            })
          }) : /*#__PURE__*/_jsx("div", {
            className: "h-96 flex items-center justify-center text-brand-muted",
            children: "No cash flow data available yet"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "card p-6",
          children: [/*#__PURE__*/_jsx("h3", {
            className: "section-title mb-5",
            children: "Expense Breakdown"
          }), expenseBreakdown.length > 0 ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex justify-center",
              children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: 240,
                children: /*#__PURE__*/_jsxs(PieChart, {
                  children: [/*#__PURE__*/_jsx(Pie, {
                    data: expenseBreakdown,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 68,
                    outerRadius: 105,
                    dataKey: "value",
                    nameKey: "name",
                    children: expenseBreakdown.map((entry, index) => /*#__PURE__*/_jsx(Cell, {
                      fill: COLORS[index % COLORS.length]
                    }, `cell-${index}`))
                  }), /*#__PURE__*/_jsx(Tooltip, {
                    contentStyle: {
                      background: '#161628',
                      border: '1px solid #2a2a4a',
                      borderRadius: 8
                    }
                  })]
                })
              })
            }), /*#__PURE__*/_jsx("div", {
              className: "mt-6 space-y-3",
              children: expenseBreakdown.map((item, i) => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between text-sm",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "w-3.5 h-3.5 rounded-full flex-shrink-0",
                    style: {
                      backgroundColor: COLORS[i % COLORS.length]
                    }
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-brand-muted",
                    children: item.name
                  })]
                }), /*#__PURE__*/_jsxs("span", {
                  className: "font-medium text-white",
                  children: ["\u20A6", item.value.toLocaleString()]
                })]
              }, i))
            })]
          }) : /*#__PURE__*/_jsxs("div", {
            className: "h-80 flex flex-col items-center justify-center text-brand-muted",
            children: [/*#__PURE__*/_jsx("p", {
              children: "No expenses recorded yet"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs mt-2",
              children: "Add some expenses to see breakdown here"
            })]
          })]
        })]
      })]
    })]
  });
}
