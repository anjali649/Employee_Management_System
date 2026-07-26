import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRole }) => {
  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Logged in but wrong role, redirect to appropriate dashboard
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  // All good, render the passed children via Outlet
  return <Outlet />;
};

export default ProtectedRoute;
