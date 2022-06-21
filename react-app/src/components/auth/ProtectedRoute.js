import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';


const ProtectedRoute = ({user, children}) => {
  // const user = useSelector(state => state.session.user)
    if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
 


export default ProtectedRoute;
