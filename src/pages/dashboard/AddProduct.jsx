import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiPlus, FiBox, FiDollarSign, FiLayers, FiImage, FiVideo, FiCheckCircle, FiX, FiTag, FiFileText } from 'react-icons/fi';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: 'Shirt',
      price: '',
      quantity: '',
      minimumOrder: '1',
      images: '',
      demoVideo: '',
      paymentOptions: 'Cash on Delivery',
      showOnHome: false
    }
  });

  const onSubmit = async (data) => {
    if (!data.images || data.images.trim() === '') {
      toast.error('Logistics documentation requires asset imagery');
      return;
    }

    const productData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      minimumOrder: parseInt(data.minimumOrder) || 1,
      images: data.images.split(',').map(img => img.trim()).filter(img => img),
      demoVideo: data.demoVideo || '',
      paymentOptions: data.paymentOptions,
      showOnHome: data.showOnHome === true || data.showOnHome === 'on'
    };

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, {
        withCredentials: true
      });
      toast.success('Asset registration protocol successful');
      navigate('/dashboard/manage-products');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration protocol failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiPlus className="text-[var(--primary)]" /> Asset Registration
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Initialize New Product Entry in Catalog</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border border-[var(--border)] rounded-[40px] p-8 lg:p-12 shadow-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Section: Core Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-[var(--border)]">
              <FiTag className="text-[var(--primary)] text-xl" />
              <h2 className="text-lg font-black text-[var(--text-main)] uppercase tracking-tighter">Core Identity</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2 lg:col-span-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Asset Designation (Name)</label>
                <div className="relative">
                  <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    type="text"
                    {...register('name', { required: 'Designation required' })}
                    placeholder="e.g., Industrial Grade Cotton Composite"
                    className={`modern-input !pl-12 ${errors.name ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.name.message}</span>}
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Manifest Description</label>
                <div className="relative">
                  <FiFileText className="absolute left-4 top-6 text-[var(--primary)]" />
                  <textarea
                    {...register('description', { required: 'Manifest details required' })}
                    placeholder="Specify material composition, technical specs, and utility features..."
                    rows="4"
                    className={`modern-input !pl-12 !py-4 min-h-[120px] resize-none ${errors.description ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.description && <span className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-1">{errors.description.message}</span>}
              </div>
            </div>
          </div>

          {/* Section: Commercial Parameters */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-[var(--border)]">
              <FiDollarSign className="text-[var(--primary)] text-xl" />
              <h2 className="text-lg font-black text-[var(--text-main)] uppercase tracking-tighter">Commercial Parameters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Sector Class</label>
                <select
                  {...register('category', { required: 'Category selection required' })}
                  className="modern-input font-bold appearance-none"
                >
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Unit Valuation (USD)</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Valuation required' })}
                    placeholder="0.00"
                    className="modern-input !pl-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Stockage Volume</label>
                <div className="relative">
                  <FiBox className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    type="number"
                    {...register('quantity', { required: 'Volume count required' })}
                    placeholder="0"
                    className="modern-input !pl-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Min Protocol Qty</label>
                <input
                  type="number"
                  {...register('minimumOrder', { required: 'Minimum protocol required' })}
                  placeholder="1"
                  className="modern-input"
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Transaction Methods</label>
                <select
                  {...register('paymentOptions')}
                  className="modern-input font-bold appearance-none"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="PayFast">PayFast</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Multimedia Documentation */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-[var(--border)]">
              <FiImage className="text-[var(--primary)] text-xl" />
              <h2 className="text-lg font-black text-[var(--text-main)] uppercase tracking-tighter">Multimedia Documentation</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Asset Imagery (Comma-Delimited URLs)</label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-6 text-[var(--primary)]" />
                  <textarea
                    {...register('images', { required: 'Visual data required' })}
                    placeholder="https://cdn.example.com/asset1.jpg, https://cdn.example.com/asset2.jpg"
                    className="modern-input !pl-12 !py-4 min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Direct Demonstration Link (Optional)</label>
                <div className="relative">
                  <FiVideo className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    type="url"
                    {...register('demoVideo')}
                    placeholder="https://vimeo.com/demo/protocol-x"
                    className="modern-input !pl-12"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Display Protocols */}
          <div className="bg-[var(--bg-secondary)] rounded-3xl p-6 border border-[var(--border)]">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative w-12 h-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full transition-colors group-hover:border-[var(--primary)]/50">
                <input
                  type="checkbox"
                  {...register('showOnHome')}
                  className="sr-only peer"
                />
                <div className="absolute top-1 left-1 w-4 h-4 bg-[var(--text-muted)] rounded-full transition-all peer-checked:bg-[var(--primary)] peer-checked:translate-x-6 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"></div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest">Homepage Frontline Protocol</span>
                <p className="text-[10px] font-medium text-[var(--text-muted)] italic">Feature this asset prominently on the primary terminal.</p>
              </div>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => navigate('/dashboard/manage-products')}
              className="btn-outline-clean !py-4 !px-12 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"
            >
              <FiX /> Abort Protocol
            </button>
            <button
              type="submit"
              className="btn-gradient !py-4 !px-16 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 min-w-[240px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FiCheckCircle className="text-lg" /> Execute Registration
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
