import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleToggleHome = async (productId, currentValue) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/products/${productId}`, 
        { showOnHome: !currentValue },
        { withCredentials: true }
      );
      toast.success('Product updated');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
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
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
            <tr className="text-black">
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                  <div className="avatar">
                    <div className="w-16 h-16 rounded">
                      <img src={product.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23ddd" width="150" height="150"/%3E%3Ctext x="50%" y="50%" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'} alt={product.name} />
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><span className="badge">{product.category}</span></td>
                <td className="text-sm">{product.createdBy}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={product.showOnHome || false}
                    onChange={() => handleToggleHome(product._id, product.showOnHome)}
                    className="link-checkbox"
                  />
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn-custom btn-custom-primary btn-custom-sm">Edit</button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="btn-custom btn-custom-error btn-custom-sm"
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

export default AllProducts;
