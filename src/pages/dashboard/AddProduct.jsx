import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormInput from '../../components/FormInput';

const AddProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      category: 'Shirt',
      paymentOptions: 'Cash on Delivery',
      showOnHome: false
    }
  });

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      minimumOrder: parseInt(data.minimumOrder),
      images: data.images.split(',').map(img => img.trim())
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, {
        withCredentials: true
      });
      toast.success('Product added successfully!');
      navigate('/dashboard/manage-products');
    } catch (error) {
      toast.error('Failed to add product');
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
          />
          {errors.description && <span className="text-error text-sm">{errors.description.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="select select-bordered"
            >
              <option>Shirt</option>
              <option>Pant</option>
              <option>Jacket</option>
              <option>Accessories</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Price</span></label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Available Quantity</span></label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Minimum Order Quantity</span></label>
            <input
              type="number"
              value={formData.minimumOrder}
              onChange={(e) => setFormData({...formData, minimumOrder: e.target.value})}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Images (comma-separated URLs)</span></label>
          <input
            type="text"
            value={formData.images}
            onChange={(e) => setFormData({...formData, images: e.target.value})}
            className="input input-bordered"
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            required
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Demo Video Link (optional)</span></label>
          <input
            type="url"
            value={formData.demoVideo}
            onChange={(e) => setFormData({...formData, demoVideo: e.target.value})}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Payment Options</span></label>
          <select
            value={formData.paymentOptions}
            onChange={(e) => setFormData({...formData, paymentOptions: e.target.value})}
            className="select select-bordered"
          >
            <option>Cash on Delivery</option>
            <option>PayFast</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-4">
            <input
              type="checkbox"
              checked={formData.showOnHome}
              onChange={(e) => setFormData({...formData, showOnHome: e.target.checked})}
              className="checkbox"
            />
            <span className="label-text">Show on Home Page</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
