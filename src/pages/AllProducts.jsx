import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiList, FiAlertCircle } from 'react-icons/fi';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('createdAt-desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minRating, setMinRating] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1); // Reset to first page on filter change
    fetchProducts();
  }, [search, category, minPrice, maxPrice, minRating, sort]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [sortField, sortOrder] = sort.split('-');
      const params = {
        search,
        category,
        minPrice,
        maxPrice,
        minRating,
        sortField,
        sortOrder,
        page,
        limit: 8
      };

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { params });
      const fetchedProducts = Array.isArray(data.products) ? data.products : [];
      setProducts(fetchedProducts);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.totalProducts || 0);
    } catch (error) {
      // Fetch error
      setProducts([]);
    }
    setLoading(false);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSort('createdAt-desc');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Header Area */}
      <div className="bg-[var(--bg-secondary)] py-16 border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-5 blur-[100px] rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl mb-4">
              <FiList size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Global <span className="gradient-text">Catalogue</span></h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-medium">
              Explore {totalProducts} premium garments synthesized through state-of-the-art production lines.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6 mb-12"
        >
          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="text"
                placeholder="Search by garment name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="modern-input !pl-12 !py-4 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4">
              {/* Category */}
              <div className="relative flex-1 md:w-48">
                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="modern-input !pl-12 !py-4 appearance-none font-bold"
                >
                  <option value="">All Categories</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative flex-1 md:w-48">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="modern-input !py-4 appearance-none font-bold text-center"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sub Controls Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 glass-card rounded-3xl border border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Price Range</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="modern-input !py-2 !px-3 !w-24 !text-xs"
                  />
                  <span className="text-[var(--border)]">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="modern-input !py-2 !px-3 !w-24 !text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Quality Score</span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="modern-input !py-2 !px-3 !w-32 !text-xs font-bold"
                >
                  <option value="">Any Quality</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {(search || category || minPrice || maxPrice || minRating) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-black text-[var(--primary)] uppercase tracking-widest hover:underline"
                >
                  Clear All Filters
                </button>
              )}
              <div className="h-4 w-px bg-[var(--border)] hidden md:block"></div>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Showing {products.length} of {totalProducts}
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductSkeleton key={i} />)}
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {Array.isArray(products) && products.map((product, idx) => (
                    <ProductCard key={product._id} product={product} index={idx} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-16">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(p => p - 1)}
                      className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-main)] disabled:opacity-30 hover:border-[var(--primary)] transition-all"
                    >
                      <FiChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          onClick={() => setPage(num)}
                          className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${page === num ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30' : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(p => p + 1)}
                      className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-main)] disabled:opacity-30 hover:border-[var(--primary)] transition-all"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-[var(--bg-secondary)] rounded-[40px] border border-dashed border-[var(--border)]"
              >
                <div className="w-20 h-20 bg-[var(--bg-main)] rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
                  <FiAlertCircle className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-main)] mb-2">No Matching Garments</h3>
                <p className="text-[var(--text-secondary)] font-medium max-w-md mx-auto mb-8">
                  Our production line hasn't synthesized items matching your current filters. Try widening your parameters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-gradient !py-4 !px-8 text-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
