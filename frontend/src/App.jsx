import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import existing components
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";// Importing the CollegePrediction component

// Set up routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

// Main App Component
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
