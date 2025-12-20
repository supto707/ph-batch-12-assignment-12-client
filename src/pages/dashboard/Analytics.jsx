import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`, {
        withCredentials: true
      });
      setStats(data || { totalProducts: 0, totalOrders: 0, totalUsers: 0, revenue: 0 });
    } catch (error) {
      console.error('Analytics fetch failed:', error);
      toast.error('Failed to load analytics');
      setStats({ totalProducts: 0, totalOrders: 0, totalUsers: 0, revenue: 0 });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className={`card bg-gradient-to-br ${color} shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title text-sm font-semibold opacity-80">{title}</h3>
            <p className="text-4xl font-bold mt-2">{value}</p>
            {subtitle && <p className="text-xs opacity-70 mt-1">{subtitle}</p>}
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Real-time overview of your business metrics</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-gray-500">Loading analytics...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Products" 
              value={stats.totalProducts || 0}
              icon="📦"
              color="from-blue-400 to-blue-600"
              subtitle="In inventory"
            />
            <StatCard 
              title="Total Orders" 
              value={stats.totalOrders || 0}
              icon="🛒"
              color="from-purple-400 to-purple-600"
              subtitle="All time"
            />
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers || 0}
              icon="👥"
              color="from-green-400 to-green-600"
              subtitle="Registered"
            />
            <StatCard 
              title="Revenue" 
              value={`$${(stats.revenue || 0).toLocaleString()}`}
              icon="💰"
              color="from-orange-400 to-orange-600"
              subtitle="Total earnings"
            />
          </div>

          {/* Detailed Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Products Card */}
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl border border-blue-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-2xl text-blue-900">📦 Products</h2>
                    <p className="text-blue-600 text-sm">Total items in catalog</p>
                  </div>
                  <div className="badge badge-lg bg-blue-500 text-white">{stats.totalProducts || 0}</div>
                </div>
                <div className="divider my-2 bg-blue-200"></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700 font-medium">Inventory Status</span>
                    <progress className="progress progress-info w-32" value={(stats.totalProducts || 0) * 2} max="100"></progress>
                  </div>
                  <p className="text-xs text-blue-600">Items actively managed in system</p>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 shadow-xl border border-purple-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-2xl text-purple-900">🛒 Orders</h2>
                    <p className="text-purple-600 text-sm">Customer purchases</p>
                  </div>
                  <div className="badge badge-lg bg-purple-500 text-white">{stats.totalOrders || 0}</div>
                </div>
                <div className="divider my-2 bg-purple-200"></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-700 font-medium">Order Volume</span>
                    <progress className="progress progress-secondary w-32" value={(stats.totalOrders || 0) * 3} max="100"></progress>
                  </div>
                  <p className="text-xs text-purple-600">Total transactions processed</p>
                </div>
              </div>
            </div>

            {/* Users Card */}
            <div className="card bg-gradient-to-br from-green-50 to-green-100 shadow-xl border border-green-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-2xl text-green-900">👥 Users</h2>
                    <p className="text-green-600 text-sm">Registered members</p>
                  </div>
                  <div className="badge badge-lg bg-green-500 text-white">{stats.totalUsers || 0}</div>
                </div>
                <div className="divider my-2 bg-green-200"></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700 font-medium">User Growth</span>
                    <progress className="progress progress-success w-32" value={(stats.totalUsers || 0) * 4} max="100"></progress>
                  </div>
                  <p className="text-xs text-green-600">Active user accounts</p>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="card bg-gradient-to-br from-orange-50 to-orange-100 shadow-xl border border-orange-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-2xl text-orange-900">💰 Revenue</h2>
                    <p className="text-orange-600 text-sm">Total earnings</p>
                  </div>
                  <div className="badge badge-lg bg-orange-500 text-white">${(stats.revenue || 0).toLocaleString()}</div>
                </div>
                <div className="divider my-2 bg-orange-200"></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-700 font-medium">Financial Status</span>
                    <progress className="progress progress-warning w-32" value="80" max="100"></progress>
                  </div>
                  <p className="text-xs text-orange-600">All time revenue accumulated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg mt-8">
            <div className="card-body">
              <h3 className="card-title mb-4">📊 Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stats.totalProducts || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-secondary mt-1">{stats.totalOrders || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-accent mt-1">{stats.totalUsers || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-success mt-1">${(stats.revenue || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
;

export default Analytics;