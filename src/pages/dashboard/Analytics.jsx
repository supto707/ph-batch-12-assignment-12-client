import { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [stats, setStats] = useState({
    products: { today: 0, week: 0, month: 0, total: 0 },
    orders: { month: 0, total: 0 },
    users: { new: 0, total: 0 },
    managers: { active: 0 }
  });
  const [filter, setFilter] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [filter]);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`, {
        params: { days: filter },
        withCredentials: true
      });
      setStats(data);
    } catch (error) {
      console.error('Analytics fetch failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="1">Today</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Products</div>
          <div className="stat-value text-primary">{stats.products.total}</div>
          <div className="stat-desc">This month: {stats.products.month}</div>
        </div>
        
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Orders</div>
          <div className="stat-value text-secondary">{stats.orders.total}</div>
          <div className="stat-desc">This month: {stats.orders.month}</div>
        </div>
        
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Users</div>
          <div className="stat-value text-accent">{stats.users.total}</div>
          <div className="stat-desc">New: {stats.users.new}</div>
        </div>
        
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Active Managers</div>
          <div className="stat-value text-info">{stats.managers.active}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Products Overview</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{stats.products.total}</div>
                <div className="text-sm opacity-60">Total Products</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Orders Trend</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary">{stats.orders.total}</div>
                <div className="text-sm opacity-60">Total Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;