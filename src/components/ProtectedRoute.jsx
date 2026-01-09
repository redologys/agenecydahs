import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';

const ProtectedRoute = ({ role }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#05070a] text-primary">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && (!profile || profile?.role !== role)) {
    // If we have a user but no profile, and we are on an admin route,
    // we should wait or show an error rather than redirecting to "/" (loop)
    if (!profile) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#05070a] text-white p-6 text-center">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-text-secondary max-w-sm">We couldn't find your user profile. Please try logging in again or contact support.</p>
          <button onClick={() => window.location.href='/login'} className="btn btn-primary mt-6">Back to Login</button>
        </div>
      );
    }

    if (profile?.role === 'client') return <Navigate to="/client-portal" replace />;
    if (profile?.role === 'admin') return <Outlet />; 
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
