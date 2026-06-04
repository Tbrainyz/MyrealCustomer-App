import Sidebar from './Sidebar';
import '../../styles/admin.css';

export default function Layout({ children }) {
  return (
    <div className="admin-shell flex h-screen overflow-hidden">
      <Sidebar />
      <main className="admin-main flex-1 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
