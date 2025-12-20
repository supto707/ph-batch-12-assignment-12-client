import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLogOut, FiMenu, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

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

  const beforeLoginLinks = (
    <>
      <li><NavLink to="/" className="text-sm font-medium text-gray-700 hover:text-primary-600">HOME</NavLink></li>
      <li><NavLink to="/products" className="text-sm font-medium text-gray-700 hover:text-primary-600">PRODUCTS</NavLink></li>
      <li><NavLink to="/about" className="text-sm font-medium text-gray-700 hover:text-primary-600">SERVICES</NavLink></li>
      <li><NavLink to="/contact" className="text-sm font-medium text-gray-700 hover:text-primary-600">ABOUT US</NavLink></li>
    </>
  );

  const afterLoginLinks = (
    <>
      <li><NavLink to="/" className="text-sm font-medium text-gray-700 hover:text-primary-600">HOME</NavLink></li>
      <li><NavLink to="/products" className="text-sm font-medium text-gray-700 hover:text-primary-600">PRODUCTS</NavLink></li>
      <li><NavLink to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary-600">DASHBOARD</NavLink></li>
    </>
  );

  return (
    <div className="navbar-clean sticky top-0 z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Garment
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {user ? afterLoginLinks : beforeLoginLinks}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          {/* <button className="p-2 text-gray-600 hover:text-gray-900">
            <FiSearch className="w-5 h-5" />
          </button> */}

          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={user.photoURL || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23ddd" width="150" height="150"/%3E%3Ctext x="50%" y="50%" font-size="12" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Photo%3C/text%3E%3C/svg%3E'} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                </label>
                <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200">
                  <li><Link to="/dashboard/profile" className="text-gray-700 hover:bg-gray-100 rounded-lg p-2"> Profile {user.displayName}</Link></li>
                  <li><span className="text-xs text-gray-500 px-2 py-1">{dbUser?.role}</span></li>
                </ul>
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <FiLogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link to="/register" className="btn-primary-clean">
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FiMenu className="w-5 h-5" />
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200">
              {user ? afterLoginLinks : beforeLoginLinks}
              {!user && (
                <>
                  <li><Link to="/login" className="text-gray-700 hover:bg-gray-100 rounded-lg p-2">Login</Link></li>
                  <li><Link to="/register" className="text-gray-700 hover:bg-gray-100 rounded-lg p-2">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;