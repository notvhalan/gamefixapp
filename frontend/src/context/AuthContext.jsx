import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in the user (e.g., through Google OAuth)
    const login = async () => {
        try {
            const response = await axios.get("http://localhost:3000/auth/google", { withCredentials: true });
            setUser(response.data.user); // Assume backend returns user data
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    
    const logout = async () => {
        try {
            await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/session", { withCredentials: true });
                setUser(response.data.user); // Assume backend returns user data if authenticated
            } catch {
                setUser(null); // Not authenticated
            }
        };
        checkSession();
    }, [])
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
