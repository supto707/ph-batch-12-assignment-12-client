import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    quantity: '',
    contact: '',
    address: '',
    notes: ''
  });
  const { user, dbUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (dbUser?.role === 'admin' || dbUser?.role === 'manager') {
      toast.error('Admin and Manager cannot place orders');
      return;
    }

    if (dbUser?.status !== 'approved') {
      toast.error('Your account must be approved to place orders');
      return;
    }

    const quantity = parseInt(orderData.quantity);
    if (quantity < product.minimumOrder) {
      toast.error(`Minimum order quantity is ${product.minimumOrder}`);
      return;
    }

    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} items available`);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity,
        totalPrice: product.price * quantity,
        ...orderData
      }, { withCredentials: true });

      toast.success('Order placed successfully!');
      navigate('/dashboard/my-orders');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const totalPrice = product.price * (orderData.quantity || 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23ddd" width="600" height="400"/%3E%3Ctext x="50%" y="50%" font-size="20" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'} 
            alt={product.name}
            className="w-full rounded-lg shadow-xl"
          />
          {product.demoVideo && (
            <div className="mt-4">
              <iframe
                src={product.demoVideo}
                className="w-full h-64 rounded-lg"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="badge badge-secondary mb-4">{product.category}</p>
          <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="space-y-2 mb-6">
            <p><strong>Available Quantity:</strong> {product.quantity}</p>
            <p><strong>Minimum Order:</strong> {product.minimumOrder}</p>
            <p><strong>Payment Options:</strong> {product.paymentOptions}</p>
          </div>

          {user && dbUser?.role === 'buyer' && dbUser?.status === 'approved' && (
            <form onSubmit={handleOrder} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Place Order</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" value={user.email} className="modern-input" readOnly />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                <input type="text" value={product.name} className="modern-input" readOnly />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={orderData.firstName}
                    onChange={(e) => setOrderData({...orderData, firstName: e.target.value})}
                    className="modern-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={orderData.lastName}
                    onChange={(e) => setOrderData({...orderData, lastName: e.target.value})}
                    className="modern-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={orderData.quantity}
                  onChange={(e) => setOrderData({...orderData, quantity: e.target.value})}
                  className="modern-input"
                  min={product.minimumOrder}
                  max={product.quantity}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                <input
                  type="text"
                  value={`$${totalPrice.toFixed(2)}`}
                  className="modern-input bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  value={orderData.contact}
                  onChange={(e) => setOrderData({...orderData, contact: e.target.value})}
                  className="modern-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  value={orderData.address}
                  onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                  className="modern-input h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={orderData.notes}
                  onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                  className="modern-input h-20 resize-none"
                />
              </div>

              <button type="submit" className="btn-primary-clean w-full py-3 text-lg font-semibold">Place Order</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
