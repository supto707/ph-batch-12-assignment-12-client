import { motion } from 'framer-motion';
import { FiHelpCircle, FiChevronRight } from 'react-icons/fi';

const FAQ = () => {
    const faqs = [
        { q: 'What is the minimum order quantity (MOQ)?', a: 'Our standard MOQ starts from 500 units per style, but this can vary based on fabric and complexity.' },
        { q: 'Do you offer international shipping?', a: 'Yes, we provide global logistics solutions with tracking and insurance for all bulk shipments.' },
        { q: 'How long does a sample production take?', a: 'Typically, a primary sample takes 7-10 working days after design finalization.' },
        { q: 'Can I track my production in real-time?', a: 'Absolutely! Our dashboard provides a 24/7 view of your order status from cutting to shipping.' },
        { q: 'Is there a cost for sampling?', a: 'Primary samples are usually charged at 3x the production price, which is often refunded upon bulk order placement.' }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            {/* Header */}
            <div className="bg-[var(--bg-secondary)] py-20 border-b border-[var(--border)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--primary)] opacity-5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex p-4 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl mb-6 shadow-xl shadow-black/5">
                            <FiHelpCircle size={32} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Knowledge <span className="gradient-text">Base</span></h1>
                        <p className="text-[var(--text-secondary)] font-medium text-lg max-w-xl mx-auto">Instant intel on our manufacturing protocols and operational standards.</p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <div className="grid gap-6">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-10 group border-[var(--border)] hover:border-[var(--primary)] transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--primary)] group-hover:h-full transition-all duration-500"></div>
                            <div className="flex items-start gap-6">
                                <div className="mt-1.5 p-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FiChevronRight />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[var(--text-main)] mb-4 tracking-tight group-hover:text-[var(--primary)] transition-colors leading-tight">{faq.q}</h3>
                                    <p className="text-[var(--text-secondary)] font-medium leading-relaxed text-lg opacity-80">{faq.a}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Support CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 text-center rounded-[40px] border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] transition-colors group"
                >
                    <h2 className="text-2xl font-black text-[var(--text-main)] mb-4">Can't find the specific intel?</h2>
                    <p className="text-[var(--text-secondary)] font-medium mb-8">Execute a direct channel request to our technical support team.</p>
                    <button className="btn-gradient px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                        Open Support Channel
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
