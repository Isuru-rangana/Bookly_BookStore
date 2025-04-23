import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // User's role is not authorized, redirect to home page
    return <Navigate to="/" />;
  }

  // Authorized, render component
  return children;
};

export default ProtectedRoute; 