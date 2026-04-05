import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import LoadingFullPage from "./LoadingFullPage";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingFullPage />;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;