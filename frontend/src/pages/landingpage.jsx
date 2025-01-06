import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to Our App!</h1>
            <p>Discover amazing features and connect with others.</p>
            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
