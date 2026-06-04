import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import Header from '../components/layout/Header';
import { dashboardAPI, expensesAPI } from '../api';



const COLORS = [
  '#6272f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#6b6b6b'
];

export default function CashFlow() {
  const { dark } = useTheme();
  const [monthly, setMonthly] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cashRes = await dashboardAPI.getCashFlow();
        const cashData = cashRes.data?.data || [];

        setMonthly(
          cashData.map(d => ({
            ...d,
            net: (d.income || 0) - (d.expenses || 0)
          }))
        );

        const expRes = await expensesAPI.getAll({ limit: 1000 });
        const expenses = expRes.data?.data || [];

        const map = expenses.reduce((acc, e) => {
          const cat = e.category || 'Other';
          acc[cat] = (acc[cat] || 0) + Number(e.amount || 0);
          return acc;
        }, {});

        setExpenseBreakdown(
          Object.entries(map).map(([name, value]) => ({ name, value }))
        );

      } catch (err) {
        console.error(err);
        setMonthly([]);
        setExpenseBreakdown([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIncome = monthly.reduce((a, b) => a + (b.income || 0), 0);
  const totalExpenses = monthly.reduce((a, b) => a + (b.expenses || 0), 0);
  const netFlow = totalIncome - totalExpenses;

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <>
        <Header title="Cash Flow" subtitle="Financial intelligence overview" />
        <div className="p-6 space-y-6 animate-pulse">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-brand-border rounded-xl" />
            ))}
          </div>
          <div className="h-96 bg-brand-border rounded-xl" />
        </div>
      </>
    );
  }

  // ---------------- UI ----------------
  return (
    <>
      <Header
        title="Cash Flow Intelligence"
        subtitle="Revenue, expense & profitability analytics"
      />

      <div className="p-6 space-y-8 animate-fade-in">

        {/* KPI STRIP (PREMIUM) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="card p-5 border border-brand-border/50">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp size={18} />
              <span className="text-xs text-brand-muted">Total Income</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              ₦{totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="card p-5 border border-brand-border/50">
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown size={18} />
              <span className="text-xs text-brand-muted">Total Expenses</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              ₦{totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="card p-5 border border-brand-border/50">
            <div className="flex items-center gap-2 text-primary-400">
              <DollarSign size={18} />
              <span className="text-xs text-brand-muted">Net Profit</span>
            </div>
            <p
              className={`text-2xl font-bold mt-2 ${
                netFlow >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              ₦{netFlow.toLocaleString()}
            </p>
          </div>
        </div>

        {/* CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* MAIN TREND */}
          <div className="card p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Monthly Cash Flow Trend
            </h3>

            {monthly.length > 0 ? (
              <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={monthly}>

                  <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke={dark ? "#2a2a4a" : "#e8e8f4"} strokeDasharray="3 3" />

                  <XAxis dataKey="month" tick={{ fill: dark ? '#6b6b8a' : '#9898b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: dark ? '#6b6b8a' : '#9898b8', fontSize: 12 }} />

                  <Tooltip
                    contentStyle={{
                      background: '#161628',
                      border: '1px solid #2a2a4a'
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    fill="url(#income)"
                  />

                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    fill="url(#expense)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-brand-muted">
                No financial data available yet
              </div>
            )}
          </div>

          {/* PIE ANALYTICS */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Expense Distribution
            </h3>

            {expenseBreakdown.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                    >
                      {expenseBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: '#161628',
                        border: '1px solid #2a2a4a'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2">
                  {expenseBreakdown.map((e, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            background: COLORS[i % COLORS.length]
                          }}
                        />
                        <span className="text-brand-muted">{e.name}</span>
                      </div>
                      <span className="text-slate-900 dark:text-white">
                        ₦{e.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center text-brand-muted">
                <p>No expense data</p>
                <p className="text-xs mt-1">Add expenses to see analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}