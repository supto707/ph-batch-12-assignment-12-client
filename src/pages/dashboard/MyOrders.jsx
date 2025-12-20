import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
        params: { userEmail: user.email },
        withCredentials: true
      });
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleCancel = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, 
        { status: 'cancelled' },
        { withCredentials: true }
      );
      toast.success('Order cancelled');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to cancel order');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto text-black">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>
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
                  <div className="flex gap-2">
                    <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-info btn-xs">
                      Track
                    </Link>
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-error btn-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl opacity-60">No orders yet</p>
          <Link to="/products" className="btn btn-primary mt-4">Browse Products</Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
