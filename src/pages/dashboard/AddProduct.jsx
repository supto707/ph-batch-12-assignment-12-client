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
      <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
      <p className="text-gray-600 mb-6">Create and list a new product in your catalog</p>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h2>
            <FormInput
              label="Product Name"
              {...register('name', { required: 'Product name is required' })}
              error={errors.name?.message}
              placeholder="e.g., Premium Cotton T-Shirt"
            />

            <div className="mt-4">
              <label className="label"><span className="label-text font-semibold">Description</span></label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                rows="4"
                placeholder="Describe your product features, materials, and benefits..."
              />
              {errors.description && <span className="text-error text-sm">{errors.description.message}</span>}
            </div>
          </div>

          {/* Category and Pricing */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Category & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className={`select select-bordered ${errors.category ? 'select-error' : ''}`}
                >
                  <option value="">Select a category</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
                {errors.category && <span className="text-error text-sm">{errors.category.message}</span>}
              </div>

              <FormInput
                label="Price (USD)"
                type="number"
                step="0.01"
                min="0"
                {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
                error={errors.price?.message}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Available Quantity"
                type="number"
                min="1"
                {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Must be at least 1' } })}
                error={errors.quantity?.message}
              />

              <FormInput
                label="Minimum Order Quantity"
                type="number"
                min="1"
                {...register('minimumOrder', { required: 'Minimum order is required', min: { value: 1, message: 'Must be at least 1' } })}
                error={errors.minimumOrder?.message}
              />
            </div>
          </div>

          {/* Media */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Media & Links</h2>
            <div>
              <label className="label"><span className="label-text font-semibold">Product Images (comma-separated URLs)</span></label>
              <textarea
                {...register('images', { required: 'At least one image URL is required' })}
                className={`textarea textarea-bordered w-full h-20 ${errors.images ? 'textarea-error' : ''}`}
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              />
              {errors.images && <span className="text-error text-sm">{errors.images.message}</span>}
              <p className="text-xs text-gray-500 mt-1">Enter multiple image URLs separated by commas</p>
            </div>

            <div className="mt-4">
              <FormInput
                label="Demo Video Link (optional)"
                type="url"
                {...register('demoVideo')}
                error={errors.demoVideo?.message}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Settings</h2>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Payment Options</span></label>
              <select
                {...register('paymentOptions')}
                className="select select-bordered"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFast">PayFast</option>
              </select>
            </div>

            <div className="form-control mt-4">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  {...register('showOnHome')}
                  className="checkbox"
                />
                <span className="label-text">Show on Home Page</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">Featured products appear on the homepage</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard/manage-products')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary min-w-32"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding...
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
