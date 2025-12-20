import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { status: 'pending' },
        withCredentials: true
      });
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleApprove = async (orderId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, 
        { status: 'approved', approvedAt: new Date() },
        { withCredentials: true }
      );
      toast.success('Order approved');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to approve order');
    }
  };

  const handleReject = async (orderId) => {
    if (!confirm('Are you sure you want to reject this order?')) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, 
        { status: 'rejected' },
        { withCredentials: true }
      );
      toast.success('Order rejected');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to reject order');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Orders</h1>

      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Order Date</th>
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
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(order._id)}
                      className="btn btn-success btn-xs"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(order._id)}
                      className="btn btn-error btn-xs"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => document.getElementById(`modal_${order._id}`).showModal()}
                      className="btn btn-info btn-xs"
                    >
                      View
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
          <p className="text-xl opacity-60">No pending orders</p>
        </div>
      )}

      {orders.map(order => (
        <dialog key={order._id} id={`modal_${order._id}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            <div className="space-y-2">
              <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Contact:</strong> {order.contact}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
              {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
            </div>
            <div className="modal-action">
              <button onClick={() => document.getElementById(`modal_${order._id}`).close()} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default PendingOrders;
