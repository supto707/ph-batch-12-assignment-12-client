import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: { search }
      });
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setProducts([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      
      <div className="mb-8 flex gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="modern-input flex-1"
        />
        <select
          onChange={(e) => setSearch(e.target.value)}
          className="modern-input"
        >
          <option value="">All Categories</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Jacket">Jacket</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="property-grid">
        {Array.isArray(products) && products.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="clean-card overflow-hidden"
          >
            <div className="relative">
              <img 
                src={product.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext x="50%" y="50%" font-size="18" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E'} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {product.description?.substring(0, 80)}...
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </div>
                  <div className="text-xs text-gray-500">
                    Available: {product.quantity}
                  </div>
                </div>
                <Link 
                  to={`/products/${product._id}`}
                  className="btn-primary-clean text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
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
