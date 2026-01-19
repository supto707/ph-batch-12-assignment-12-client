import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiUserCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    role: 'buyer',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register: registerUser, updateUserProfile, googleLogin, facebookLogin } = useAuth();
  const navigate = useNavigate();

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

      toast.success('Welcome aboard! Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('Social registration failed. Please try again.');
    }
    setLoading(false);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      toast.error('Password must contain at least one uppercase letter');
      return false;
    }
    if (!hasLowerCase) {
      toast.error('Password must contain at least one lowercase letter');
      return false;
    }
    if (!isLongEnough) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(formData.password)) return;

    setLoading(true);
    try {
      await registerUser(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photoURL);

      await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          photoURL: formData.photoURL,
          role: formData.role,
          status: 'pending'
        })
      });

      toast.success('Account created successfully! Welcome aboard!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-card relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)] opacity-10 blur-3xl rounded-full"></div>

          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-3 bg-[var(--bg-secondary)] rounded-2xl mb-4 border border-[var(--border)]"
            >
              <FiUserCheck className="text-3xl text-[var(--primary)]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black gradient-text mb-3"
            >
              Start Producing
            </motion.h2>
            <p className="text-[var(--text-secondary)] font-medium">Join the next generation of garment production</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                  Full Name
                </label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="modern-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                  Account Type
                </label>
                <div className="input-with-icon">
                  <FiUserCheck className="input-icon" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="modern-input appearance-none"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                Email Address
              </label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="modern-input"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                Profile Photo (Optional)
              </label>
              <div className="input-with-icon">
                <FiImage className="input-icon" />
                <input
                  type="url"
                  value={formData.photoURL}
                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                  className="modern-input"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                  Password
                </label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-bold text-[var(--text-main)] mb-2 ml-1">
                  Confirm
                </label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="modern-input pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold text-center py-2">
              6+ Characters • 1 Uppercase • 1 Lowercase
            </p>

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
                'Create Your Account'
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="px-4 bg-[var(--bg-card)] text-[var(--text-muted)]">Or join with</span>
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
            transition={{ delay: 0.9 }}
            className="text-center mt-8 text-[var(--text-secondary)] text-sm"
          >
            Already an innovator?{' '}
            <Link to="/login" className="font-bold text-[var(--primary)] hover:underline">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;