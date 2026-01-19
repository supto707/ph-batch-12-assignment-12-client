import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiBox, FiInfo, FiX, FiCornerUpRight, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { userEmail: user.email },
        withCredentials: true
      });
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to sync acquisition records');
    }
    setLoading(false);
  };

  const handleCancel = async (orderId) => {
    if (!confirm('Abort this acquisition protocol?')) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status: 'cancelled' },
        { withCredentials: true }
      );
      toast.success('Acquisition protocol terminated');
      fetchOrders();
      setSelectedOrder(null);
      document.getElementById('order_modal').close();
    } catch (error) {
      toast.error('Termination failed');
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_modal').showModal();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'cancelled': return 'bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--border)]';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiBox className="text-[var(--primary)]" /> Acquisition Hub
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Personal Production & Logistics Records</p>
        </div>

        {orders.length > 0 && (
          <Link to="/products" className="btn-gradient !py-3 !px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <FiPlus className="text-lg" /> Initiate Protocol
          </Link>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card !bg-[var(--bg-secondary)] rounded-[40px] p-20 text-center border border-[var(--border)] border-dashed"
            >
              <div className="w-24 h-24 bg-[var(--bg-primary)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <FiPackage className="text-4xl text-[var(--text-muted)]" />
              </div>
              <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tighter mb-4">No records found.</h2>
              <p className="text-[var(--text-secondary)] font-medium max-w-md mx-auto mb-8 italic">Your acquisition history is currently empty. Initialize a production protocol from our commercial catalog.</p>
              <Link to="/products" className="btn-gradient !py-4 !px-12 text-sm font-black uppercase tracking-widest">Navigate to Catalog</Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card group overflow-hidden border border-[var(--border)] rounded-[32px] hover:border-[var(--primary)]/50 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Ref:</span>
                        <h2 className="font-black text-[var(--text-main)] tracking-tighter">#{order._id.slice(-8).toUpperCase()}</h2>
                      </div>
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[var(--text-muted)]">ASSET:</span>
                        <span className="text-[var(--text-main)]">{order.productName}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[var(--text-muted)]">VOLUME:</span>
                        <span className="text-[var(--text-main)]">{order.quantity} Units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">Valuation:</span>
                        <span className="font-black text-[var(--text-main)] text-xl">${order.totalPrice}</span>
                      </div>
                    </div>

                    <div className="pt-4 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => openModal(order)}
                        className="btn-outline-clean !py-3 !text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[var(--bg-secondary)]"
                      >
                        <FiInfo /> Manifest
                      </button>
                      <Link
                        to={`/dashboard/track-order/${order._id}`}
                        className="btn-outline-clean !py-3 !text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-[var(--primary)]/30 text-[var(--primary)] hover:!bg-[var(--primary)] hover:!text-white"
                      >
                        <FiTruck /> Track
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      <dialog id="order_modal" className="modal backdrop-blur-md">
        <div className="modal-box max-w-lg bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] p-0 overflow-hidden shadow-2xl">
          <div className="bg-[var(--bg-secondary)] p-8 border-b border-[var(--border)] flex justify-between items-center">
            <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tighter italic">Acquisition Manifest</h3>
            <button onClick={() => document.getElementById('order_modal').close()} className="text-[var(--text-muted)] hover:text-red-500 transition-colors">
              <FiX size={24} />
            </button>
          </div>

          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 space-y-6"
              >
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)] space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Protocol Index</span>
                    <span className="text-xs font-black text-[var(--text-main)]">{selectedOrder._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Current Status</span>
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full border ${getStatusStyle(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-3">Asset Registration</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold text-sm">
                        <span className="text-[var(--text-secondary)]">Designation:</span>
                        <span className="text-[var(--text-main)]">{selectedOrder.productName}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm">
                        <span className="text-[var(--text-secondary)]">Volume Units:</span>
                        <span className="text-[var(--text-main)]">{selectedOrder.quantity} PCS</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Final Valuation</span>
                        <span className="text-2xl font-black text-[var(--text-main)]">${selectedOrder.totalPrice}</span>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="pt-4 space-y-3">
                  <Link
                    to={`/dashboard/track-order/${selectedOrder._id}`}
                    className="btn-gradient w-full !py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                    onClick={() => document.getElementById('order_modal').close()}
                  >
                    <FiCornerUpRight /> Enter Logistics Protocol
                  </Link>

                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(selectedOrder._id)}
                      className="btn-outline-clean w-full !py-4 text-xs font-black uppercase tracking-widest !text-red-500 !border-red-500/30 hover:!bg-red-500 hover:!text-white"
                    >
                      Abort Protocol
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </dialog>
    </div>
  );
};

export default MyOrders;
