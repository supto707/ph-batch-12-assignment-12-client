import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: filter ? { status: filter } : {},
        withCredentials: true
      });
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="mb-6 flex gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered bg-white"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
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
                <td>${order.totalPrice}</td>
                <td>
                  <span className={`badge ${
                    order.status === 'approved' ? 'badge-success' :
                    order.status === 'pending' ? 'badge-warning' :
                    order.status === 'rejected' ? 'badge-error' :
                    'badge-info'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => document.getElementById(`modal_${order._id}`).showModal()}
                    className="btn btn-info btn-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl opacity-60">No orders found</p>
        </div>
      )}

      {orders.map(order => (
        <dialog key={order._id} id={`modal_${order._id}`} className="modal">
          <div className="modal-box max-w-2xl bg-white">
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
                <p><strong>Email:</strong> {order.userEmail}</p>
                <p><strong>Contact:</strong> {order.contact}</p>
              </div>
              <div>
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p><strong>Status:</strong> <span className="badge">{order.status}</span></p>
              </div>
            </div>
            <div className="mt-4">
              <p><strong>Address:</strong> {order.address}</p>
              {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
            </div>

            {order.tracking && Array.isArray(order.tracking) && order.tracking.length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold mb-2">Tracking History</h4>
                <div className="space-y-2">
                  {order.tracking.map((track, idx) => (
                    <div key={idx} className="card bg-base-200 p-3">
                      <p className="font-semibold">{track.status}</p>
                      <p className="text-sm">{track.location} - {new Date(track.date).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-action">
              <button onClick={() => document.getElementById(`modal_${order._id}`).close()} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default AllOrders;
