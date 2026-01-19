import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiBox, FiShoppingCart, FiUsers, FiDollarSign, FiActivity, FiPieChart, FiTrendingUp } from 'react-icons/fi';

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
      toast.error('Logistics data synchronization failed');
      setStats({ totalProducts: 0, totalOrders: 0, totalUsers: 0, revenue: 0 });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass-card group relative overflow-hidden border border-[var(--border)] rounded-[32px] p-8 hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-full`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--primary)] text-xl border border-[var(--border)] shadow-sm">
            <Icon />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{title}</h3>
            <p className="text-4xl font-black text-[var(--text-main)] tracking-tighter mt-1">{value}</p>
            {subtitle && <p className="text-[10px] font-bold text-[var(--primary)] mt-2 uppercase tracking-wide italic">{subtitle}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiActivity className="text-[var(--primary)]" /> Performance Intelligence
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Global Production & Revenue Metrics</p>
        </div>
      </div>

      {loading ? (
        <div className="py-40 text-center">
          <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Catalog Volume"
              value={stats.totalProducts || 0}
              icon={FiBox}
              color="from-blue-500 to-cyan-500"
              subtitle="Registered Assets"
              delay={0.1}
            />
            <StatCard
              title="Acquisition Cycles"
              value={stats.totalOrders || 0}
              icon={FiShoppingCart}
              color="from-purple-500 to-pink-500"
              subtitle="Completed Transactions"
              delay={0.2}
            />
            <StatCard
              title="Authorized Entities"
              value={stats.totalUsers || 0}
              icon={FiUsers}
              color="from-emerald-500 to-teal-500"
              subtitle="Active Network"
              delay={0.3}
            />
            <StatCard
              title="Global Valuation"
              value={`$${(stats.revenue || 0).toLocaleString()}`}
              icon={FiDollarSign}
              color="from-orange-500 to-red-500"
              subtitle="Gross Revenue"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card border border-[var(--border)] rounded-[40px] p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
                  <FiPieChart className="text-[var(--primary)]" /> Production Distribution
                </h2>
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-secondary)] px-3 py-1 rounded-full">Automated Log</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[var(--text-secondary)]">
                    <span className="uppercase tracking-widest">Inventory Saturation</span>
                    <span>{Math.min(100, (stats.totalProducts || 0) * 2)}%</span>
                  </div>
                  <div className="h-5 bg-[var(--bg-secondary)] rounded-full overflow-hidden p-1 border border-[var(--border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (stats.totalProducts || 0) * 2)}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[var(--primary)] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border)] text-center">
                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Stockage</p>
                    <p className="text-lg font-black text-[var(--text-main)]">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border)] text-center">
                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Growth</p>
                    <p className="text-lg font-black text-emerald-500">+12%</p>
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border)] text-center">
                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Rating</p>
                    <p className="text-lg font-black text-amber-500">4.9</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card border border-[var(--border)] rounded-[40px] p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
                  <FiTrendingUp className="text-[var(--primary)]" /> Commercial Liquidity
                </h2>
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-secondary)] px-3 py-1 rounded-full">Real-time Data</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Cumulative Earnings</p>
                    <p className="text-5xl font-black text-[var(--text-main)] tracking-tighter">${(stats.revenue || 0).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-500 flex items-center gap-1">
                      <FiTrendingUp /> +24.8%
                    </p>
                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Vs Last Projection</p>
                  </div>
                </div>

                <div className="h-24 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border)] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest italic group-hover:text-[var(--primary)] transition-colors">Visual analysis protocol active</p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30"></div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card !bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"></div>
            <h3 className="text-sm font-black text-[var(--text-muted)] uppercase tracking-widest mb-10 text-center">Executive Summary Matrix</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <FiBox className="text-2xl text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Asset Index</p>
                <p className="text-3xl font-black text-[var(--text-main)] tracking-tighter">{stats.totalProducts || 0}</p>
              </div>
              <div className="text-center space-y-2">
                <FiShoppingCart className="text-2xl text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Transaction Flow</p>
                <p className="text-3xl font-black text-[var(--text-main)] tracking-tighter">{stats.totalOrders || 0}</p>
              </div>
              <div className="text-center space-y-2">
                <FiUsers className="text-2xl text-[var(--text-muted)] mx-auto mb-4" />
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Entity Scale</p>
                <p className="text-3xl font-black text-[var(--text-main)] tracking-tighter">{stats.totalUsers || 0}</p>
              </div>
              <div className="text-center space-y-2">
                <FiDollarSign className="text-2xl text-[var(--primary)] mx-auto mb-4" />
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Terminal Revenue</p>
                <p className="text-3xl font-black text-[var(--primary)] tracking-tighter">${(stats.revenue || 0).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Analytics;