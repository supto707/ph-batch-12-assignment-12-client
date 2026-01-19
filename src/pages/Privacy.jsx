import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';

const Privacy = () => {
    return (
        <div className="section-padding min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex p-4 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl mb-6 text-3xl">
                        <FiShield />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Privacy <span className="gradient-text">Policy</span></h1>
                </motion.div>

                <div className="clean-card p-10 space-y-8 text-[var(--text-secondary)] font-medium leading-relaxed">
                    <section>
                        <h2 className="text-xl font-black text-[var(--text-main)] mb-4">1. Data Collection</h2>
                        <p>We collect information you provide directly to us when creating an account, such as your name, email, and production details. This data is essential for managing your orders and maintaining quality standards.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-[var(--text-main)] mb-4">2. Usage of Information</h2>
                        <p>Your information is used solely to facilitate the production process, track shipments, and provide customer support. We do not sell your data to third parties.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-black text-[var(--text-main)] mb-4">3. Security</h2>
                        <p>We implement industry-standard security measures to protect your design blueprints and production data from unauthorized access or disclosure.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
