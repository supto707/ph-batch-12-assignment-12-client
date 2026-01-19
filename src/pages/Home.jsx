import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FiArrowRight, FiPackage, FiZap, FiShield, FiHeart,
  FiSettings, FiTrendingUp, FiUsers, FiCpu,
  FiMail, FiPlus, FiMinus, FiCheckCircle
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/products/home`)
      .then(res => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Factory Units', value: '12', icon: <FiCpu /> },
    { label: 'Monthly Items', value: '50k+', icon: <FiTrendingUp /> },
    { label: 'Happy Clients', value: '800+', icon: <FiUsers /> },
    { label: 'Quality Score', value: '99.9%', icon: <FiShield /> },
  ];

  const processSteps = [
    { title: 'Design & Concept', desc: 'Working with your vision to create blueprints for production.', icon: <FiArrowRight /> },
    { title: 'Sourcing Material', desc: 'Premium fabrics sourced from sustainable global partners.', icon: <FiArrowRight /> },
    { title: 'Prototyping', desc: 'Rapid sample creation to ensure fit and finish perfection.', icon: <FiArrowRight /> },
    { title: 'Bulk Production', desc: 'State-of-the-art machinery handles high-volume orders.', icon: <FiArrowRight /> },
  ];

  const categories = [
    { name: 'Knitwear', count: '120 items', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
    { name: 'Denim', count: '85 items', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
    { name: 'Outerwear', count: '45 items', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
    { name: 'Activewear', count: '90 items', img: 'https://images.unsplash.com/photo-1539109132381-31a1C974273f?w=400' },
  ];

  const faqs = [
    { q: 'What is the minimum order quantity (MOQ)?', a: 'Our standard MOQ starts from 500 units per style, but this can vary based on fabric and complexity.' },
    { q: 'Do you offer international shipping?', a: 'Yes, we provide global logistics solutions with tracking and insurance for all bulk shipments.' },
    { q: 'How long does a sample production take?', a: 'Typically, a primary sample takes 7-10 working days after design finalization.' },
    { q: 'Can I track my production in real-time?', a: 'Absolutely! Our dashboard provides a 24/7 view of your order status from cutting to shipping.' },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="hero-clean relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 py-12 md:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <FiZap /> Optimized Production Flow
              </div>
              <h1 className="text-hero mb-6">
                Scale Your <span className="gradient-text">Garment Vision</span> With Precision
              </h1>
              <p className="text-subtitle mb-8 max-w-lg">
                Industry-leading production facilities equipped with 360° tracking. We turn your fashion designs into high-quality reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-gradient !py-4 !px-8 text-base">
                  Start Production <FiArrowRight />
                </Link>
                <Link to="/about" className="btn-outline-clean !py-4 !px-8 text-base font-bold">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl group border-8 border-[var(--bg-secondary)]">
                <img
                  src="https://images.unsplash.com/photo-1558444458-5cd05bc2da60?w=800&h=600&fit=crop"
                  alt="Garment Production"
                  className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent"></div>
              </div>

              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 glass-card p-6 rounded-3xl shadow-2xl max-w-xs border border-[var(--primary)]/20"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    <FiTrendingUp />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-[var(--text-main)]">98%</div>
                    <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider">On-Time delivery</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Brand Partners Section */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--bg-main)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
            {['ZARA', 'H&M', 'GUCCI', 'ADIDAS', 'NIKE'].map((brand) => (
              <span key={brand} className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-widest">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--primary)] transition-all group"
              >
                <div className="inline-flex p-4 bg-[var(--bg-main)] text-[var(--primary)] text-3xl rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-1">{stat.value}</div>
                <div className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Products Highlights Section */}
      <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">
              Premium <span className="gradient-text">Catalogue</span>
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Our state-of-the-art facilities produce excellence in every stitch. Explore our latest ready-to-scale designs.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.slice(0, 4).map((product, idx) => (
                    <ProductCard key={product._id} product={product} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[var(--bg-main)] rounded-[32px] border border-dashed border-[var(--border)]">
                  <p className="text-[var(--text-secondary)] font-bold">No products available at the moment.</p>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline-clean !py-4 !px-10 text-base font-bold hover:bg-[var(--primary)] hover:text-white transition-all">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Production Workflow Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title mb-8">
                How We Power Your <span className="text-[var(--primary)]">Production Journey</span>
              </h2>
              <div className="space-y-8">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] text-xl group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-[var(--text-main)] mb-1">{step.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop"
                alt="Production Team"
                className="rounded-[40px] shadow-2xl grayscale"
              />
              <div className="absolute -bottom-8 -right-8 glass-card p-8 rounded-3xl shadow-2xl max-w-xs">
                <p className="text-[var(--text-main)] font-black text-lg mb-2 italic">"Precision in every fiber, excellence in every stitch."</p>
                <div className="text-xs font-black text-[var(--primary)] uppercase tracking-widest">Global Manufacturing Hub</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Categories Grid Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4">Production <span className="text-[var(--text-muted)]">Specials</span></h2>
            <p className="text-subtitle">High-capacity lines for these core categories.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-80 rounded-[32px] overflow-hidden group border-2 border-transparent hover:border-[var(--primary)]"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-black mb-1">{cat.name}</h3>
                  <p className="text-xs opacity-70 uppercase tracking-widest font-black">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Advanced Monitoring (Feature Highlight) */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-[var(--secondary)] rounded-[60px] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)] blur-[150px] opacity-10 rounded-full"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                  Proprietary <span className="text-[var(--primary)]">360° Tracking</span> System
                </h2>
                <div className="space-y-6">
                  {['Real-time bottleneck detection', 'Automated quality reports', 'Supply chain transparency'].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/90">
                      <FiCheckCircle className="text-[var(--primary)] text-xl" />
                      <span className="font-bold">{f}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary-clean mt-10 !py-4 !px-8">
                  Get System Access
                </button>
              </motion.div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&h=600&fit=crop" alt="Dashboard Preview" className="rounded-3xl shadow-2xl border-4 border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4">Production <span className="gradient-text">FAQ</span></h2>
            <p className="text-subtitle font-medium">Clear answers for your manufacturing inquiries.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`clean-card transition-all duration-300 ${activeFaq === idx ? 'border-[var(--primary)]' : ''}`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="font-black text-[var(--text-main)] text-lg group-hover:text-[var(--primary)] transition-colors">{faq.q}</span>
                  <div className="text-xl text-[var(--primary)]">
                    {activeFaq === idx ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[var(--text-secondary)] font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4">Success <span className="text-[var(--text-muted)]">Stories</span></h2>
            <div className="w-20 h-1.5 bg-[var(--primary)] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah J.', role: 'Brand Owner', text: "The real-time tracking is a lifesaver. I can manage production while I'm traveling without any stress.", avatar: 'https://i.pravatar.cc/150?u=1' },
              { name: 'Marcus L.', role: 'Operations Head', text: "Transitioned from manual tracking to GarmentHouse, and it saved us 30% in operational costs within months.", avatar: 'https://i.pravatar.cc/150?u=2' },
              { name: 'Elena R.', role: 'Designer', text: "The quality consistency is unbelievable. 10,000 units and not a single qc rejection. Impressive.", avatar: 'https://i.pravatar.cc/150?u=3' },
            ].map((t, idx) => (
              <motion.div key={idx} className="clean-card p-8 hover:border-[var(--primary)] transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} className="w-12 h-12 rounded-full border-2 border-[var(--primary)]" />
                  <div>
                    <div className="font-black text-[var(--text-main)]">{t.name}</div>
                    <div className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] font-bold italic opacity-80 leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Newsletter Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 rounded-[40px] border-2 border-[var(--primary)]/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">Stay Ahead Of <span className="gradient-text">Trends</span></h2>
              <p className="text-[var(--text-secondary)] mb-10 max-w-xl mx-auto font-medium">
                Subscribe to our production insights and be the first to know about new capacity availability and material innovations.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="modern-input" required />
                <button type="submit" className="btn-gradient !py-4 !px-10 flex items-center justify-center gap-2">
                  Join Now <FiMail />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. CTA Section */}
      <section className="section-padding bg-[var(--secondary)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to <span className="text-[var(--primary)]">Dominate</span> the Market?
            </h2>
            <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto font-medium">
              Join the ranks of top brands producing with GarmentHouse. Quality, Speed, Transparency.
            </p>
            <Link to="/register" className="btn-gradient !py-6 !px-16 text-xl shadow-3xl shadow-[var(--primary)]/20 animate-bounce-slow">
              Start Your First Order
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;