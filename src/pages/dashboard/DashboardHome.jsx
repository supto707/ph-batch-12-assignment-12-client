import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiShoppingCart, FiUsers, FiTrendingUp, FiArrowRight, FiUser, FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const DashboardHome = () => {
  const { dbUser, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [dbUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (dbUser?.role === 'admin') {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`, { withCredentials: true });
        setStats(data);
      } else if (dbUser?.role === 'buyer') {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, { withCredentials: true });
        const myOrders = data.filter(o => o.userEmail === user?.email);
        setStats({
          totalOrders: myOrders.length,
          spending: myOrders.reduce((acc, curr) => acc + (curr.total || 0), 0),
          statusDistribution: [
            { name: 'Pending', value: myOrders.filter(o => o.status === 'pending').length },
            { name: 'Approved', value: myOrders.filter(o => o.status === 'approved').length },
            { name: 'Delivered', value: myOrders.filter(o => o.status === 'delivered').length },
          ].filter(s => s.value > 0)
        });
      } else if (dbUser?.role === 'manager') {
        const { data: products } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        const myProducts = Array.isArray(products.products) ? products.products.filter(p => p.createdBy === user?.email) : [];
        setStats({
          totalProducts: myProducts.length,
          outOfStock: myProducts.filter(p => p.stock <= 0).length,
          categoryStats: Object.entries(
            myProducts.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {})
          ).map(([name, value]) => ({ name, value }))
        });
      }
    } catch (error) {
      // Failed to fetch dashboard data
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
    <div
      onClick={onClick}
      className={`glass-card p-6 border-l-4 ${color} hover:translate-y-[-4px] transition-all cursor-pointer shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">{label}</p>
          <p className="text-3xl font-black text-[var(--text-main)] tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-2xl bg-opacity-10 ${color.replace('border-', 'bg-')} bg-current`}>
          <Icon className="w-6 h-6 opacity-80" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[var(--primary)]"></span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tight">
            Terminal <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1">
            Logged in as <span className="text-[var(--primary)] font-bold">{dbUser?.role?.toUpperCase()}</span> • {user?.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/profile" className="btn-outline-clean flex items-center gap-2">
            <FiUser /> Profile Settings
          </Link>
        </div>
      </div>

      {/* ADMIN VIEW */}
      {dbUser?.role === 'admin' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiUsers} label="Total Workforce" value={stats?.totalUsers || 0} color="border-indigo-500" onClick={() => navigate('/dashboard/manage-users')} />
            <StatCard icon={FiPackage} label="Garment Inventory" value={stats?.totalProducts || 0} color="border-emerald-500" onClick={() => navigate('/dashboard/all-products')} />
            <StatCard icon={FiShoppingCart} label="Global Orders" value={stats?.totalOrders || 0} color="border-amber-500" onClick={() => navigate('/dashboard/all-orders')} />
            <StatCard icon={FiTrendingUp} label="Net Yield" value={`$${(stats?.revenue || 0).toLocaleString()}`} color="border-rose-500" onClick={() => navigate('/dashboard/analytics')} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-8">
                <FiActivity className="text-[var(--primary)]" />
                <h3 className="font-black text-lg uppercase tracking-wider">User Acquisition Growth</h3>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.userGrowth}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} fontWeight="bold" />
                    <YAxis stroke="var(--text-muted)" fontSize={10} fontWeight="bold" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '16px', fontWeight: 'bold' }}
                      itemStyle={{ color: 'var(--primary)' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-8 border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-8">
                <FiBarChart2 className="text-emerald-500" />
                <h3 className="font-black text-lg uppercase tracking-wider">Revenue Synthesis</h3>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.salesStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} fontWeight="bold" />
                    <YAxis stroke="var(--text-muted)" fontSize={10} fontWeight="bold" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '16px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-8 border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-8">
                <FiPieChart className="text-amber-500" />
                <h3 className="font-black text-lg uppercase tracking-wider">Catalogue Segmentation</h3>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.categoryStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats?.categoryStats?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '16px', fontWeight: 'bold' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-8 border border-[var(--border)] flex flex-col justify-center">
              <h3 className="text-2xl font-black mb-4">Strategic <span className="gradient-text">Commands</span></h3>
              <p className="text-[var(--text-secondary)] text-sm mb-8">Deploy administrative operations across the ecosystem.</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigate('/dashboard/manage-users')} className="btn-outline-clean flex flex-col items-center p-6 gap-2 !border-[var(--border)]">
                  <FiUsers size={24} />
                  <span className="text-[10px] uppercase font-black">Users</span>
                </button>
                <button onClick={() => navigate('/dashboard/all-products')} className="btn-outline-clean flex flex-col items-center p-6 gap-2 !border-[var(--border)]">
                  <FiPackage size={24} />
                  <span className="text-[10px] uppercase font-black">Products</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MANAGER VIEW */}
      {dbUser?.role === 'manager' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={FiPackage} label="Your Active Items" value={stats?.totalProducts || 0} color="border-primary" onClick={() => navigate('/dashboard/manage-products')} />
            <StatCard icon={FiActivity} label="Supply Alerts" value={stats?.outOfStock || 0} color="border-rose-500" onClick={() => navigate('/dashboard/manage-products')} />
            <StatCard icon={FiShoppingCart} label="Process Pipeline" value="Active" color="border-amber-500" onClick={() => navigate('/dashboard/pending-orders')} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border border-[var(--border)]">
              <h3 className="font-black text-lg mb-8 uppercase tracking-wider">Production Category Split</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats?.categoryStats} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100}>
                      {stats?.categoryStats?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-8 border border-[var(--border)] flex flex-col justify-center bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
              <h3 className="text-2xl font-black mb-4">Operations <span className="gradient-text">Node</span></h3>
              <p className="text-[var(--text-secondary)] mb-8 font-medium">Coordinate your specialized production lines.</p>
              <div className="space-y-3">
                <Link to="/dashboard/add-product" className="btn-gradient w-full flex items-center justify-center gap-2">
                  <FiPlus /> New Production Batch
                </Link>
                <Link to="/dashboard/pending-orders" className="btn-outline-clean w-full flex items-center justify-center gap-2">
                  Review Approvals <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* BUYER VIEW */}
      {dbUser?.role === 'buyer' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard icon={FiShoppingCart} label="Total Acquisitions" value={stats?.totalOrders || 0} color="border-primary" onClick={() => navigate('/dashboard/my-orders')} />
            <StatCard icon={FiTrendingUp} label="Total Investment" value={`$${(stats?.spending || 0).toLocaleString()}`} color="border-emerald-500" onClick={() => navigate('/dashboard/my-orders')} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 border border-[var(--border)]">
              <h3 className="font-black text-lg mb-8 uppercase tracking-wider">Order Status Tracking</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats?.statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={10}>
                      {stats?.statusDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-8 border border-[var(--border)] flex flex-col justify-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-3xl flex items-center justify-center text-[var(--primary)] mb-6">
                <FiPackage size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">Acquisition <span className="gradient-text">Protocol</span></h3>
              <p className="text-[var(--text-secondary)] mb-8 font-medium">Continue your procurement cycles by exploring the global catalogue.</p>
              <Link to="/products" className="btn-gradient !py-4 flex items-center justify-center gap-3">
                Explore All Garments <FiArrowRight />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;

const FiPlus = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
