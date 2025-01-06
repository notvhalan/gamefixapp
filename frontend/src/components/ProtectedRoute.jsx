import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!user) {
                try {
                    const response = await axios.get("http://localhost:3000/auth/session");
                    setUser(response.data.user); // Populate user data
                } catch {
                    setUser(null); // Not authenticated
                }
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [user, setUser]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while checking authentication
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
