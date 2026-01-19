import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiTruck, FiBox, FiCheckCircle, FiClock, FiActivity, FiMapPin, FiArrowLeft, FiInfo } from 'react-icons/fi';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
      withCredentials: true
    }).then(res => {
      setOrder(res.data);
      setLoading(false);
    });
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
        <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">Synchronizing Logistics Data</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <FiInfo className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
        <p className="font-black text-[var(--text-main)]">Acquisition protocol not found.</p>
        <Link to="/dashboard/my-orders" className="btn-outline-clean mt-6 !inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Hub
        </Link>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-500';
      case 'pending': return 'text-amber-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-[var(--primary)]';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiActivity className="text-[var(--primary)]" /> Production Pulse
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Real-time Logistics Synchronization</p>
        </div>
        <Link to="/dashboard/my-orders" className="btn-outline-clean !py-3 !px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <FiArrowLeft /> Acquisition Hub
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Info Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card !bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] p-8 h-full"
          >
            <div className="space-y-8">
              <section>
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">Ref Index</span>
                <h2 className="text-xl font-black text-[var(--text-main)] tracking-tighter">#{order._id.slice(-8).toUpperCase()}</h2>
              </section>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-1">Asset Asset</p>
                  <p className="font-bold text-[var(--text-main)]">{order.productName}</p>
                </div>
                <div className="flex justify-between items-end border-t border-[var(--border)] pt-4">
                  <div>
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Volume</p>
                    <p className="font-black text-[var(--text-main)]">{order.quantity} PCS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Valuation</p>
                    <p className="font-black text-[var(--primary)] text-2xl">${order.totalPrice}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-[var(--border)] pt-4">
                  <div>
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Protocol Date</p>
                    <p className="text-sm font-bold text-[var(--text-secondary)]">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Status</p>
                    <p className={`font-black uppercase text-xs tracking-tighter ${getStatusStyle(order.status)}`}>{order.status}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-2xl p-4 border border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FiInfo />
                </div>
                <p className="text-[10px] font-medium text-[var(--text-secondary)] leading-tight italic">
                  Production timelines are synchronized in real-time with our factory facility protocols.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card border border-[var(--border)] rounded-[40px] p-8 lg:p-12"
          >
            <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tighter mb-10 flex items-center gap-3">
              <FiActivity className="text-[var(--primary)]" /> Production Pipeline
            </h2>

            {order.tracking && order.tracking.length > 0 ? (
              <div className="space-y-12 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--border)]"></div>

                {order.tracking.map((track, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[var(--bg-card)] border-[5px] border-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></div>
                    </div>

                    <div className="space-y-2 group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-xl font-black text-[var(--text-main)] uppercase tracking-tighter group-hover:text-[var(--primary)] transition-colors">
                          {track.status}
                        </h3>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border)]">
                          {new Date(track.date).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
                        <FiMapPin className="text-[var(--primary)]" /> {track.location}
                      </div>

                      {track.note && (
                        <div className="mt-4 p-4 bg-[var(--bg-secondary)] border-l-4 border-[var(--primary)] rounded-r-2xl italic text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                          "{track.note}"
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiClock className="text-3xl text-[var(--text-muted)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] italic">Fulfillment protocol initializing...</h3>
                <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto">Your order is currently in the managerial verification phase. Production timeline will synchronize once protocol is confirmed.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
