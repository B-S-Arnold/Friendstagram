import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';


const ProtectedRoute = ({ user, children }) => {

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};



export default ProtectedRoute;
