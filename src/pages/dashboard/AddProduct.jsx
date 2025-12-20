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
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <FormInput
          label="Product Name"
          {...register('name', { required: 'Product name is required' })}
          error={errors.name?.message}
        />

        <div className="form-control">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
            rows="4"
            placeholder="Describe your product..."
          />
          {errors.description && <span className="text-error text-sm">{errors.description.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="select select-bordered"
            >
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <span className="text-error text-sm">{errors.category.message}</span>}
          </div>

          <FormInput
            label="Price"
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
            error={errors.price?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Available Quantity"
            type="number"
            {...register('quantity', { required: 'Quantity is required' })}
            error={errors.quantity?.message}
          />

          <FormInput
            label="Minimum Order Quantity"
            type="number"
            {...register('minimumOrder', { required: 'Minimum order is required' })}
            error={errors.minimumOrder?.message}
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Images (comma-separated URLs)</span></label>
          <textarea
            {...register('images', { required: 'At least one image URL is required' })}
            className={`textarea textarea-bordered h-24 ${errors.images ? 'textarea-error' : ''}`}
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
          />
          {errors.images && <span className="text-error text-sm">{errors.images.message}</span>}
        </div>

        <FormInput
          label="Demo Video Link (optional)"
          type="url"
          {...register('demoVideo')}
          error={errors.demoVideo?.message}
        />

        <div className="form-control">
          <label className="label"><span className="label-text">Payment Options</span></label>
          <select
            {...register('paymentOptions')}
            className="select select-bordered"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="PayFast">PayFast</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              {...register('showOnHome')}
              className="checkbox"
            />
            <span className="label-text">Show on Home Page</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Adding Product...
            </>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
