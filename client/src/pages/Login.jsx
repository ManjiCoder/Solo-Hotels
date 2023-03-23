/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { login } from '../store/slices/userSlice';
import { closeToast, showToast } from '../store/slices/ToastSlice';

// eslint-disable-next-line react/prop-types
function Login({ mainTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState('password');
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setType(isVisible === false ? 'password' : 'text');
  }, [isVisible]);

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      localStorage.setItem('token', data.authToken);
      localStorage.setItem('user', JSON.stringify(...data.user));
      dispatch(login(...data.user));
      navigate('/');
    }
    dispatch(showToast({ success: response.ok, msg: data.msg }));
    setTimeout(() => {
      dispatch(closeToast());
    }, 2000);
  };

  return (
    <div className="p-3 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl text-center font-semibold">
        Login to continue
        {' '}
        {mainTitle}
        {' '}
        - Hotels
      </h2>
      <form className="inline-flex items-center flex-col gap-5 text-center py-5 px-10" onSubmit={handleLogin}>
        {/* logo */}
        <div className="inline-flex p-3 rounded-md shadow-sm items-center space-x-3 justify-center border">
          <label htmlFor="username" className="text-red-400 cursor-pointer hover:text-red-500">
            <FaUserCircle />
          </label>
          <input type="email" className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none" id="username" name="email" placeholder="Enter your email" onChange={handleOnChange} value={user.name} required />
          <AiFillEye className="invisible text-xl" />
        </div>
        <div className="inline-flex p-3 rounded-md shadow-sm items-center space-x-3 justify-center border">
          <label htmlFor="userpassword" className="text-red-400 cursor-pointer hover:text-red-500">
            <FaLock />
          </label>
          <input type={type} className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none" id="userpassword" name="password" placeholder="Enter your password" onChange={handleOnChange} value={user.password} required minLength={5} />
          <button type="button" className="cursor-pointer text-red-400 text-xl hover:text-red-500" onClick={toggleEye}>
            {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>

        <button type="submit" className="bg-red-400 hover:bg-red-500 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-sm">Login</button>
      </form>
      <Alert />
    </div>
  );
}

export default Login;
