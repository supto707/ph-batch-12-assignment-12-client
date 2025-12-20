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

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${selectedOrder._id}/tracking`,
        trackingData,
        { withCredentials: true }
      );
      toast.success('Tracking info added');
      setTrackingData({
        status: 'Cutting Completed',
        location: '',
        note: '',
        date: new Date().toISOString().slice(0, 16)
      });
      document.getElementById('tracking_modal').close();
      fetchOrders();
    } catch (error) {
      toast.error('Failed to add tracking');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approved Orders</h1>

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

      <dialog id="tracking_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Tracking Update</h3>
          
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Status</span></label>
            <select
              value={trackingData.status}
              onChange={(e) => setTrackingData({...trackingData, status: e.target.value})}
              className="select select-bordered"
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

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Location</span></label>
            <input
              type="text"
              value={trackingData.location}
              onChange={(e) => setTrackingData({...trackingData, location: e.target.value})}
              className="input input-bordered"
              placeholder="e.g., Factory Floor A"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Note (optional)</span></label>
            <textarea
              value={trackingData.note}
              onChange={(e) => setTrackingData({...trackingData, note: e.target.value})}
              className="textarea textarea-bordered"
              placeholder="Additional notes..."
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Date & Time</span></label>
            <input
              type="datetime-local"
              value={trackingData.date}
              onChange={(e) => setTrackingData({...trackingData, date: e.target.value})}
              className="input input-bordered"
            />
          </div>

          <div className="modal-action">
            <button onClick={handleAddTracking} className="btn btn-primary">Add Update</button>
            <button onClick={() => document.getElementById('tracking_modal').close()} className="btn">Cancel</button>
          </div>
        </div>
      </dialog>

      {orders.map(order => (
        <dialog key={order._id} id={`view_modal_${order._id}`} className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Tracking History</h3>
            
            {order.tracking && order.tracking.length > 0 ? (
              <div className="space-y-4">
                {order.tracking.map((track, idx) => (
                  <div key={idx} className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="font-bold">{track.status}</h4>
                      <p className="text-sm"><strong>Location:</strong> {track.location}</p>
                      <p className="text-sm"><strong>Date:</strong> {new Date(track.date).toLocaleString()}</p>
                      {track.note && <p className="text-sm"><strong>Note:</strong> {track.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center opacity-60">No tracking updates yet</p>
            )}

            <div className="modal-action">
              <button onClick={() => document.getElementById(`view_modal_${order._id}`).close()} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default ApprovedOrders;
