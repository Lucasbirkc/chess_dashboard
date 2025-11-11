import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    // Used for only showing non-logged in users a page
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
            <div>Loading...</div>
            </div>
        );
    }

    if (user) {
        // Redirect if logged in
        return <Navigate to="/dashboard" replace />;
    }

    // Not logged in, show page
    return <>{children}</>;
};

export default PublicRoute;