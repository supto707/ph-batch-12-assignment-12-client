import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag, FiPackage, FiCreditCard, FiHash, FiTruck, FiInfo,
  FiStar, FiChevronRight, FiChevronLeft, FiAward, FiCheckCircle
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, dbUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    quantity: 1
  });

  // Reset quantity when product loads
  useEffect(() => {
    if (product) {
      setOrderData(prev => ({ ...prev, quantity: product.minimumOrder }));
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        // Fetch related products
        if (res.data?.category) {
          axios.get(`${import.meta.env.VITE_API_URL}/products`, {
            params: { category: res.data.category }
          }).then(relatedRes => {
            setRelatedProducts(relatedRes.data.filter(p => p._id !== id).slice(0, 4));
          });
        }
      });
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to place an order');
      navigate('/login');
      return;
    }

    if (dbUser?.role === 'admin' || dbUser?.role === 'manager') {
      toast.error('Privileged accounts cannot place orders');
      return;
    }

    if (dbUser?.status !== 'approved') {
      toast.error('Account approval pending');
      return;
    }

    const quantity = parseInt(orderData.quantity);
    if (quantity < product.minimumOrder) {
      toast.error(`Minimum order: ${product.minimumOrder} units`);
      return;
    }

    if (quantity > product.quantity) {
      toast.error(`Stock low: only ${product.quantity} units available`);
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
      toast.error('Order processing failed');
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-main)]">
        <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
        <p className="mt-4 text-[var(--text-secondary)] font-bold animate-pulse">Fetching product details...</p>
      </div>
    );
  }

  const totalPrice = product.price * (orderData.quantity || 0);
  const images = product.images?.length > 0 ? product.images : ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200'];

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Product Hero Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] py-12 md:py-16 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-left">
              <span className="inline-block px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                {product.category} • Professional Grade
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-amber-500">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => <FiStar key={i} className="fill-current" />)}
                </div>
                <span className="text-sm font-bold text-[var(--text-secondary)]">(12+ Verified Reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-10 bg-[var(--bg-main)] p-8 rounded-[32px] border border-[var(--border)] shadow-xl">
              <div className="text-center">
                <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-1">Unit Price</p>
                <p className="text-4xl font-black text-[var(--primary)]">${product.price}</p>
              </div>
              <div className="w-px h-12 bg-[var(--border)]"></div>
              <div className="text-center">
                <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-1">Stock</p>
                <p className="text-4xl font-black text-[var(--text-main)]">{product.quantity}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Media & Details Side */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">

            {/* 1. Image Gallery */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-[var(--bg-secondary)] group"
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-[var(--primary)] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Description / Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                <div className="p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg text-lg"><FiInfo /></div>
                Product Overview
              </h2>
              <div className="clean-card p-10 font-medium text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  {product.description || "This high-performance garment is engineered for professional retail environments, utilizing premium fibers that ensure longevity and color fastness. Our manufacturing process exceeds international quality standards, providing your customers with both comfort and style."}
                </p>
                <ul className="grid md:grid-cols-2 gap-4 pt-4">
                  {[
                    'Sustainable Fabric Sourcing',
                    'Double-Stitch Reinforcement',
                    'Eco-Friendly Dye Process',
                    'Anti-Shrink Technology'
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <FiCheckCircle className="text-emerald-500" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Specifications */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                <div className="p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg text-lg"><FiHash /></div>
                Technical Specifications
              </h2>
              <div className="clean-card p-0 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-[var(--border)]">
                    {[
                      { label: 'Minimum Order', value: `${product.minimumOrder} Units`, icon: <FiPackage /> },
                      { label: 'Payment Terms', value: product.paymentOptions || 'L/C, T/T, Digital Pay', icon: <FiCreditCard /> },
                      { label: 'Standard Delivery', value: '14-21 Business Days', icon: <FiTruck /> },
                      { label: 'Material Grade', value: 'Premium Export Quality', icon: <FiAward /> },
                      { label: 'Origin', value: 'Global Hub A1', icon: <FiInfo /> }
                    ].map((spec, idx) => (
                      <tr key={idx} className="hover:bg-[var(--bg-secondary)] transition-colors">
                        <td className="p-5 font-black text-[var(--text-muted)] uppercase tracking-widest border-r border-[var(--border)] w-1/3">
                          <div className="flex items-center gap-3">
                            <span className="text-[var(--primary)] opacity-70">{spec.icon}</span>
                            {spec.label}
                          </div>
                        </td>
                        <td className="p-5 text-[var(--text-main)] font-bold">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Reviews / Ratings */}
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                  <div className="p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg text-lg"><FiStar /></div>
                  Customer Reviews
                </h2>
                <div className="text-sm font-bold text-[var(--primary)] hover:underline cursor-pointer">Post a review</div>
              </div>
              <div className="space-y-4">
                {[
                  { user: 'Alex Thompson', rating: 5, date: '2 days ago', comment: 'Exceptional quality. The fabric feel is much better than expected. Fast shipping!', initial: 'A' },
                  { user: 'Maria Garcia', rating: 5, date: '1 week ago', comment: 'Ordered 500 units for our boutique. Perfect sizing and consistent color across the batch.', initial: 'M' }
                ].map((review, i) => (
                  <div key={i} className="clean-card p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-indigo-600 flex items-center justify-center text-white font-black">{review.initial}</div>
                        <div>
                          <p className="font-black text-[var(--text-main)]">{review.user}</p>
                          <div className="flex text-amber-500 text-xs">
                            {[1, 2, 3, 4, 5].map(star => <FiStar key={star} className="fill-current" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{review.date}</span>
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium text-sm italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28"
            >
              <div className="glass-card p-8 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                <h3 className="text-2xl font-black text-[var(--text-main)] mb-8 flex items-center gap-3">
                  <FiShoppingBag className="text-[var(--primary)]" /> Secure Checkout
                </h3>

                {(!user || (dbUser?.role === 'buyer' && dbUser?.status === 'approved')) ? (
                  <form onSubmit={handleOrder} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">First Name</label>
                        <input
                          type="text"
                          value={orderData.firstName}
                          onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })}
                          className="modern-input !py-3"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">Last Name</label>
                        <input
                          type="text"
                          value={orderData.lastName}
                          onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })}
                          className="modern-input !py-3"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">Quantity</label>
                        <input
                          type="number"
                          value={orderData.quantity}
                          onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                          className="modern-input !py-3"
                          min={product.minimumOrder}
                          max={product.quantity}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">Total (Est.)</label>
                        <input
                          type="text"
                          value={`$${totalPrice.toFixed(2)}`}
                          className="modern-input !py-3 bg-[var(--bg-secondary)]"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">Contact Number</label>
                      <input
                        type="tel"
                        value={orderData.contact}
                        onChange={(e) => setOrderData({ ...orderData, contact: e.target.value })}
                        className="modern-input !py-3"
                        placeholder="+880 1234..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-muted)] mb-2 uppercase tracking-widest ml-1">Delivery Address</label>
                      <textarea
                        value={orderData.address}
                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                        className="modern-input !h-24 resize-none"
                        placeholder="Street, City, Postcode..."
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-gradient w-full py-5 text-lg font-black shadow-xl shadow-[var(--primary)]/30 mt-4"
                    >
                      Place Production Order
                    </motion.button>
                    {!user && (
                      <p className="text-[10px] text-center font-bold text-[var(--text-muted)] uppercase tracking-widest mt-4">
                        Login required to finalize order
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border)] text-center">
                    <FiShoppingBag className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                    <p className="text-[var(--text-secondary)] font-bold">
                      {dbUser?.role !== 'buyer'
                        ? "Only Buyers can place orders."
                        : "Account must be approved by admin."}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 5. Related Items */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-24 border-t border-[var(--border)]">
            <div className="flex justify-between items-end mb-16 px-4">
              <div>
                <h2 className="text-3xl font-black text-[var(--text-main)] mb-4">
                  Related <span className="gradient-text">Items</span>
                </h2>
                <p className="text-[var(--text-secondary)] font-medium max-w-xl">Explore other high-performance garments in the {product.category} category.</p>
              </div>
              <Link to="/products" className="btn-outline-clean flex items-center gap-2 group text-sm">
                Explore All Products <FiChevronRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p._id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
