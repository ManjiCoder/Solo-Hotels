/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { signup } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';

// eslint-disable-next-line react/prop-types
function Signup({ mainTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState('password');
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = user;

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
  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      localStorage.setItem('token', data.authToken);
      localStorage.setItem('user', JSON.stringify(...data.user));
      dispatch(signup(...data.user));
      navigate('/');
    }
    dispatch(showToastFn(response.ok, data.msg));
  };
  return (
    <div className="p-3 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl text-center font-semibold">
        Signup to continue
        {' '}
        {mainTitle}
        {' '}
        - Hotels
      </h2>
      <form className="inline-flex items-center flex-col gap-5 text-center py-5 px-10" onSubmit={handleSignup}>

        {/* Name */}
        <div className="inline-flex p-3 rounded-md shadow-sm items-center space-x-3 justify-center border">
          <label htmlFor="username" className="text-red-400 cursor-pointer hover:text-red-500">
            <FaUser />
          </label>
          <input type="text" className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none" id="username" name="name" placeholder="Enter your name" onChange={handleOnChange} value={user.name} required minLength={2} />
          <AiFillEye className="invisible text-xl" />
        </div>

        {/* Email */}
        <div className="inline-flex p-3 rounded-md shadow-sm items-center space-x-3 justify-center border">
          <label htmlFor="email" className="text-red-400 cursor-pointer hover:text-red-500">
            <MdOutlineEmail className="text-xl" />
          </label>
          <input type="email" className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none" id="email" name="email" placeholder="Enter your email" onChange={handleOnChange} value={user.email} required />
          <AiFillEye className="invisible text-xl" />
        </div>

        {/* Password */}
        <div className="inline-flex p-3 rounded-md shadow-sm items-center space-x-3 justify-center border">
          <label htmlFor="userpassword" className="text-red-400 cursor-pointer hover:text-red-500">
            <FaLock />
          </label>
          <input type={type} className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none" id="userpassword" name="password" placeholder="Enter your password" onChange={handleOnChange} value={user.password} required minLength={5} />
          <button type="button" className="cursor-pointer text-red-400 text-xl hover:text-red-500" onClick={toggleEye}>
            {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>

        <button type="submit" className="bg-red-400 hover:bg-red-500 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-sm">Signup</button>
      </form>
      <Alert />
    </div>
  );
}

export default Signup;
