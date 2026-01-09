import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

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

  if (role && profile?.role !== role) {
    // Redirect based on role if mismtach
    // If trying to access admin but is client -> go to client portal
    if (profile?.role === 'client') return <Navigate to="/client-portal" replace />;
    // If trying to access client but is admin -> allow (admins can see all) OR redirect to admin dashboard
    if (profile?.role === 'admin') return <Outlet />; 
    
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
