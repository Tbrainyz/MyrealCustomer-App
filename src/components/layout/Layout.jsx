import Sidebar from './Sidebar';
import Header from './Header';
import TrialBanner from '../TrialBanner';
import TrialExpiredWall from '../TrialExpiredWall';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

export default function Layout({ children }) {
  const { isTrialExpired, loading } = useSubscription();
  const { user } = useAuth();

  return (
    <div className="admin-shell flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Trial banner — only shows when trial is active and running low */}
        <TrialBanner />

        <main className="admin-main flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>

      {/* Full screen paywall — shown when trial has expired */}
      {!loading && isTrialExpired && <TrialExpiredWall />}
    </div>
  );
}
