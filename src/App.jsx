import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import Layout from "./components/layout/Layout";
import MainLayout from "./layouts/MainLayout";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Compose from "./pages/Compose";
import Scheduled from "./pages/Scheduled";
import Templates from "./pages/Templates";
import MessageLogs from "./pages/MessageLogs";
import Invoices from "./pages/Invoices";
import Expenses from "./pages/Expenses";
import CashFlow from "./pages/CashFlow";
import Inventory from "./pages/Inventory";
import StockMovements from "./pages/StockMovements";
import Settings from "./pages/Settings";
import Team from "./pages/Team";

// ─── Routes ───────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Marketing */}
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
            <div className="flex items-center justify-center h-96">
              <p className="text-brand-muted">Coming soon</p>
            </div>
          </MainLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <MainLayout>
            <div className="flex items-center justify-center h-96">
              <p className="text-brand-muted">Coming soon</p>
            </div>
          </MainLayout>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />

      {/* Inventory */}
      <Route
        path="/inventory"
        element={
          <Layout>
            <Inventory />
          </Layout>
        }
      />
      <Route
        path="/stock-movements"
        element={
          <Layout>
            <StockMovements />
          </Layout>
        }
      />

      {/* Finance */}
      <Route
        path="/invoices"
        element={
          <Layout>
            <Invoices />
          </Layout>
        }
      />
      <Route
        path="/expenses"
        element={
          <Layout>
            <Expenses />
          </Layout>
        }
      />
      <Route
        path="/cashflow"
        element={
          <Layout>
            <CashFlow />
          </Layout>
        }
      />

      {/* Messaging */}
      <Route
        path="/contacts"
        element={
          <Layout>
            <Contacts />
          </Layout>
        }
      />
      <Route
        path="/compose"
        element={
          <Layout>
            <Compose />
          </Layout>
        }
      />
      <Route
        path="/scheduled"
        element={
          <Layout>
            <Scheduled />
          </Layout>
        }
      />
      <Route
        path="/templates"
        element={
          <Layout>
            <Templates />
          </Layout>
        }
      />
      <Route
        path="/logs"
        element={
          <Layout>
            <MessageLogs />
          </Layout>
        }
      />

      {/* Team */}
      <Route
        path="/team"
        element={
          <Layout>
            <Team />
          </Layout>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <MainLayout>
            <div className="flex flex-col items-center justify-center h-96 gap-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                404
              </p>
              <p className="text-brand-muted">Page not found</p>
            </div>
          </MainLayout>
        }
      />
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
                  background: "#1a1a2e",
                  color: "#fff",
                  border: "1px solid #2a2a4a",
                },
              }}
            />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
