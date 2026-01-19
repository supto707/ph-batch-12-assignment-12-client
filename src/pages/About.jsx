import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiUsers, FiPackage, FiShield, FiTarget, FiGlobe } from 'react-icons/fi';

const About = () => {
  const stats = [
    { label: 'Products', value: '500+', icon: <FiPackage className="text-2xl" /> },
    { label: 'Happy Clients', value: '1,200+', icon: <FiUsers className="text-2xl" /> },
    { label: 'Orders Completed', value: '5,000+', icon: <FiTrendingUp className="text-2xl" /> }
  ];

  const visionPoints = [
    { title: 'Ethical Production', desc: 'Ensuring fair wages and safe environments across all partner factories.', icon: <FiShield /> },
    { title: 'Global Precision', desc: 'Leveraging Swiss-grade logistics for worldwide distribution accuracy.', icon: <FiGlobe /> },
    { title: 'Future-Proof Tech', desc: 'Integrating AI-driven pattern optimization for zero-waste production.', icon: <FiTarget /> }
  ];

  const benefits = [
    'Real-time production tracking',
    'Easy order management',
    'Transparent communication',
    'Quality assurance at every step',
    'Timely delivery guarantee'
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] py-20 border-b border-[var(--border)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Our <span className="gradient-text">Manifesto</span></h1>
            <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              We are decentralizing the garment industry by empowering small-scale factories with enterprise-grade operational intelligence.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 text-center relative overflow-hidden group border-[var(--border)] hover:border-[var(--primary)] shadow-2xl shadow-black/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="inline-flex p-4 bg-[var(--primary)]/10 rounded-2xl text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-[var(--text-main)] mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-[var(--text-muted)] font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em] mb-6">Established 2012</div>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-8 tracking-tighter leading-tight">
                Engineering the <span className="text-[var(--primary)] italic">Next Era</span> of Manufacturing
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed font-medium">
                Garment House serves as the critical infrastructure layer for modern apparel brands. We don't just facilitate orders; we optimize entire production lifecycles through data-driven synthesis.
              </p>

              <div className="grid gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[var(--primary)] text-[var(--primary)] flex items-center justify-center transition-all">
                      <FiCheckCircle className="text-sm" />
                    </div>
                    <span className="text-[var(--text-main)] font-black text-sm uppercase tracking-wide">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group border-[12px] border-[var(--bg-secondary)] aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1558444458-5cd05bc2da60?w=800&fit=crop"
                  alt="Production Intelligence"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/30 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-12 -left-12 glass-card p-10 rounded-[32px] shadow-2xl max-w-xs border-2 border-[var(--primary)]/20 backdrop-blur-2xl">
                <div className="text-6xl font-black text-[var(--primary)] mb-2 tracking-tighter">12Y+</div>
                <p className="text-[var(--text-main)] font-black leading-tight text-xl">Operational Excellence in the Global South.</p>
              </div>
            </motion.div>
          </div>

          {/* Vision Section */}
          <div className="pt-20 border-t border-[var(--border)]">
            <h2 className="text-3xl font-black text-[var(--text-main)] mb-12 text-center uppercase tracking-widest">Strategic Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visionPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--primary)] transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center text-xl mb-6 shadow-xl shadow-[var(--primary)]/20 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <h4 className="text-lg font-black text-[var(--text-main)] mb-3">{point.title}</h4>
                  <p className="text-[var(--text-secondary)] font-medium text-sm leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
