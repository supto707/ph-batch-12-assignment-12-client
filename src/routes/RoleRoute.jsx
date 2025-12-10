import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleRoute = ({ children, allowedRoles, requireApproved = false }) => {
  const { dbUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!dbUser || !allowedRoles.includes(dbUser.role)) {
    return <Navigate to="/" replace />;
  }

  if (dbUser.status === 'suspended') {
    return <Navigate to="/dashboard/profile" replace />;
  }

  if (requireApproved && dbUser.status !== 'approved') {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};

export default RoleRoute;
