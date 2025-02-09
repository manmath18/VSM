import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import existing components
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Profile from "./components/auth/Profile";
import Update from "./components/auth/Update"
import Jobportal from "./components/JobPortal"
import PostJob from "./components/PostJob"
import Dir from "./components/Directory"
// Importing the CollegePrediction component

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
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path:"/jobs",
    element:<Jobportal/>
  },
  {
    path:"/jobPost",
    element:<PostJob/>
  },
  {
    path:"/Dir",
    element:<Dir/>
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
