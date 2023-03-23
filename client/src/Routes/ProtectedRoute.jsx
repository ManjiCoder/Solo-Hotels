import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoginAlert from '../components/LoginAlert';

function ProtectedRoute() {
  const user = useSelector((state) => state.user);

  // If user not found
  if (!user) {
    return <LoginAlert />;
  }
  //   return child Element
  return (
    <Outlet />
  );
}

export default ProtectedRoute;
