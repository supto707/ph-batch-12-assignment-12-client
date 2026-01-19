import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 shadow-inner overflow-hidden border border-[var(--border)] ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
        }`}
      aria-label="Toggle Theme"
    >
      <motion.div
        layout
        className="z-10 w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg text-white"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ transform: theme === 'light' ? 'translateX(0)' : 'translateX(24px)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'light' ? <FiMoon size={14} /> : <FiSun size={14} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
