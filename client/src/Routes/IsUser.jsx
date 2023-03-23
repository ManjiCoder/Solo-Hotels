import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';

function IsUser() {
  const user = useSelector((state) => state.user);
  if (user) return <Home />;
  return <Outlet />;
}

export default IsUser;
