import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiShoppingCart, FiUsers, FiTrendingUp } from 'react-icons/fi';

const DashboardHome = () => {
  const { dbUser, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbUser?.role === 'admin') {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [dbUser]);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`, {
        withCredentials: true
      });
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`card bg-gradient-to-br ${color} shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105`}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80 font-medium">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <Icon className="w-12 h-12 opacity-80" />
        </div>
      </div>
    </div>
  );

  const QuickLink = ({ icon: Icon, label, description, onClick }) => (
    <div
      onClick={onClick}
      className="card bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="card-body items-center text-center">
        <Icon className="w-8 h-8 text-primary mb-2" />
        <h3 className="font-semibold text-gray-900">{label}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, <span className="text-primary">{user?.displayName || 'User'}</span>! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          {dbUser?.role === 'admin' && 'Manage your platform and view analytics'}
          {dbUser?.role === 'manager' && 'Manage your products and orders'}
          {dbUser?.role === 'buyer' && 'Track your orders and purchases'}
        </p>
      </div>

      {/* Admin Dashboard */}
      {dbUser?.role === 'admin' && (
        <>
          {/* Stats Section */}
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={FiPackage}
                  label="Total Products"
                  value={stats?.totalProducts || 0}
                  color="from-blue-400 to-blue-600"
                  onClick={() => navigate('/dashboard/all-products')}
                />
                <StatCard
                  icon={FiShoppingCart}
                  label="Total Orders"
                  value={stats?.totalOrders || 0}
                  color="from-purple-400 to-purple-600"
                  onClick={() => navigate('/dashboard/all-orders')}
                />
                <StatCard
                  icon={FiUsers}
                  label="Total Users"
                  value={stats?.totalUsers || 0}
                  color="from-green-400 to-green-600"
                  onClick={() => navigate('/dashboard/manage-users')}
                />
                <StatCard
                  icon={FiTrendingUp}
                  label="Total Revenue"
                  value={`$${(stats?.revenue || 0).toLocaleString()}`}
                  color="from-orange-400 to-orange-600"
                  onClick={() => navigate('/dashboard/analytics')}
                />
              </div>

              {/* Quick Links */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <QuickLink
                    icon={FiUsers}
                    label="Manage Users"
                    description="View and manage all users"
                    onClick={() => navigate('/dashboard/manage-users')}
                  />
                  <QuickLink
                    icon={FiPackage}
                    label="All Products"
                    description="Browse all products"
                    onClick={() => navigate('/dashboard/all-products')}
                  />
                  <QuickLink
                    icon={FiShoppingCart}
                    label="All Orders"
                    description="Monitor orders"
                    onClick={() => navigate('/dashboard/all-orders')}
                  />
                  <QuickLink
                    icon={FiTrendingUp}
                    label="Analytics"
                    description="View detailed analytics"
                    onClick={() => navigate('/dashboard/analytics')}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Manager Dashboard */}
      {dbUser?.role === 'manager' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Quick Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickLink
                  icon={FiPackage}
                  label="Add Product"
                  description="Create new product"
                  onClick={() => navigate('/dashboard/add-product')}
                />
                <QuickLink
                  icon={FiPackage}
                  label="Manage Products"
                  description="Edit your products"
                  onClick={() => navigate('/dashboard/manage-products')}
                />
                <QuickLink
                  icon={FiShoppingCart}
                  label="Pending Orders"
                  description="Review new orders"
                  onClick={() => navigate('/dashboard/pending-orders')}
                />
                <QuickLink
                  icon={FiShoppingCart}
                  label="Approved Orders"
                  description="View approved orders"
                  onClick={() => navigate('/dashboard/approved-orders')}
                />
              </div>
            </div>

            {/* Welcome Card */}
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="card-body">
                <h3 className="card-title text-xl">📦 Product Management</h3>
                <p className="text-sm text-gray-700">
                  Manage your product inventory, handle customer orders, and track shipments all in one place. Make sure to keep your product information up-to-date!
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-600">
                    <strong>📝 Add Product:</strong> Create and list new items
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>✏️ Manage:</strong> Edit prices, inventory, and details
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>📦 Orders:</strong> Process pending orders as they come in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Buyer Dashboard */}
      {dbUser?.role === 'buyer' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <QuickLink
              icon={FiShoppingCart}
              label="My Orders"
              description="View your purchases"
              onClick={() => navigate('/dashboard/my-orders')}
            />
            
            {/* Welcome Card */}
            <div className="lg:col-span-2 card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="card-body">
                <h3 className="card-title text-xl">🛍️ Welcome to Your Dashboard</h3>
                <p className="text-sm text-gray-700">
                  Track your orders, manage your profile, and stay updated on your purchases. Need help? Check out our FAQs or contact our support team.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-600">
                    <strong>📦 Track Orders:</strong> Monitor delivery status in real-time
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>👤 Profile:</strong> Update your personal information anytime
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>💳 Safe Shopping:</strong> Secure checkout with multiple payment options
                  </p>
                </div>
                <div className="card-actions justify-start mt-4">
                  <button className="btn btn-sm btn-primary" onClick={() => navigate('/products')}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="card bg-white border border-gray-200">
          <div className="card-body">
            <h3 className="card-title text-lg">❓ Need Help?</h3>
            <p className="text-sm text-gray-600">Check our FAQ or contact support for assistance with your account.</p>
          </div>
        </div>

        <div className="card bg-white border border-gray-200">
          <div className="card-body">
            <h3 className="card-title text-lg">⚙️ Settings</h3>
            <p className="text-sm text-gray-600">Update your profile information and preferences from your account settings.</p>
            <div className="card-actions justify-start mt-2">
              <button className="btn btn-sm btn-ghost" onClick={() => navigate('/dashboard/profile')}>
                Go to Profile
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-white border border-gray-200">
          <div className="card-body">
            <h3 className="card-title text-lg">📱 Mobile Friendly</h3>
            <p className="text-sm text-gray-600">Access your dashboard on any device with our mobile-responsive design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
