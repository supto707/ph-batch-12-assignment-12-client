import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { status: 'approved' },
        withCredentials: true
      });
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleAddTracking = async () => {
    if (!trackingData.location.trim()) {
      toast.error('Please enter location');
      return;
    }

    if (!trackingData.status.trim()) {
      toast.error('Please select status');
      return;
    }

    if (!trackingData.date) {
      toast.error('Please select date and time');
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
      
      toast.success('✓ Tracking info added successfully');
      
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
      console.error('Tracking error:', error);
      toast.error(error.response?.data?.message || 'Failed to add tracking');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-black">Approved Orders</h1>
      <p className="text-gray-600 mb-6">Manage orders and add tracking updates</p>

      <div className="overflow-x-auto">
        <table className="table border">
          <thead>
            <tr className='text-black'>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>
                <td>{order.userEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.approvedAt ? new Date(order.approvedAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        document.getElementById('tracking_modal').showModal();
                      }}
                      className="btn btn-primary btn-xs"
                    >
                      Add Tracking
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        document.getElementById(`view_modal_${order._id}`).showModal();
                      }}
                      className="btn btn-info btn-xs"
                    >
                      View Tracking
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl opacity-60">No approved orders</p>
        </div>
      )}

      <dialog id="tracking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-lg">
          <button 
            onClick={() => document.getElementById('tracking_modal').close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button>
          
          <h3 className="font-bold text-2xl mb-6 text-gray-900">📍 Add Tracking Update</h3>
          
          <div className="space-y-5">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Status *</span></label>
              <select
                value={trackingData.status}
                onChange={(e) => setTrackingData({...trackingData, status: e.target.value})}
                className="select select-bordered w-full border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition rounded-lg"
              >
                <option value="">Select Status</option>
                <option>Cutting Completed</option>
                <option>Sewing Started</option>
                <option>Finishing</option>
                <option>QC Checked</option>
                <option>Packed</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Location *</span></label>
              <input
                type="text"
                value={trackingData.location}
                onChange={(e) => setTrackingData({...trackingData, location: e.target.value})}
                className="input w-full border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition rounded-lg"
                placeholder="e.g., Factory Floor A"
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Note (optional)</span></label>
              <textarea
                value={trackingData.note}
                onChange={(e) => setTrackingData({...trackingData, note: e.target.value})}
                className="textarea w-full border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none rounded-lg"
                rows="3"
                placeholder="Additional notes..."
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Date & Time *</span></label>
              <input
                type="datetime-local"
                value={trackingData.date}
                onChange={(e) => setTrackingData({...trackingData, date: e.target.value})}
                className="input w-full border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition rounded-lg"
              />
            </div>
          </div>

          <div className="modal-action mt-6 gap-2">
            <button onClick={() => document.getElementById('tracking_modal').close()} className="btn btn-outline">Cancel</button>
            <button onClick={handleAddTracking} className="btn btn-primary">✓ Add Update</button>
          </div>
        </div>
      </dialog>

      {orders.map(order => (
        <dialog key={order._id} id={`view_modal_${order._id}`} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl bg-white">
            <button 
              onClick={() => document.getElementById(`view_modal_${order._id}`).close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button>
            
            <h3 className="font-bold text-2xl mb-6 text-gray-900">📦 Tracking History</h3>
            
            {order.tracking && order.tracking.length > 0 ? (
              <div className="space-y-4">
                {order.tracking.map((track, idx) => (
                  <div key={idx} className="card bg-gray-50 border border-gray-200">
                    <div className="card-body">
                      <div className="flex items-center gap-2">
                        <span className="badge badge-primary">{idx + 1}</span>
                        <h4 className="font-bold text-lg text-gray-900">{track.status}</h4>
                      </div>
                      <div className="divider my-2"></div>
                      <p className="text-sm text-gray-700"><strong>📍 Location:</strong> {track.location}</p>
                      <p className="text-sm text-gray-700"><strong>📅 Date:</strong> {new Date(track.date).toLocaleString()}</p>
                      {track.note && <p className="text-sm text-gray-700"><strong>📝 Note:</strong> {track.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center opacity-60 py-8">No tracking updates yet</p>
            )}

            <div className="modal-action mt-6">
              <button onClick={() => document.getElementById(`view_modal_${order._id}`).close()} className="btn btn-primary">Close</button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default ApprovedOrders;
