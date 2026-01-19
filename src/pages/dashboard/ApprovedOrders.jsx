import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiTruck, FiMapPin, FiCalendar, FiPlus, FiEye, FiActivity, FiUser, FiPackage, FiInfo, FiX } from 'react-icons/fi';

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState({
    status: 'Cutting Completed',
    location: '',
    note: '',
    date: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { status: 'approved' },
        withCredentials: true
      });
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to sync approved registry');
    }
    setLoading(false);
  };

  const handleAddTracking = async () => {
    if (!trackingData.location.trim()) {
      toast.error('Logistics coordinate required');
      return;
    }

    try {
      const payload = {
        tracking: {
          status: trackingData.status,
          location: trackingData.location,
          note: trackingData.note,
          date: new Date(trackingData.date).toISOString()
        }
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${selectedOrder._id}/tracking`,
        payload,
        { withCredentials: true }
      );

      toast.success('Logistics update synchronized');
      setTrackingData({
        status: 'Cutting Completed',
        location: '',
        note: '',
        date: new Date().toISOString().slice(0, 16)
      });
      setSelectedOrder(null);
      document.getElementById('tracking_modal').close();
      fetchOrders();
    } catch (error) {
      toast.error('Synchronization failed');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiCheckCircle className="text-emerald-500" /> Active Production
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Orders in Fulfillment Pipeline</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Order Reference</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Entity Source</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Asset Designation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Volume</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Verified At</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">Fulfillment Logs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center">
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
                        <td className="p-6 text-xs font-bold text-[var(--text-secondary)]">{order.userEmail}</td>
                        <td className="p-6 font-bold text-[var(--text-main)]">{order.productName}</td>
                        <td className="p-6 font-black text-[var(--text-muted)]">{order.quantity} Units</td>
                        <td className="p-6 text-xs font-bold text-[var(--text-muted)]">{order.approvedAt ? new Date(order.approvedAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                document.getElementById('tracking_modal').showModal();
                              }}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"
                              title="Add Tracking Protocol"
                            >
                              <FiPlus />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                document.getElementById(`view_modal_${order._id}`).showModal();
                              }}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"
                              title="Inspection Logs"
                            >
                              <FiEye />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-20 text-center">
                        <FiTruck className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                        <p className="text-[var(--text-secondary)] font-bold italic">No active fulfillment cycles found.</p>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="tracking_modal" className="modal backdrop-blur-md">
        <div className="modal-box bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] p-0 overflow-hidden shadow-2xl max-w-xl">
          <div className="bg-[var(--bg-secondary)] p-8 border-b border-[var(--border)] flex justify-between items-center">
            <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tighter">Logistics Synchronization</h3>
            <button onClick={() => document.getElementById('tracking_modal').close()} className="text-[var(--text-muted)] hover:text-red-500 transition-colors">
              <FiX size={24} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Fulfillment Status</label>
              <select
                value={trackingData.status}
                onChange={(e) => setTrackingData({ ...trackingData, status: e.target.value })}
                className="modern-input appearance-none font-bold"
              >
                <option>Cutting Completed</option>
                <option>Sewing Started</option>
                <option>Finishing</option>
                <option>QC Checked</option>
                <option>Packed</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Coordinate Location</label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  type="text"
                  value={trackingData.location}
                  onChange={(e) => setTrackingData({ ...trackingData, location: e.target.value })}
                  className="modern-input !pl-12"
                  placeholder="e.g., Sector-7 Facility"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Protocol Notes</label>
              <textarea
                value={trackingData.note}
                onChange={(e) => setTrackingData({ ...trackingData, note: e.target.value })}
                className="modern-input !h-24 resize-none"
                placeholder="Additional fulfillment details..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Timeline Timestamp</label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                <input
                  type="datetime-local"
                  value={trackingData.date}
                  onChange={(e) => setTrackingData({ ...trackingData, date: e.target.value })}
                  className="modern-input !pl-12"
                />
              </div>
            </div>
          </div>

          <div className="p-8 bg-[var(--bg-secondary)] border-t border-[var(--border)] grid grid-cols-2 gap-4">
            <button onClick={() => document.getElementById('tracking_modal').close()} className="btn-outline-clean !py-4 font-black">Abort Sync</button>
            <button onClick={handleAddTracking} className="btn-gradient !py-4 font-black uppercase text-xs tracking-widest">Execute Update</button>
          </div>
        </div>
      </dialog>

      {orders.map(order => (
        <dialog key={order._id} id={`view_modal_${order._id}`} className="modal backdrop-blur-md">
          <div className="modal-box max-w-2xl bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] p-0 overflow-hidden shadow-2xl">
            <div className="bg-[var(--bg-secondary)] p-8 border-b border-[var(--border)] flex justify-between items-center">
              <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tighter italic">Tracking history manifest</h3>
              <button onClick={() => document.getElementById(`view_modal_${order._id}`).close()} className="text-[var(--text-muted)] hover:text-red-500 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-8">
              {order.tracking && order.tracking.length > 0 ? (
                <div className="space-y-6 relative ml-4">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--primary)] to-[var(--border)]"></div>
                  {order.tracking.map((track, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[var(--bg-card)] border-4 border-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                      </div>
                      <div className="glass-card !bg-[var(--bg-primary)] p-4 border border-[var(--border)] rounded-2xl group hover:border-[var(--primary)] transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-[var(--text-main)] uppercase tracking-tighter flex items-center gap-2">
                            <FiActivity className="text-[var(--primary)]" /> {track.status}
                          </h4>
                          <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{new Date(track.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] mb-2">
                          <FiMapPin className="text-[var(--primary)]" /> {track.location}
                        </div>
                        {track.note && (
                          <p className="text-xs italic text-[var(--text-secondary)] border-l-2 border-[var(--primary)]/20 pl-3 py-1 bg-[var(--bg-secondary)] rounded-r-lg">{track.note}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 opacity-40">
                  <FiInfo className="mx-auto text-4xl mb-4" />
                  <p className="font-black italic">No fulfillment events logged yet.</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-[var(--bg-secondary)] border-t border-[var(--border)] text-right">
              <button
                onClick={() => document.getElementById(`view_modal_${order._id}`).close()}
                className="btn-outline-clean !py-3 !px-10 font-black text-xs"
              >
                Close Logs
              </button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default ApprovedOrders;
