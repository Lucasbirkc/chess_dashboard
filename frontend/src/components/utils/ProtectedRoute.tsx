import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // Only show logged in user the page
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
            <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login
        return <Navigate to="/login" replace />;
    }

    // Show page if logged in
    return <>{children}</>;
};

export default ProtectedRoute;