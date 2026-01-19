import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiEdit3, FiLogOut, FiSave, FiX, FiShield, FiUser, FiMail, FiCalendar } from 'react-icons/fi';

const Profile = () => {
  const { user, dbUser, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error('Display Name is required');
      return;
    }

    try {
      setLoading(true);

      // Update Firebase profile
      await updateUserProfile(displayName, photoURL);

      // Update database
      if (dbUser?._id) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${dbUser._id}`,
          { name: displayName, photoURL },
          { withCredentials: true }
        );
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      // Error updating profile
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Safe journey! Logged out');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tight">
            Identity <span className="gradient-text">Registry</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1">Manage your professional profile and credentials</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn-outline-clean !border-rose-500/20 !text-rose-500 hover:!bg-rose-500 hover:!text-white flex items-center gap-2"
        >
          <FiLogOut /> De-authenticate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 glass-card p-8 border border-[var(--border)] h-fit sticky top-24"
        >
          <div className="relative group mx-auto w-40 h-40 mb-6">
            <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-[var(--primary)] shadow-2xl transition-transform group-hover:scale-105">
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                alt={user?.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-2 -right-2 p-3 bg-[var(--primary)] text-white rounded-2xl shadow-xl hover:scale-110 transition-all"
              >
                <FiEdit3 />
              </button>
            )}
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[var(--text-main)] line-clamp-1">{user?.displayName || 'Unknown Subject'}</h2>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-black uppercase tracking-widest border border-[var(--primary)]/20">
              <FiShield className="mr-2" /> {dbUser?.role || 'User'}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-widest">Status</span>
              <span className={`font-black ${dbUser?.status === 'approved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                ● {dbUser?.status?.toUpperCase() || 'PENDING'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-widest">Joined</span>
              <span className="font-black text-[var(--text-main)]">
                {dbUser?.createdAt ? new Date(dbUser.createdAt).getFullYear() : '2024'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {isEditing ? (
            <div className="glass-card p-8 border-2 border-[var(--primary)]/30">
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-3">
                <FiEdit3 className="text-[var(--primary)]" /> Modify Identification
              </h3>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Universal Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="modern-input"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">High-Res Avatar URL</label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="modern-input"
                    placeholder="https://images.unsplash.com/your-photo"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <button type="submit" disabled={loading} className="btn-gradient flex-1 flex items-center justify-center gap-2">
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <FiSave />} Commit Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-outline-clean flex items-center gap-2 px-8">
                    <FiX /> Abort
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="glass-card p-8 border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <FiUser /> <span className="text-[10px] font-black uppercase tracking-widest">Legal Entity</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-main)] ml-7">{user?.displayName || 'Unset'}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <FiMail /> <span className="text-[10px] font-black uppercase tracking-widest">Communication Channel</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-main)] ml-7">{user?.email}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <FiCalendar /> <span className="text-[10px] font-black uppercase tracking-widest">Registration Timestamp</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-main)] ml-7">
                    {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              {dbUser?.status === 'suspended' && (
                <div className="glass-card p-8 border-2 border-rose-500/20 bg-rose-500/5">
                  <h3 className="font-black text-rose-500 uppercase tracking-widest mb-2">⚠️ Access Violation Detected</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Reason: {dbUser.suspendReason || 'Awaiting review'}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
