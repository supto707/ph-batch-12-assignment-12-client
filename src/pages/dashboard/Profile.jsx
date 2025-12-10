import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, dbUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Profile</h1>

      <div className="clean-card max-w-2xl p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={user?.photoURL || 'https://via.placeholder.com/150'} 
              alt={user?.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-700 mb-2">Role</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {dbUser?.role}
            </span>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Account Status</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              dbUser?.status === 'approved' ? 'bg-green-100 text-green-800' :
              dbUser?.status === 'suspended' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {dbUser?.status}
            </span>
          </div>

          {dbUser?.status === 'suspended' && dbUser?.suspendReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">Account Suspended</h3>
              <p className="text-sm text-red-700">{dbUser.suspendReason}</p>
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-700 mb-2">Member Since</p>
            <p className="text-gray-600">{new Date(dbUser?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button 
            onClick={handleLogout} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
