import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(); // Authenticate the user
        navigate("/home"); // Redirect to home page after successful login
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default LoginPage;
