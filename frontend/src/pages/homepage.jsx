import React from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Your email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
