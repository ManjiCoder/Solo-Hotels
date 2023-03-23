import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoginAlert from '../components/LoginAlert';

function IsAdmin() {
  const user = useSelector((state) => state.user);
  if (user.role === 'admin') return <Outlet />;
  return (
    <LoginAlert />
  );
}

export default IsAdmin;
