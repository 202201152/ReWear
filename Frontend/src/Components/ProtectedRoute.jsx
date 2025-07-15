// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token exists, redirect to home/login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
