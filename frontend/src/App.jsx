import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import HomePage from "./pages/homepage";

// Define routes
const router = createBrowserRouter(
    [
        { path: "/", element: <LoginPage /> }, // Login route
        { path: "/home", element: <HomePage /> }, // Home route
    ],
    {
        future: {
            v7_startTransition: true, // Opt-in for startTransition wrapping
            v7_relativeSplatPath: true, // Opt-in for relative splat path behavior
        },
    }
);

const App = () => {
    console.log("Router Configuration:", router.routes); // Debugging: Log the router configuration

    return (
        <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>} // Show loading spinner while resolving routes
        />
    );
};

export default App;
