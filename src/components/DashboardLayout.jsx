import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiPackage, FiShoppingCart, FiUsers, FiUser, FiPlus, FiCheckCircle } from 'react-icons/fi';

const DashboardLayout = () => {
  const { dbUser } = useAuth();



  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-white border-b border-gray-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-gray-900">Dashboard</span>
          </div>
        </div>
        
        <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
          <Outlet />
        </div>
      </div>
      
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-6 w-80 min-h-full bg-white border-r border-gray-200 text-gray-700">
          <li className="mb-4">
            <span className="text-2xl font-bold text-gray-900">Dashboard</span>
          </li>
          <li><Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiHome className="w-5 h-5" /> Home</Link></li>
          <li><Link to="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiUser className="w-5 h-5" /> My Profile</Link></li>
          
          <div className="divider my-4"></div>
          
          {dbUser?.role === 'admin' && (
            <>
              <li><Link to="/dashboard/manage-users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiUsers className="w-5 h-5" /> Manage Users</Link></li>
              <li><Link to="/dashboard/all-products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiPackage className="w-5 h-5" /> All Products</Link></li>
              <li><Link to="/dashboard/all-orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiShoppingCart className="w-5 h-5" /> All Orders</Link></li>
              <li><Link to="/dashboard/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">📊 Analytics</Link></li>
            </>
          )}
          {dbUser?.role === 'manager' && (
            <>
              <li><Link to="/dashboard/add-product" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiPlus className="w-5 h-5" /> Add Product</Link></li>
              <li><Link to="/dashboard/manage-products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiPackage className="w-5 h-5" /> Manage Products</Link></li>
              <li><Link to="/dashboard/pending-orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiShoppingCart className="w-5 h-5" /> Pending Orders</Link></li>
              <li><Link to="/dashboard/approved-orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiCheckCircle className="w-5 h-5" /> Approved Orders</Link></li>
            </>
          )}
          {dbUser?.role === 'buyer' && (
            <>
              <li><Link to="/dashboard/my-orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"><FiShoppingCart className="w-5 h-5" /> My Orders</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
