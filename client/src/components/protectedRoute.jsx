import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null; // or spinner

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
