import { useEffect, useState } from 'react';
import {
  Users, MessageSquare, TrendingUp, Package, Receipt,
  Wallet, ArrowLeftRight, Crown, BarChart3
} from 'lucide-react';
import Header from '../components/layout/Header';
import { StatCard, LoadingScreen } from '../components/ui';
import { dashboardAPI, invoicesAPI } from '../api';
import { useTheme } from '../context/ThemeContext';
import { useAuth, ROLE_LABELS } from '../context/AuthContext';
import { format } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';

const ROLE_WELCOME = {
  admin:             "Here is your full business overview.",
  inventory_manager: "Here is your inventory and stock overview.",
  finance_manager:   "Here is your financial overview.",
  messaging_manager: "Here is your messaging and contacts overview.",
};

export default function Dashboard() {
  const { dark }  = useTheme();
  const { user, isAdmin, hasRole } = useAuth();

  const [stats,    setStats]    = useState(null);
  const [cashflow, setCashflow] = useState([]);
  const [invoiceBreakdown, setInvoiceBreakdown] = useState({ paid: 0, pending: 0, overdue: 0 });
  const [loading,  setLoading]  = useState(true);

  const isFinance   = hasRole('finance_manager');
  const isInventory = hasRole('inventory_manager');
  const isMessaging = hasRole('messaging_manager');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const statsRes = await dashboardAPI.getStats();
        setStats(statsRes.data?.data || null);

        if (isAdmin || isFinance) {
          const [cashRes, invRes] = await Promise.all([
            dashboardAPI.getCashFlow(),
            invoicesAPI.getAll(),
          ]);
          const td = cashRes.data?.data || [];
          setCashflow(td.map(d => ({ month: d.month || d.name, income: d.income || 0, expenses: d.expenses || 0 })));
          const invs = invRes.data?.data || [];
          setInvoiceBreakdown({
            paid:    invs.filter(i => i.status === 'paid').length,
            pending: invs.filter(i => i.status === 'pending').length,
            overdue: invs.filter(i => i.status === 'overdue').length,
          });
        }
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally { setLoading(false); }
    })();
  }, [isAdmin, isFinance]);

  const gridStroke = dark ? '#2a2a4a' : '#e4e4f0';
  const tickFill   = dark ? '#6b6b8a' : '#9898b8';
  const tooltipStyle = {
    contentStyle: {
      background:   dark ? '#161628' : '#ffffff',
      border:       `1px solid ${dark ? '#2a2a4a' : '#e4e4f0'}`,
      borderRadius: 12,
      color:        dark ? '#ffffff' : '#1a1a2e',
      fontSize:     13,
    },
    itemStyle:  { color: dark ? '#c8c8e8' : '#444466' },
    labelStyle: { color: dark ? '#8888aa' : '#9898b8', fontWeight: 600 },
  };

  const Card = ({ title, children }) => (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );

  if (loading) return <><Header /><LoadingScreen /></>;

  return (
    <>
      <Header
        subtitle={`${ROLE_WELCOME[user?.role] || ''} • ${format(new Date(), 'EEEE, MMMM d, yyyy')}`}
      />
      <div className="p-5 lg:p-6 space-y-6 animate-fade-in">

        {/* ADMIN */}
        {isAdmin && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="Total Contacts"  value={stats?.totalContacts?.toLocaleString() || '0'} icon={Users}          color="blue"   />
            <StatCard label="Messages Sent"   value={stats?.messagesSent?.toLocaleString()  || '0'} icon={MessageSquare}  color="purple" />
            <StatCard label="Net Cash Flow"   value={`NGN ${(stats?.netCashFlow || 0).toLocaleString()}`} icon={TrendingUp} color="green" />
            <StatCard label="Low Stock Items" value={stats?.lowStockItems || 0}                     icon={Package}        color={stats?.lowStockItems > 0 ? 'red' : 'green'} />
            <StatCard label="Invoices"        value={invoiceBreakdown.paid + invoiceBreakdown.pending + invoiceBreakdown.overdue} icon={Receipt} color="yellow" />
          </div>
        )}

        {/* FINANCE */}
        {isFinance && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Paid Invoices"  value={invoiceBreakdown.paid}    icon={Receipt}   color="green"  />
            <StatCard label="Pending"        value={invoiceBreakdown.pending} icon={Receipt}   color="yellow" />
            <StatCard label="Overdue"        value={invoiceBreakdown.overdue} icon={Receipt}   color="red"    />
            <StatCard label="Net Cash Flow"  value={`NGN ${(stats?.netCashFlow || 0).toLocaleString()}`} icon={TrendingUp} color="purple" />
          </div>
        )}

        {/* INVENTORY */}
        {isInventory && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Products"   value={stats?.totalProducts  || 0} icon={Package}        color="blue"   />
            <StatCard label="Low Stock Alerts" value={stats?.lowStockItems  || 0} icon={Package}        color={stats?.lowStockItems > 0 ? 'red' : 'green'} />
            <StatCard label="Total Movements"  value={stats?.totalMovements || 0} icon={ArrowLeftRight} color="purple" />
          </div>
        )}

        {/* MESSAGING */}
        {isMessaging && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Contacts"  value={stats?.totalContacts  || 0} icon={Users}         color="blue"   />
            <StatCard label="Messages Sent"   value={stats?.messagesSent   || 0} icon={MessageSquare} color="purple" />
            <StatCard label="Scheduled"       value={stats?.scheduled      || 0} icon={BarChart3}     color="yellow" />
            <StatCard label="Failed Messages" value={stats?.failedMessages || 0} icon={MessageSquare} color="red"    />
          </div>
        )}

        {/* Finance charts - admin + finance only */}
        {(isAdmin || isFinance) && (
          <>
            <Card title="Invoice Breakdown">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { l: 'Paid',    v: invoiceBreakdown.paid,    bg: dark ? 'bg-emerald-500/10' : 'bg-emerald-50', t: dark ? 'text-emerald-400' : 'text-emerald-700', s: dark ? 'text-emerald-600' : 'text-emerald-500' },
                  { l: 'Pending', v: invoiceBreakdown.pending, bg: dark ? 'bg-yellow-500/10'  : 'bg-yellow-50',  t: dark ? 'text-yellow-400'  : 'text-yellow-700',  s: dark ? 'text-yellow-600'  : 'text-yellow-500'  },
                  { l: 'Overdue', v: invoiceBreakdown.overdue, bg: dark ? 'bg-red-500/10'     : 'bg-red-50',     t: dark ? 'text-red-400'     : 'text-red-700',     s: dark ? 'text-red-600'     : 'text-red-500'     },
                ].map(({ l, v, bg, t, s }) => (
                  <div key={l} className={`p-4 rounded-2xl ${bg}`}>
                    <p className={`text-3xl font-bold ${t}`}>{v}</p>
                    <p className={`text-sm font-medium mt-0.5 ${s}`}>{l}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue Trend">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={cashflow}>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 12 }} />
                    <YAxis tick={{ fill: tickFill, fontSize: 12 }} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" fill="url(#incomeGrad)" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Income vs Expenses">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={cashflow} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 12 }} />
                    <YAxis tick={{ fill: tickFill, fontSize: 12 }} />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ color: tickFill, fontSize: 12, paddingTop: 8 }} />
                    <Bar dataKey="income"   name="Income"   fill="#10b981" radius={[6,6,0,0]} maxBarSize={32} />
                    <Bar dataKey="expenses" name="Expenses" fill="#6272f1" radius={[6,6,0,0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {/* Role info banner for sub-users */}
        {!isAdmin && (
          <div className={`p-5 rounded-2xl border flex items-center gap-4
            ${dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-blue-50/60 border-blue-100'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
              ${dark ? 'bg-primary-500/15' : 'bg-primary-100'}`}>
              <Crown size={18} className={dark ? 'text-primary-400' : 'text-primary-600'} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-800'}`}>
                You are signed in as {ROLE_LABELS[user?.role]}
              </p>
              <p className="text-xs text-brand-muted mt-0.5">
                Your access is limited to your assigned section. Contact your administrator for changes.
              </p>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
