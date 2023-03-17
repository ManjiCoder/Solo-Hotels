import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginAlert from '../components/LoginAlert';
import { login, logout } from '../store/slices/userSlice';

function Account() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login(JSON.parse(localStorage.getItem('user'))));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      {!user
        ? <LoginAlert />
        : (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        )}
    </div>
  );
}

export default Account;
