import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBox, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiFilter, FiMaximize2, FiUser, FiMapPin } from 'react-icons/fi';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: filter ? { status: filter } : {},
        withCredentials: true
      });
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to sync logistics data');
    }
    setLoading(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiTruck className="text-[var(--primary)]" /> Global Logistics
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Order Fulfillment & Distribution</p>
        </div>

        <div className="relative w-full md:w-64">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="modern-input !pl-12 !py-3 appearance-none font-bold bg-[var(--bg-card)]"
          >
            <option value="">All Transactions</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Order Reference</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Purchasing Entity</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Designation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Quantity</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Transaction Value</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Sync Status</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">Inspection</th>
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
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button
                            onClick={() => document.getElementById(`modal_${order._id}`).showModal()}
                            className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"
                          >
                            <FiMaximize2 />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-20 text-center">
                        <FiBox className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                        <p className="text-[var(--text-secondary)] font-bold italic">No logistics records found.</p>
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
          <div className="modal-box max-w-3xl bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] p-0 overflow-hidden shadow-2xl">
            <div className="bg-[var(--bg-secondary)] p-8 border-b border-[var(--border)] flex justify-between items-center">
              <div>
                <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tighter">Transaction manifest</h3>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">ID: {order._id}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                {order.status}
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                    <FiUser /> Purchasing Entity
                  </h4>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                    <p className="font-black text-[var(--text-main)] text-lg">{order.firstName} {order.lastName}</p>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mt-1">{order.userEmail}</p>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{order.contact}</p>
                  </div>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                    <FiMapPin /> Logistics Destination
                  </h4>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)] font-medium text-[var(--text-secondary)] text-sm leading-relaxed">
                    {order.address}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                    <FiBox /> Acquisition Details
                  </h4>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border)] space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">Asset</span>
                      <span className="font-black text-[var(--text-main)]">{order.productName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">Quantity</span>
                      <span className="font-black text-[var(--text-main)]">{order.quantity} Units</span>
                    </div>
                    <div className="h-px bg-[var(--border)]"></div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest text-[var(--primary)]">Total Value</span>
                      <span className="font-black text-[var(--text-main)] text-2xl">${order.totalPrice}</span>
                    </div>
                  </div>
                </section>

                {order.tracking && Array.isArray(order.tracking) && order.tracking.length > 0 && (
                  <section>
                    <h4 className="flex items-center gap-2 text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-4">
                      <FiTruck /> Tracking Protocol
                    </h4>
                    <div className="space-y-4 ml-2">
                      {order.tracking.map((track, idx) => (
                        <div key={idx} className="relative pl-6 border-l-2 border-[var(--border)] last:border-0 pb-4 last:pb-0">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg-card)] border-2 border-[var(--primary)]"></div>
                          <p className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-widest">{track.status}</p>
                          <p className="text-[9px] font-medium text-[var(--text-muted)]">{track.location} • {new Date(track.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            <div className="p-8 bg-[var(--bg-secondary)] border-t border-[var(--border)] text-right">
              <button
                onClick={() => document.getElementById(`modal_${order._id}`).close()}
                className="btn-outline-clean !py-3 !px-10 font-black text-xs"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default AllOrders;
