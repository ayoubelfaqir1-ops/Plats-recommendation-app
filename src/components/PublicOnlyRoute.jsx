import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingFullPage from "./LoadingFullPage";

const PublicOnlyRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingFullPage />;

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default PublicOnlyRoute;
