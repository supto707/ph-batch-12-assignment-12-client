import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiPackage, FiAlertCircle } from 'react-icons/fi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { search }
      });
      const allProducts = Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
      const myProducts = allProducts.filter(p => p.createdBy === user.email);
      setProducts(myProducts);
    } catch (error) {
      toast.error('Failed to sync inventory');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to decommission this product line?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        withCredentials: true
      });
      toast.success('Product registry purged');
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
            <FiPackage className="text-[var(--primary)]" /> Garment Inventory
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Active Production Lines & Registry</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-72">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="modern-input !pl-12 !py-3 shadow-sm bg-[var(--bg-card)]"
            />
          </div>
          <Link to="/dashboard/add-product" className="btn-gradient !py-3 !px-6 flex items-center justify-center gap-2 font-black text-sm">
            <FiPlus /> New Asset
          </Link>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Visual Asset</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Product Designation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Unit Valuation</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Classification</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Payment Protocols</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">System Protocols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center">
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
                            <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200'} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-black text-[var(--text-main)]">{product.name}</div>
                          <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">ID: {product._id.slice(-8)}</div>
                        </td>
                        <td className="p-6 font-black text-[var(--primary)] text-lg">${product.price}</td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-6 text-xs font-bold text-[var(--text-secondary)]">{product.paymentOptions}</td>
                        <td className="p-6">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm" title="Edit Registry">
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                              title="Decommission Product"
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
                        <p className="text-[var(--text-secondary)] font-bold italic">No assets registered in your department.</p>
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

export default ManageProducts;
