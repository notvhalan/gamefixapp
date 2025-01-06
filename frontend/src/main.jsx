import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/loginpage";
import HomePage from "./pages/homepage";
import LandingPage from "./pages/landingpage";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Protected route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
);
