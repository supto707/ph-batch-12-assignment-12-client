import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTag, FiStar, FiClock, FiMapPin } from 'react-icons/fi';

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="clean-card group h-full flex flex-col bg-[var(--bg-card)]"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'}
                    alt={product.name}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[var(--primary)]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                        <FiTag className="text-[12px]" />
                        {product.category}
                    </span>
                </div>
                {product.quantity > 0 ? (
                    <div className="absolute bottom-4 right-4">
                        <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                            In Stock
                        </span>
                    </div>
                ) : (
                    <div className="absolute bottom-4 right-4">
                        <span className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-xl text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                            <FiStar className="fill-current" />
                            <span>{product.rating || '4.8'}</span>
                        </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] font-medium mb-4 line-clamp-2 min-h-[40px]">
                        {product.description}
                    </p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider">
                            <FiClock className="text-[var(--primary)] text-sm" />
                            <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently Added'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider">
                            <FiMapPin className="text-[var(--primary)] text-sm" />
                            <span>{product.location || 'Dhaka, BD'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-[var(--border)]">
                    <div>
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-0.5 font-black">
                            Unit Price
                        </span>
                        <span className="text-2xl font-black text-[var(--primary)]">
                            ${product.price}
                        </span>
                    </div>
                    <Link
                        to={`/products/${product._id}`}
                        className="btn-gradient !py-3 !px-6 !text-[12px] flex items-center gap-2"
                    >
                        View Details
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
