import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Layout from './components/layout/Layout';
import MainLayout from './layouts/MainLayout';

// Public pages
import Home          from './pages/Home';
import Login         from './pages/Login';
import Register      from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard pages
import Dashboard     from './pages/Dashboard';
import Contacts      from './pages/Contacts';
import Compose       from './pages/Compose';
import Scheduled     from './pages/Scheduled';
import Templates     from './pages/Templates';
import MessageLogs   from './pages/MessageLogs';
import Invoices      from './pages/Invoices';
import Expenses      from './pages/Expenses';
import CashFlow      from './pages/CashFlow';
import Inventory     from './pages/Inventory';
import StockMovements from './pages/StockMovements';
import Settings      from './pages/Settings';
import Team          from './pages/Team';
import AccessDenied  from './components/AccessDenied';

// ─── Loading spinner ──────────────────────────────────────────────────────────
function AppLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f1a]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-sm text-brand-muted">Loading…</p>
      </div>
    </div>
  );
}

// ─── Private route ────────────────────────────────────────────────────────────
function PrivateRoute({ children, roles }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <AppLoading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles) {
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(user?.role) && user?.role !== 'admin') {
      return <Layout><AccessDenied requiredRole={allowed} /></Layout>;
    }
  }

  return <Layout>{children}</Layout>;
}

// ─── Public route ─────────────────────────────────────────────────────────────
function PublicRoute({ children, allowIfLoggedIn = false }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <AppLoading />;
  if (!allowIfLoggedIn && isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

// ─── Routes ───────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Marketing */}
      <Route path="/"         element={<MainLayout><Home /></MainLayout>} />
      <Route path="/features" element={<MainLayout><div className="flex items-center justify-center h-96"><p className="text-brand-muted">Coming soon</p></div></MainLayout>} />
      <Route path="/pricing"  element={<MainLayout><div className="flex items-center justify-center h-96"><p className="text-brand-muted">Coming soon</p></div></MainLayout>} />

      {/* Auth */}
      <Route path="/login"           element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register"        element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute allowIfLoggedIn><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password"  element={<PublicRoute allowIfLoggedIn><ResetPassword /></PublicRoute>} />

      {/* Dashboard — all authenticated users */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/settings"  element={<PrivateRoute><Settings /></PrivateRoute>} />

      {/* Inventory */}
      <Route path="/inventory"       element={<PrivateRoute roles={['inventory_manager']}><Inventory /></PrivateRoute>} />
      <Route path="/stock-movements" element={<PrivateRoute roles={['inventory_manager']}><StockMovements /></PrivateRoute>} />

      {/* Finance */}
      <Route path="/invoices" element={<PrivateRoute roles={['finance_manager']}><Invoices /></PrivateRoute>} />
      <Route path="/expenses" element={<PrivateRoute roles={['finance_manager']}><Expenses /></PrivateRoute>} />
      <Route path="/cashflow" element={<PrivateRoute roles={['finance_manager']}><CashFlow /></PrivateRoute>} />

      {/* Messaging */}
      <Route path="/contacts"  element={<PrivateRoute roles={['messaging_manager']}><Contacts /></PrivateRoute>} />
      <Route path="/compose"   element={<PrivateRoute roles={['messaging_manager']}><Compose /></PrivateRoute>} />
      <Route path="/scheduled" element={<PrivateRoute roles={['messaging_manager']}><Scheduled /></PrivateRoute>} />
      <Route path="/templates" element={<PrivateRoute roles={['messaging_manager']}><Templates /></PrivateRoute>} />
      <Route path="/logs"      element={<PrivateRoute roles={['messaging_manager']}><MessageLogs /></PrivateRoute>} />

      {/* Team — admin only */}
      <Route path="/team" element={<PrivateRoute roles={['admin']}><Team /></PrivateRoute>} />

      {/* 404 */}
      <Route path="*" element={<MainLayout><div className="flex flex-col items-center justify-center h-96 gap-3"><p className="text-2xl font-bold text-slate-900 dark:text-white">404</p><p className="text-brand-muted">Page not found</p></div></MainLayout>} />
    </Routes>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1a1a2e',
                  color:      '#fff',
                  border:     '1px solid #2a2a4a',
                },
              }}
            />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
