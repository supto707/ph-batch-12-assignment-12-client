import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPackage, FiHome, FiCheck, FiX, FiEdit2, FiTrash2, FiSearch, FiAlertCircle } from 'react-icons/fi';

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { search }
      });
      const fetchedProducts = Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
      setProducts(fetchedProducts);
    } catch (error) {
      toast.error('Failed to sync global catalog');
    }
    setLoading(false);
  };

  const handleToggleHome = async (productId, currentValue) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/products/${productId}`,
        { showOnHome: !currentValue },
        { withCredentials: true }
      );
      toast.success(currentValue ? 'Removed from showcase' : 'Promoted to showcase');
      fetchProducts();
    } catch (error) {
      toast.error('Catalogue update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to decommission this product line?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        withCredentials: true
      });
      toast.success('Registry purged successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Purge protocol failed');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiPackage className="text-[var(--primary)]" /> Global Catalog
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Enterprise Digital Assests Management</p>
        </div>

        <div className="relative group w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="text"
            placeholder="Search Global IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modern-input !pl-12 !py-3 shadow-sm bg-[var(--bg-card)]"
            onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
          />
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Digital Asset</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Designation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Unit Price</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Origin Terminal</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-center">Volume</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-center">Showcase</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-20 text-center">
                    <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
                  </td>
                </tr>
              ) : (
                <>
                  {products.length > 0 ? (
                    products.map((product, idx) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-[var(--primary)]/5 transition-colors group"
                      >
                        <td className="p-6">
                          <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-[var(--primary)]/20 ring-offset-2 ring-offset-[var(--bg-card)] shadow-lg group-hover:scale-105 transition-transform">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80'}
                              alt={product.name}
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80' }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-black text-[var(--text-main)]">{product.name}</div>
                          <span className="px-2 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded md text-[8px] font-black uppercase tracking-widest text-[var(--primary)]">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-6 font-black text-[var(--text-main)]">${product.price}</td>
                        <td className="p-6">
                          <div className="text-xs font-bold text-[var(--text-secondary)]">{product.createdBy}</div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-center">
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black border ${product.quantity > 10 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                              {product.quantity}
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleHome(product._id, product.showOnHome)}
                              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${product.showOnHome ? 'bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/30' : 'bg-[var(--border)]'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${product.showOnHome ? 'left-7' : 'left-1'}`}></div>
                            </button>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => toast.success(`Edit feature coming soon for: ${product.name}`)}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-20 text-center">
                        <FiAlertCircle className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                        <p className="text-[var(--text-secondary)] font-bold italic">No products designated in global registry.</p>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
