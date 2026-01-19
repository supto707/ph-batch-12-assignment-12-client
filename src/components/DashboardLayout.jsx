import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiPackage, FiShoppingCart, FiUsers, FiUser, FiPlus, FiCheckCircle, FiActivity, FiLogOut, FiMenu, FiGrid } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { dbUser, logout } = useAuth();
  const location = useLocation();

  const menuItems = {
    admin: [
      { path: '/dashboard', label: 'Overview', icon: FiGrid },
      { path: '/dashboard/manage-users', label: 'Workforce', icon: FiUsers },
      { path: '/dashboard/all-products', label: 'Catalog', icon: FiPackage },
      { path: '/dashboard/all-orders', label: 'Logistics', icon: FiShoppingCart },
      { path: '/dashboard/analytics', label: 'Intelligence', icon: FiActivity },
    ],
    manager: [
      { path: '/dashboard', label: 'Terminal', icon: FiGrid },
      { path: '/dashboard/add-product', label: 'Deploy Item', icon: FiPlus },
      { path: '/dashboard/manage-products', label: 'Inventory', icon: FiPackage },
      { path: '/dashboard/pending-orders', label: 'Approvals', icon: FiShoppingCart },
      { path: '/dashboard/approved-orders', label: 'Verified', icon: FiCheckCircle },
    ],
    buyer: [
      { path: '/dashboard', label: 'My Terminal', icon: FiGrid },
      { path: '/dashboard/my-orders', label: 'Acquisitions', icon: FiShoppingCart },
    ]
  };

  const currentMenu = menuItems[dbUser?.role] || [];

  return (
    <div className="drawer lg:drawer-open bg-[var(--bg-main)]">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="navbar bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border)] lg:hidden sticky top-0 z-50">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost text-[var(--text-main)]">
              <FiMenu size={20} />
            </label>
          </div>
          <div className="flex-1 px-4">
            <span className="text-sm font-black uppercase tracking-widest text-[var(--text-main)]">
              Dashboard <span className="text-[var(--primary)]">Terminal</span>
            </span>
          </div>
        </div>

        <main className="p-6 lg:p-12 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div className="w-80 min-h-full bg-[var(--bg-card)] border-r border-[var(--border)] p-6 flex flex-col">
          {/* Logo Section */}
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
              <FiActivity className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--text-main)] tracking-tight leading-none">CORE <span className="text-[var(--primary)]">UI</span></h2>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Control Center</span>
            </div>
          </div>

          <ul className="space-y-1.5 flex-grow">
            <li className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4 px-2">Operational Nodes</li>

            <li>
              <Link to="/" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[var(--text-secondary)] font-bold hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] transition-all group">
                <FiHome className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Public Interface</span>
              </Link>
            </li>

            <div className="divider opacity-5 my-4"></div>

            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                        ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
                      }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-sm font-bold">{item.label}</span>
                  </Link>
                </li>
              );
            })}

            <li>
              <Link to="/dashboard/profile" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${location.pathname === '/dashboard/profile'
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
                }`}>
                <FiUser className="w-5 h-5" />
                <span className="text-sm font-bold">Profile Identity</span>
              </Link>
            </li>
          </ul>

          {/* Footer Info */}
          <div className="mt-auto pt-8">
            <div className="glass-card p-4 border border-[var(--border)] relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Access Tier</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[var(--text-main)] capitalize">{dbUser?.role} Account</span>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${dbUser?.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                <FiShield className="w-12 h-12" />
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full mt-4 flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 font-bold hover:bg-rose-500/5 transition-all text-left"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest font-black">Disconnect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

const FiShield = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
