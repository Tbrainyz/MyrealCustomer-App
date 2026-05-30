import { useEffect, useState } from 'react';
import { Users, MessageSquare, TrendingUp, Package, Receipt } from 'lucide-react';
import Header from '../components/layout/Header';
import { StatCard, LoadingScreen } from '../components/ui';
import { dashboardAPI, invoicesAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [invoiceBreakdown, setInvoiceBreakdown] = useState({
    paid: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsRes, cashflowRes, invRes] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getCashFlow(),
          invoicesAPI.getAll()
        ]);

        setStats(statsRes.data?.data || null);

        const trendData = cashflowRes.data?.data || [];
        setMonthlyTrend(
          trendData.map(d => ({
            month: d.month || d.name,
            income: d.income || 0,
            expenses: d.expenses || 0
          }))
        );

        const invoices = invRes.data?.data || [];

        setInvoiceBreakdown({
          paid: invoices.filter(i => i.status === 'paid').length,
          pending: invoices.filter(i => i.status === 'pending').length,
          overdue: invoices.filter(i => i.status === 'overdue').length
        });

      } catch (err) {
        console.error("Dashboard data failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Header showGreeting />
        <LoadingScreen />
      </>
    );
  }

  const totalInvoices =
    invoiceBreakdown.paid +
    invoiceBreakdown.pending +
    invoiceBreakdown.overdue;

  return (
    <>
      <Header
        showGreeting
        subtitle={`Today is ${format(new Date(), 'EEEE, MMMM d, yyyy')}`}
      />

      <div className="p-6 space-y-8 animate-fade-in">

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

          <StatCard
            label="Total Contacts"
            value={stats.totalContacts?.toLocaleString() || '0'}
            icon={Users}
            color="blue"
          />

          <StatCard
            label="Messages Sent"
            value={stats.messagesSent?.toLocaleString() || '0'}
            icon={MessageSquare}
            color="purple"
          />

          <StatCard
            label="Net Cash Flow"
            value={`₦${(stats.netCashFlow || 0).toLocaleString()}`}
            icon={TrendingUp}
            color="green"
          />

          <StatCard
            label="Low Stock"
            value={stats.lowStockItems || 0}
            icon={Package}
            color={stats.lowStockItems > 0 ? 'red' : 'green'}
          />

          <StatCard
            label="Invoices"
            value={totalInvoices}
            icon={Receipt}
            color="yellow"
          />
        </div>

        {/* INVOICE BREAKDOWN (PIE SUBSTITUTE UI - SaaS STYLE) */}
        <div className="card p-6">
          <h3 className="section-title mb-4">Invoice Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="p-4 rounded-xl bg-green-500/10">
              <p className="text-sm text-brand-muted">Paid</p>
              <p className="text-2xl text-green-400 font-bold">
                {invoiceBreakdown.paid}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/10">
              <p className="text-sm text-brand-muted">Pending</p>
              <p className="text-2xl text-yellow-400 font-bold">
                {invoiceBreakdown.pending}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-red-500/10">
              <p className="text-sm text-brand-muted">Overdue</p>
              <p className="text-2xl text-red-400 font-bold">
                {invoiceBreakdown.overdue}
              </p>
            </div>

          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Revenue */}
          <div className="card p-6">
            <h3 className="section-title mb-4">Revenue Trend</h3>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                <XAxis dataKey="month" tick={{ fill: '#6b6b8a' }} />
                <YAxis tick={{ fill: '#6b6b8a' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  fill="#10b98133"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Income vs Expenses */}
          <div className="card p-6">
            <h3 className="section-title mb-4">Income vs Expenses</h3>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                <XAxis dataKey="month" tick={{ fill: '#6b6b8a' }} />
                <YAxis tick={{ fill: '#6b6b8a' }} />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </>
  );
}