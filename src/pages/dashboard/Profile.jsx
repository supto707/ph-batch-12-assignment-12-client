import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, dbUser, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handlePhotoUpdate = async () => {
    if (!photoURL.trim()) {
      toast.error('Please enter a valid photo URL');
      return;
    }

    try {
      setLoading(true);
      
      // Update Firebase profile
      await updateUserProfile(user?.displayName, photoURL);
      
      // Update database
      if (dbUser?._id) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${dbUser._id}`,
          { photoURL },
          { withCredentials: true }
        );
      }
      
      toast.success('Profile photo updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating photo:', error);
      toast.error('Failed to update profile photo');
    } finally {
      setLoading(false);
    }
  };

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
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
            <img 
              src={photoURL || user?.photoURL || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23ddd" width="150" height="150"/%3E%3Ctext x="50%" y="50%" font-size="12" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Photo%3C/text%3E%3C/svg%3E'} 
              alt={user?.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.displayName || 'User'}</h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-sm btn-outline"
            >
              {isEditing ? 'Cancel' : 'Change Photo'}
            </button>
          </div>
        </div>

        {/* Photo Update Form */}
        {isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
            <div className="flex gap-2">
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered flex-1"
              />
              <button
                onClick={handlePhotoUpdate}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Enter a direct image URL (e.g., from Imgur, Unsplash, or your image hosting service)</p>
          </div>
        )}

        <div className="border-t border-gray-200 my-6"></div>

        {/* User Information */}
        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-700 mb-2">Email</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Role</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
              {dbUser?.role || 'User'}
            </span>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Account Status</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              dbUser?.status === 'approved' ? 'bg-green-100 text-green-800' :
              dbUser?.status === 'suspended' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            } capitalize`}>
              {dbUser?.status || 'Pending'}
            </span>
          </div>

          {dbUser?.status === 'suspended' && dbUser?.suspendReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">⚠️ Account Suspended</h3>
              <p className="text-sm text-red-700">{dbUser.suspendReason}</p>
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-700 mb-2">Member Since</p>
            <p className="text-gray-600">
              {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Recently joined'}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button 
            onClick={handleLogout} 
            className="btn btn-error"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
