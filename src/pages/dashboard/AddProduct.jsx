import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormInput from '../../components/FormInput';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
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
      toast.error('Please add at least one image URL');
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, {
        withCredentials: true
      });
      toast.success('Product added successfully!');
      navigate('/dashboard/manage-products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.error || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Add New Product</h1>
      <p className="text-gray-600 mb-8">Create and list a new product in your catalog</p>
      
      <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-primary">📝 Basic Information</h2>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Product Name *</span></label>
              <input
                type="text"
                {...register('name', { required: 'Product name is required' })}
                placeholder="e.g., Premium Cotton T-Shirt"
                className={`input input-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${errors.name ? 'input-error border-error' : 'border-gray-300'}`}
              />
              {errors.name && <span className="text-error text-sm mt-1">⚠️ {errors.name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Description *</span></label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe your product features, materials, and benefits..."
                rows="4"
                className={`textarea textarea-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none ${errors.description ? 'textarea-error border-error' : 'border-gray-300'}`}
              />
              {errors.description && <span className="text-error text-sm mt-1">⚠️ {errors.description.message}</span>}
            </div>
          </div>

          {/* Category and Pricing */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-primary">💰 Category & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-gray-700">Category *</span></label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className={`select select-bordered border bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${errors.category ? 'select-error border-error' : 'border-gray-300'}`}
                >
                  <option value="">Select a category</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
                {errors.category && <span className="text-error text-sm mt-1">⚠️ {errors.category.message}</span>}
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-gray-700">Price (USD) *</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
                  placeholder="0.00"
                  className={`input input-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${errors.price ? 'input-error border-error' : 'border-gray-300'}`}
                />
                {errors.price && <span className="text-error text-sm mt-1">⚠️ {errors.price.message}</span>}
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-primary">📦 Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-gray-700">Available Quantity *</span></label>
                <input
                  type="number"
                  min="1"
                  {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Must be at least 1' } })}
                  placeholder="0"
                  className={`input input-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${errors.quantity ? 'input-error border-error' : 'border-gray-300'}`}
                />
                {errors.quantity && <span className="text-error text-sm mt-1">⚠️ {errors.quantity.message}</span>}
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-gray-700">Minimum Order Quantity *</span></label>
                <input
                  type="number"
                  min="1"
                  {...register('minimumOrder', { required: 'Minimum order is required', min: { value: 1, message: 'Must be at least 1' } })}
                  placeholder="1"
                  className={`input input-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${errors.minimumOrder ? 'input-error border-error' : 'border-gray-300'}`}
                />
                {errors.minimumOrder && <span className="text-error text-sm mt-1">⚠️ {errors.minimumOrder.message}</span>}
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-primary">🖼️ Media & Links</h2>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Product Images (comma-separated URLs) *</span></label>
              <textarea
                {...register('images', { required: 'At least one image URL is required' })}
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                rows="3"
                className={`textarea textarea-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none ${errors.images ? 'textarea-error border-error' : 'border-gray-300'}`}
              />
              {errors.images && <span className="text-error text-sm mt-1">⚠️ {errors.images.message}</span>}
              <p className="text-xs text-gray-500 mt-1">Enter multiple image URLs separated by commas</p>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Demo Video Link (optional)</span></label>
              <input
                type="url"
                {...register('demoVideo')}
                placeholder="https://youtube.com/watch?v=..."
                className="input input-bordered border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition border-gray-300"
              />
              {errors.demoVideo && <span className="text-error text-sm mt-1">⚠️ {errors.demoVideo.message}</span>}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b-2 border-primary">⚙️ Additional Settings</h2>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold text-gray-700">Payment Options</span></label>
              <select
                {...register('paymentOptions')}
                className="select select-bordered border bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition border-gray-300"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFast">PayFast</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  {...register('showOnHome')}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text font-semibold text-gray-700">Show on Home Page</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">Featured products appear on the homepage</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard/manage-products')}
              className="btn btn-outline btn-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg min-w-48"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding Product...
                </>
              ) : (
                '✓ Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddProduct;
