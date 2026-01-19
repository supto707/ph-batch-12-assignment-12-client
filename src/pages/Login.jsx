import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, login, googleLogin, facebookLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    // Check if it's a demo email
    const demoEmails = ['admin123@gmail.com', 'manager123@gmail.com', 'buyer123@gmail.com'];
    const isDemo = demoEmails.includes(email);

    try {
      await login(email, password);
      toast.success('Welcome back! Login successful');
      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      // Firebase Login Error
      // If it's a demo account and fails (likely not in firebase), 
      // try registering it automatically
      if (isDemo && (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email' || error.message.includes('400'))) {
        try {
          const role = email.split('123')[0]; // simple logic to get role from demo email
          await register(email, password);

          // Seed to backend
          await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `${role.charAt(0).toUpperCase() + role.slice(1)} Demo`,
              email: email,
              role: role,
              status: 'approved'
            })
          });

          toast.success(`Demo ${role} account initialized & logged in!`);
          navigate(location.state?.from?.pathname || '/');
        } catch (regError) {
          // Firebase Register Error
          toast.error('Failed to initialize demo account.');
        }
      } else {
        toast.error(error.message || 'Login failed. Please check your credentials.');
      }
    }
    setLoading(false);
  };

  const handleSocialLogin = async (method) => {
    setLoading(true);
    try {
      const result = await method();
      const user = result.user;

      await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'buyer',
          status: 'pending'
        })
      });

      toast.success('Welcome! Login successful');
      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      toast.error('Social login failed. Please try again.');
    }
    setLoading(false);
  };

  const handleDemoLogin = (role) => {
    const creds = {
      admin: { email: 'admin123@gmail.com', pass: 'Admin123' },
      manager: { email: 'manager123@gmail.com', pass: 'Manager123' },
      buyer: { email: 'buyer123@gmail.com', pass: 'Buyer123' }
    };
    setEmail(creds[role].email);
    setPassword(creds[role].pass);
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials loaded!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-card relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--primary)] opacity-10 blur-3xl rounded-full"></div>

          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 bg-[var(--bg-secondary)] rounded-2xl mb-4 border border-[var(--border)]"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl flex items-center justify-center shadow-lg">
                <FiLock className="text-2xl text-white" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black gradient-text mb-2"
            >
              Welcome Back
            </motion.h2>
            <p className="text-[var(--text-secondary)] font-medium">Continue your journey with us</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {/* Demo Login Options */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                <FiUsers className="text-[var(--primary)]" />
                <span>Quick Access (Demo)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['admin', 'manager', 'buyer'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleDemoLogin(role)}
                    className="py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                Email Address
              </label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modern-input"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                Password
              </label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="modern-input pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-4 text-base font-bold shadow-lg"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="px-4 bg-[var(--bg-card)] text-[var(--text-muted)]">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => handleSocialLogin(googleLogin)}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-4 py-4 border border-[var(--border)] rounded-2xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-main)] hover:border-[var(--primary)] transition-all font-bold text-xs text-[var(--text-main)] shadow-sm group"
              >
                <FcGoogle className="text-xl group-hover:scale-110 transition-transform" />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin(facebookLogin)}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-4 py-4 border border-[var(--border)] rounded-2xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-main)] hover:border-[#1877F2]/20 hover:text-[#1877F2] transition-all font-bold text-xs text-[var(--text-main)] shadow-sm group"
              >
                <FaFacebook className="text-xl text-[#1877F2] group-hover:scale-110 transition-transform" />
                Facebook
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-10 text-[var(--text-secondary)] text-sm"
          >
            New to the platform?{' '}
            <Link to="/register" className="font-bold text-[var(--primary)] hover:underline">
              Create an account
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;