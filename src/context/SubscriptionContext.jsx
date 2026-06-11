import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { subscriptionAPI } from '../api';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const [subscription, setSubscription] = useState(null);
  const [loading,      setLoading]      = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!isAuthenticated || !user) { setLoading(false); return; }
    try {
      const res = await subscriptionAPI.getStatus();
      setSubscription(res.data.data);
    } catch {
      setSubscription(null);
    } finally { setLoading(false); }
  }, [isAuthenticated, user]);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  // Derived helpers
  const isAdmin        = user?.role === 'admin';
  const hasAccess      = !isAdmin || subscription?.hasAccess !== false;
  const isTrialActive  = subscription?.status === 'trial' && (subscription?.trialDaysLeft || 0) > 0;
  const isTrialExpired = isAdmin && subscription?.status === 'trial' && (subscription?.trialDaysLeft || 0) <= 0 && subscription?.hasAccess === false;
  const isSubscribed   = subscription?.status === 'active';
  const trialDaysLeft  = subscription?.trialDaysLeft || 0;
  const bypassTrial    = subscription?.bypassTrial || false;

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      loading,
      fetchStatus,
      hasAccess,
      isTrialActive,
      isTrialExpired,
      isSubscribed,
      trialDaysLeft,
      bypassTrial,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used inside SubscriptionProvider');
  return ctx;
};
