import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
      withCredentials: true
    }).then(res => setOrder(res.data));
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Track Order</h1>

      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
            </div>
            <div>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p><strong>Status:</strong> <span className="badge badge-primary">{order.status}</span></p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Production Timeline</h2>
          
          {order.tracking && order.tracking.length > 0 ? (
            <ul className="timeline timeline-vertical">
              {order.tracking.map((track, idx) => (
                <li key={idx}>
                  <div className="timeline-start">{new Date(track.date).toLocaleString()}</div>
                  <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    <h3 className="font-bold">{track.status}</h3>
                    <p className="text-sm">{track.location}</p>
                    {track.note && <p className="text-sm opacity-70">{track.note}</p>}
                  </div>
                  {idx < order.tracking.length - 1 && <hr className="bg-primary" />}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="opacity-60">No tracking information available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
