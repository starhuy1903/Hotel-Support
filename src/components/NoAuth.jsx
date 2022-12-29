import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from '../features/auth/authSlice';

const NoAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
  
    return !token ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  };
export default NoAuth