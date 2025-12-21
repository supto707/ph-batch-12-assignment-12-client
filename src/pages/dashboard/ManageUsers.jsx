import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Pagination from '../../components/Pagination';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        params: { search },
        withCredentials: true
      });
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, 
        { status },
        { withCredentials: true }
      );
      toast.success('User status updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSuspend = async () => {
    if (!suspendReason.trim()) {
      toast.error('Please provide a reason for suspension');
      return;
    }

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`, 
        { status: 'suspended', suspendReason },
        { withCredentials: true }
      );
      toast.success('User suspended');
      setSelectedUser(null);
      setSuspendReason('');
      fetchUsers();
      document.getElementById('suspend_modal').close();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md bg-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className='text-black'>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={user.photoURL || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23ddd" width="150" height="150"/%3E%3Ctext x="50%" y="50%" font-size="12" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Photo%3C/text%3E%3C/svg%3E'} alt={user.name} />
                      </div>
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td><span className="badge badge-primary">{user.role}</span></td>
                <td>
                  <span className={`badge ${
                    user.status === 'approved' ? 'badge-success' : 
                    user.status === 'suspended' ? 'badge-error' : 
                    'badge-warning'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {user.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(user._id, 'approved')}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 active:bg-green-700 transition font-medium"
                      >
                        Approve
                      </button>
                    )}
                    {user.status === 'approved' && (
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          document.getElementById('suspend_modal').showModal();
                        }}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 active:bg-red-700 transition font-medium"
                      >
                        Suspend
                      </button>
                    )}
                    {user.status === 'suspended' && (
                      <button 
                        onClick={() => handleStatusUpdate(user._id, 'approved')}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 active:bg-green-700 transition font-medium"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <dialog id="suspend_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Suspend User</h3>
          <p className="mb-4">Please provide a reason for suspending {selectedUser?.name}:</p>
          <textarea
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Reason for suspension..."
            rows="4"
          />
          <div className="modal-action">
            <button onClick={handleSuspend} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700 transition font-medium text-sm">Suspend</button>
            <button onClick={() => document.getElementById('suspend_modal').close()} className="px-4 py-2 border-2 border-green-500 text-green-600 rounded hover:bg-green-50 active:bg-green-100 transition font-medium text-sm">Cancel</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
