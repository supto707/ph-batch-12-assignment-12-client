import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { search }
      });
      const myProducts = data.filter(p => p.createdBy === user.email);
      setProducts(myProducts);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        withCredentials: true
      });
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link to="/dashboard/add-product" className="btn btn-primary">Add New Product</Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                  <div className="avatar">
                    <div className="w-16 h-16 rounded">
                      <img src={product.images?.[0] || 'https://via.placeholder.com/150'} alt={product.name} />
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><span className="badge">{product.category}</span></td>
                <td>{product.paymentOptions}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-warning btn-xs">Edit</button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl opacity-60">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
