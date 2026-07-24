import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (user) {
        // return <Navigate to="/dashboard" replace />;
        return <Navigate to="/analyse" replace />;
    }

    return children;
};

export default PublicRoute;