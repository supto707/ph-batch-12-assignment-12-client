import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-main)] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)] opacity-10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 opacity-10 blur-[150px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-card p-12 md:p-20 text-center relative z-10 border border-[var(--border)] shadow-2xl rounded-[60px]"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="inline-flex p-6 bg-rose-500/10 text-rose-500 rounded-3xl mb-12 text-5xl"
        >
          <FiAlertTriangle />
        </motion.div>

        <h1 className="text-8xl md:text-9xl font-black text-[var(--text-main)] tracking-tighter mb-4">
          4<span className="text-[var(--primary)]">0</span>4
        </h1>

        <h2 className="text-3xl font-black text-[var(--text-main)] mb-6 uppercase tracking-tight">
          Node Connection Lost
        </h2>

        <p className="text-[var(--text-secondary)] font-medium text-lg mb-12 leading-relaxed max-w-md mx-auto">
          The requested navigational coordinate does not match any known assets in the production ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-gradient !py-4 !px-10 flex items-center justify-center gap-3 text-sm"
          >
            <FiHome className="text-lg" /> Return to Terminal
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline-clean !py-4 !px-10 flex items-center justify-center gap-3 text-sm"
          >
            <FiArrowLeft className="text-lg" /> Revert Protocol
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
