import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Layout from './components/layout/Layout';
import MainLayout from './layouts/MainLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Compose from './pages/Compose';
import Scheduled from './pages/Scheduled';
import Templates from './pages/Templates';
import MessageLogs from './pages/MessageLogs';
import Invoices from './pages/Invoices';
import Expenses from './pages/Expenses';
import CashFlow from './pages/CashFlow';
import Inventory from './pages/Inventory';
import StockMovements from './pages/StockMovements';
import Settings from './pages/Settings';


// Placeholder Pages
function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold mb-4 gradient-text">
          {title}
        </h1>

        <p className="text-slate-400">
          Coming soon — this page is under construction.
        </p>

        <a
          href="/"
          className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
        >
          ← Back to home
        </a>
      </div>
    </div>
  );
}


// Private Route
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-darker">
        <div className="text-brand-muted">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}


// Public Route
function PublicRoute({ children, allowIfLoggedIn = false }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-darker">
        <div className="text-brand-muted">Loading...</div>
      </div>
    );
  }

  if (allowIfLoggedIn) {
    return children;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// Routes
function AppRoutes() {
  return (
    <Routes>

      {/* Marketing / Landing Pages */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/features"
        element={
          <MainLayout>
            <Placeholder title="Features" />
          </MainLayout>
        }
      />

      <Route
        path="/pricing"
        element={
          <MainLayout>
            <Placeholder title="Pricing" />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Placeholder title="Contact" />
          </MainLayout>
        }
      />

      <Route
        path="/demo"
        element={
          <MainLayout>
            <Placeholder title="Dashboard Demo" />
          </MainLayout>
        }
      />


      {/* Auth Pages */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute allowIfLoggedIn={true}>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicRoute allowIfLoggedIn={true}>
            <ResetPassword />
          </PublicRoute>
        }
      />


      {/* Protected Dashboard Pages */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/contacts"
        element={
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        }
      />

      <Route
        path="/compose"
        element={
          <PrivateRoute>
            <Compose />
          </PrivateRoute>
        }
      />

      <Route
        path="/scheduled"
        element={
          <PrivateRoute>
            <Scheduled />
          </PrivateRoute>
        }
      />

      <Route
        path="/templates"
        element={
          <PrivateRoute>
            <Templates />
          </PrivateRoute>
        }
      />

      <Route
        path="/logs"
        element={
          <PrivateRoute>
            <MessageLogs />
          </PrivateRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        }
      />

      <Route
        path="/cashflow"
        element={
          <PrivateRoute>
            <CashFlow />
          </PrivateRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
      />

      <Route
        path="/stock-movements"
        element={
          <PrivateRoute>
            <StockMovements />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />


      {/* 404 */}
      <Route
        path="*"
        element={
          <MainLayout>
            <Placeholder title="404 — Page Not Found" />
          </MainLayout>
        }
      />

    </Routes>
  );
}


// Main App
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}