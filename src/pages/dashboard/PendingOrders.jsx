import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiEye, FiUser, FiPackage, FiMail, FiPhone, FiMapPin, FiInbox } from 'react-icons/fi';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { status: 'pending' },
        withCredentials: true
      });
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to sync pending registry');
    }
    setLoading(false);
  };

  const handleApprove = async (orderId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status: 'approved', approvedAt: new Date() },
        { withCredentials: true }
      );
      toast.success('Validation protocol accepted');
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      toast.error('Validation protocol failed');
    }
  };

  const handleReject = async (orderId) => {
    if (!confirm('Are you sure you want to reject this order?')) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status: 'rejected' },
        { withCredentials: true }
      );
      toast.success('Order successfully rejected');
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      toast.error('Rejection protocol failed');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiClock className="text-amber-500" /> Validation Queue
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Awaiting Managerial Verification</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Order Reference</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Origin Source</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Asset Designation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Volume</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Valuation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Created At</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">Decision Protocols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-20 text-center">
                    <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
                  </td>
                </tr>
              ) : (
                <>
                  {orders.length > 0 ? (
                    orders.map((order, idx) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-[var(--primary)]/5 transition-colors group"
                      >
                        <td className="p-6 font-black text-[var(--text-main)]">#{order._id.slice(-8).toUpperCase()}</td>
                        <td className="p-6">
                          <div className="text-xs font-bold text-[var(--text-secondary)]">{order.userEmail}</div>
                        </td>
                        <td className="p-6 font-bold text-[var(--text-main)]">{order.productName}</td>
                        <td className="p-6 font-black text-[var(--text-muted)]">{order.quantity} Units</td>
                        <td className="p-6 font-black text-[var(--primary)] text-lg">${order.totalPrice}</td>
                        <td className="p-6 text-xs font-bold text-[var(--text-muted)]">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleApprove(order._id)}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                              title="Accept Protocol"
                            >
                              <FiCheckCircle />
                            </button>
                            <button
                              onClick={() => handleReject(order._id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              title="Reject Protocol"
                            >
                              <FiXCircle />
                            </button>
                            <button
                              onClick={() => document.getElementById(`modal_${order._id}`).showModal()}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"
                              title="Inspect Manifest"
                            >
                              <FiEye />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-20 text-center">
                        <FiInbox className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                        <p className="text-[var(--text-secondary)] font-bold italic">Verification queue is currently empty.</p>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {orders.map(order => (
        <dialog key={order._id} id={`modal_${order._id}`} className="modal backdrop-blur-md">
          <div className="modal-box max-w-2xl bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] p-0 overflow-hidden shadow-2xl">
            <div className="bg-[var(--bg-secondary)] p-8 border-b border-[var(--border)]">
              <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tighter italic">Inspection manifest</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Order Link: {order._id}</p>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                    <FiUser /> Entity Profile
                  </h4>
                  <div className="space-y-3">
                    <p className="font-black text-[var(--text-main)] text-lg">{order.firstName} {order.lastName}</p>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-bold">
                      <FiMail className="text-[var(--primary)]" /> {order.userEmail}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-bold">
                      <FiPhone className="text-[var(--primary)]" /> {order.contact}
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                    <FiPackage /> Object Registry
                  </h4>
                  <div className="space-y-3">
                    <p className="font-black text-[var(--text-main)] text-lg">{order.productName}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Volume:</span>
                      <span className="font-black text-[var(--text-main)]">{order.quantity} Units</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Total:</span>
                      <span className="font-black text-[var(--primary)]">${order.totalPrice}</span>
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                  <FiMapPin /> Logistics Coordinate
                </h4>
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)] font-medium text-[var(--text-secondary)] text-sm leading-relaxed">
                  {order.address}
                </div>
              </section>

              {order.notes && (
                <section>
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Subject Notes</h4>
                  <p className="text-sm italic text-[var(--text-secondary)]">{order.notes}</p>
                </section>
              )}
            </div>

            <div className="p-8 bg-[var(--bg-secondary)] border-t border-[var(--border)] text-right">
              <button
                onClick={() => document.getElementById(`modal_${order._id}`).close()}
                className="btn-outline-clean !py-3 !px-10 font-black text-xs"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default PendingOrders;
