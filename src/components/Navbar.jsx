import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLogOut, FiMenu, FiPackage, FiGrid } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, dbUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navItemClass = ({ isActive }) =>
    `text-sm font-bold tracking-tight transition-all duration-300 hover:text-[var(--primary)] ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-main)]'
    }`;

  const desktopLinks = (
    <ul className="flex items-center space-x-10">
      <li><NavLink to="/" className={navItemClass}>HOME</NavLink></li>
      <li><NavLink to="/products" className={navItemClass}>COLLECTION</NavLink></li>
      {user && <li><NavLink to="/dashboard" className={navItemClass}>DASHBOARD</NavLink></li>}
      <li><NavLink to="/about" className={navItemClass}>SERVICES</NavLink></li>
      <li><NavLink to="/blog" className={navItemClass}>BLOG</NavLink></li>
      <li><NavLink to="/faq" className={navItemClass}>FAQ</NavLink></li>
      <li><NavLink to="/contact" className={navItemClass}>CONTACT</NavLink></li>
    </ul>
  );

  return (
    <nav className="navbar-clean">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FiPackage className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black text-[var(--text-main)] tracking-tighter">
            Garment<span className="text-[var(--primary)]">House</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          {desktopLinks}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border)] cursor-pointer transition-all">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-inner ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--bg-card)]">
                    <img src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs font-black text-[var(--text-main)] line-clamp-1">{user.displayName}</div>
                    <div className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">{dbUser?.role || 'User'}</div>
                  </div>
                </label>
                <ul tabIndex={0} className="menu dropdown-content mt-4 z-[100] p-2 shadow-2xl bg-[var(--bg-card)] rounded-2xl w-56 border border-[var(--border)] backdrop-blur-xl">
                  <li><Link to="/dashboard/profile" className="flex items-center gap-2 p-3 font-bold text-[var(--text-main)] hover:bg-[var(--bg-secondary)] rounded-xl">View Profile</Link></li>
                  <li><Link to="/dashboard" className="flex items-center gap-2 p-3 font-bold text-[var(--text-main)] hover:bg-[var(--bg-secondary)] rounded-xl">My Dashboard</Link></li>
                  <div className="border-t border-[var(--border)] my-2"></div>
                  <li>
                    <button onClick={handleLogout} className="flex items-center gap-2 p-3 font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl">
                      <FiLogOut /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary-clean !py-2.5 !px-6 !text-xs shadow-lg">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="p-2.5 text-[var(--text-main)] hover:bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] cursor-pointer transition-all block">
              <FiMenu className="w-5 h-5" />
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-4 z-[100] p-3 shadow-2xl bg-[var(--bg-card)] rounded-2xl w-64 border border-[var(--border)]">
              {user ? (
                <>
                  <div className="px-4 py-3 mb-2 border-b border-[var(--border)]">
                    <div className="font-black text-[var(--text-main)]">{user.displayName}</div>
                    <div className="text-xs text-[var(--primary)] font-bold uppercase">{dbUser?.role}</div>
                  </div>
                  <li><NavLink to="/" className="p-3 font-bold text-[var(--text-main)]">HOME</NavLink></li>
                  <li><NavLink to="/products" className="p-3 font-bold text-[var(--text-main)]">COLLECTION</NavLink></li>
                  <li><NavLink to="/dashboard" className="p-3 font-bold text-[var(--text-main)]">DASHBOARD</NavLink></li>
                  <li><NavLink to="/about" className="p-3 font-bold text-[var(--text-main)]">SERVICES</NavLink></li>
                  <li><NavLink to="/blog" className="p-3 font-bold text-[var(--text-main)]">BLOG</NavLink></li>
                  <li><NavLink to="/faq" className="p-3 font-bold text-[var(--text-main)]">FAQ</NavLink></li>
                  <li><NavLink to="/contact" className="p-3 font-bold text-[var(--text-main)]">CONTACT</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className="p-3 font-bold text-[var(--text-main)]">HOME</NavLink></li>
                  <li><NavLink to="/products" className="p-3 font-bold text-[var(--text-main)]">COLLECTION</NavLink></li>
                  <li><NavLink to="/about" className="p-3 font-bold text-[var(--text-main)]">SERVICES</NavLink></li>
                  <li><NavLink to="/blog" className="p-3 font-bold text-[var(--text-main)]">BLOG</NavLink></li>
                  <li><NavLink to="/faq" className="p-3 font-bold text-[var(--text-main)]">FAQ</NavLink></li>
                  <li><NavLink to="/contact" className="p-3 font-bold text-[var(--text-main)]">CONTACT</NavLink></li>
                  <div className="border-t border-[var(--border)] my-2"></div>
                  <li><Link to="/login" className="p-3 font-bold text-[var(--text-main)]">Sign In</Link></li>
                  <li><Link to="/register" className="p-3 font-bold text-[var(--primary)]">Create Account</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;