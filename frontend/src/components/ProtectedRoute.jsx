import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            toast.error("Please login first to access this page");
        }
    }, [user, loading]);

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/users/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
