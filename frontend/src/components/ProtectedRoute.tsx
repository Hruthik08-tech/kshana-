import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-cloud-white">Loading...</div>; // Could be replaced with a spinner
  }

  // If completely authenticated, render the valid routes, otherwise redirect to sign-in
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center bg-cloud-white">Loading...</div>; // Could be replaced with a spinner
    }
  
    // If authenticated, prevent access to public routes (like login/signup) and redirect to app
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
