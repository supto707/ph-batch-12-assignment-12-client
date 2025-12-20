import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to cancel order');
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    document.getElementById('order_modal').showModal();
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">My Orders</h1>
      <p className="text-gray-600 mb-6">View and track your orders</p>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xl text-gray-600 mb-4">No orders yet</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order._id} className="card bg-white border border-gray-200 shadow hover:shadow-lg transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-lg text-gray-900">Order #{order._id.slice(-8)}</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-900">Product:</span> {order.productName}</p>
                  <p><span className="font-semibold text-gray-900">Quantity:</span> {order.quantity}</p>
                  <p><span className="font-semibold text-gray-900">Price:</span> ${order.totalPrice}</p>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'approved' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4 gap-2">
                  <button 
                    onClick={() => openModal(order)}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                  <Link to={`/dashboard/track-order/${order._id}`} className="btn btn-sm btn-primary">
                    Track
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <Modal id="order_modal" title="Order Details" onClose={closeModal}>
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-gray-900">{selectedOrder._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  selectedOrder.status === 'approved' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedOrder.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-semibold text-gray-900">{selectedOrder.productName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="font-semibold text-gray-900">${selectedOrder.totalPrice}</p>
                </div>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Customer Email</p>
              <p className="font-semibold text-gray-900">{selectedOrder.userEmail}</p>
            </div>

            <div className="modal-action justify-between mt-6">
              <Link 
                to={`/dashboard/track-order/${selectedOrder._id}`} 
                className="btn btn-primary"
              >
                Track Order
              </Link>
              <div className="flex gap-2">
                {selectedOrder.status === 'pending' && (
                  <button 
                    onClick={() => handleCancel(selectedOrder._id)}
                    className="btn btn-error"
                  >
                    Cancel Order
                  </button>
                )}
                <button 
                  onClick={() => document.getElementById('order_modal').close()}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyOrders;
