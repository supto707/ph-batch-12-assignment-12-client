import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiCheckCircle, FiSlash, FiShieldOff } from 'react-icons/fi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        params: { search },
        withCredentials: true
      });
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`,
        { status },
        { withCredentials: true }
      );
      toast.success(`User successfully ${status}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSuspend = async () => {
    if (!suspendReason.trim()) {
      toast.error('Reason required for suspension protocols');
      return;
    }

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`,
        { status: 'suspended', suspendReason },
        { withCredentials: true }
      );
      toast.success('User access revoked');
      setSelectedUser(null);
      setSuspendReason('');
      fetchUsers();
      document.getElementById('suspend_modal').close();
    } catch (error) {
      toast.error('revocation protocol failed');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-3">
            <FiUsers className="text-[var(--primary)]" /> Global Workforce
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm mt-1 uppercase tracking-widest">Administrative Registry Management</p>
        </div>

        <div className="relative group w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="text"
            placeholder="Search credentials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="modern-input !pl-12 !py-3 shadow-sm bg-[var(--bg-card)]"
          />
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Entity / Identity</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Access Point</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Classification</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Sync Status</th>
                <th className="p-6 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Protocols</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <span className="loading loading-spinner text-[var(--primary)] loading-lg"></span>
                  </td>
                </tr>
              ) : (
                <>
                  {users.length > 0 ? (
                    users.map((user, idx) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-[var(--primary)]/5 transition-colors group"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[var(--primary)]/20 ring-offset-2 ring-offset-[var(--bg-card)]">
                              <img src={user.photoURL || 'https://i.pravatar.cc/100'} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-black text-[var(--text-main)]">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-[var(--text-secondary)]">{user.email}</td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                              user.status === 'suspended' ? 'bg-red-500/10 text-red-500' :
                                'bg-amber-500/10 text-amber-500'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'approved' ? 'bg-emerald-500 animate-pulse' :
                                user.status === 'suspended' ? 'bg-red-500' :
                                  'bg-amber-500'
                              }`}></div>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex gap-2">
                            {user.status === 'pending' && (
                              <button
                                onClick={() => handleStatusUpdate(user._id, 'approved')}
                                className="p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                title="Approve Identity"
                              >
                                <FiCheckCircle />
                              </button>
                            )}
                            {user.status === 'approved' && (
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  document.getElementById('suspend_modal').showModal();
                                }}
                                className="p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                title="Revoke Access"
                              >
                                <FiSlash />
                              </button>
                            )}
                            {user.status === 'suspended' && (
                              <button
                                onClick={() => handleStatusUpdate(user._id, 'approved')}
                                className="p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                title="Restore Access"
                              >
                                <FiCheckCircle />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-20 text-center">
                        <FiShieldOff className="mx-auto text-4xl text-[var(--text-muted)] mb-4" />
                        <p className="text-[var(--text-secondary)] font-bold italic">No identities found in current registry.</p>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="suspend_modal" className="modal backdrop-blur-md">
        <div className="modal-box bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-10 max-w-lg shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center text-2xl">
              <FiSlash />
            </div>
            <div>
              <h3 className="font-black text-2xl text-[var(--text-main)] tracking-tight">Revoke Access</h3>
              <p className="text-[var(--text-muted)] font-bold text-xs uppercase tracking-widest">Protocol Override for {selectedUser?.name}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Reason for Suspension</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="modern-input !h-32 resize-none"
                placeholder="Document violation details..."
              />
            </div>
          </div>

          <div className="modal-action flex gap-4 mt-10">
            <button onClick={handleSuspend} className="flex-1 btn-gradient !bg-red-500 hover:!bg-red-600 !py-4 font-black">Revoke Access</button>
            <button onClick={() => document.getElementById('suspend_modal').close()} className="flex-1 btn-outline-clean !py-4 font-black">Abort Process</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
