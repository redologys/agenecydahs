import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertCircle, LogOut } from 'lucide-react';

const ProtectedRoute = ({ role }) => {
  const { user, profile, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#05070a] text-primary">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  // 1. Not logged in -> go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but profile fetch failed or is missing role
  if (!profile || !profile.role) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#05070a] text-white p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Account Configuration Error</h2>
        <p className="text-text-secondary max-w-sm mb-6">
          We found your account but could not load your role profile. 
          This usually happens if the database profile wasn't created correctly.
        </p>
        <div className="flex gap-4">
          <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
          <button onClick={() => logout()} className="btn btn-outline border-white/10 flex items-center gap-2">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  // 3. Role Mismatch
  if (role && profile.role !== role) {
    // If admin is on a client route, allow it (admins see everything)
    if (profile.role === 'admin') return <Outlet />;
    
    // If client is on an admin route, redirect to client portal
    if (profile.role === 'client') return <Navigate to="/client-portal" replace />;
    
    // Fallback for unknown roles
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
