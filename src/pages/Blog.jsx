import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'The Future of Sustainable Garment Manufacturing',
            excerpt: 'Explore how eco-friendly practices are reshaping the fashion industry and why sustainability is the new standard.',
            author: 'Sarah Chen',
            date: 'May 15, 2024',
            category: 'Sustainability',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop'
        },
        {
            id: 2,
            title: 'Optimizing Factory Workflows with AI',
            excerpt: 'How artificial intelligence is automating pattern making and reducing waste in high-volume production lines.',
            author: 'Marcus Thorne',
            date: 'May 12, 2024',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1558444458-5cd05bc2da60?w=800&h=500&fit=crop'
        },
        {
            id: 3,
            title: 'Supply Chain Resilience in a Post-Pandemic World',
            excerpt: 'Strategic insights into building robust supply chains that can withstand global disruptions and maintain quality.',
            author: 'Elena Rodriguez',
            date: 'May 08, 2024',
            category: 'Strategy',
            image: 'https://images.unsplash.com/photo-1586528116311-ad86d7c488d8?w=800&h=500&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            {/* Hero Section */}
            <div className="bg-[var(--bg-secondary)] py-24 border-b border-[var(--border)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)] opacity-5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                            Production <span className="gradient-text">Insights</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Stay updated with the latest trends, technologies, and strategies in the global garment manufacturing landscape.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="clean-card group overflow-hidden flex flex-col h-full hover:border-[var(--primary)] transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[var(--primary)]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                                        <FiTag /> {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center gap-4 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-6">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="text-[var(--primary)]" /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiUser className="text-[var(--primary)]" /> {post.author}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-black text-[var(--text-main)] mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-[var(--text-secondary)] font-medium mb-8 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-[var(--border)]">
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-[var(--primary)] font-black text-xs uppercase tracking-widest flex items-center gap-2 group/link"
                                    >
                                        Establish Connection <FiArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/90 rounded-[48px] text-white relative overflow-hidden"
                >
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-black mb-4 tracking-tight">Sync Your Intel Feed</h2>
                            <p className="text-white/80 font-medium text-lg">Receive exclusive manufacturing reports and market data directly in your inbox.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your transmission address"
                                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-1 backdrop-blur-md placeholder:text-white/50 text-white font-bold outline-none focus:border-white/40 transition-all"
                            />
                            <button className="bg-white text-[var(--primary)] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-opacity-95 transition-all shadow-2xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
