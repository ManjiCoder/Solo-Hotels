/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import { signup } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import { showAlertFn } from '../store/slices/AlertSlice';

// eslint-disable-next-line react/prop-types
function Signup({ mainTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .required('*required')
      .min(3, 'Should be min of 3 characters')
      .max(16, 'Should be max of 16 characters'),
    email: Yup.string()
      .required('*required')
      .email('Enter valid email'),
    password: Yup.string()
      .required('*required')
      .min(5, 'Should be min of 5 characters')
      .max(30, 'Should be max of 30 characters'),
  });
  const handleSignup = async (name, email, password) => {
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/signup`, {
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
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };
  return (
    <div className="p-3 bg-slate-200 min-h-screen flex flex-col justify-center items-center">
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          // console.log(values);
          handleSignup(values.name, values.email, values.password);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          /* and other goodies */
        }) => (
          <form
            className="inline-flex border bg-slate-50 rounded-md shadow-lg items-center flex-col text-center py-5 px-10"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl text-center font-semibold mb-5">
              Signup to continue
              {' '}
              {mainTitle}
              {' '}
              - Hotels
            </h2>
            {/* Name */}
            <div className={`${errors.name ? 'mb-0' : 'mb-7'}`}>
              <div
                className={`inline-flex bg-white p-3 rounded-md shadow-md items-center space-x-3 justify-center border ring-2 ${errors.name ? 'ring-red-400' : 'ring-transparent'}`}
              >
                <label htmlFor="username" className="text-red-400 cursor-pointer hover:text-red-500">
                  <FaUser />
                </label>
                <input
                  type="text"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="username"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h3
                className="text-right px-3 text-red-400 my-1 font-semibold"
              >
                {errors.name}
              </h3>
            </div>

            {/* Email */}
            <div className={`${errors.email ? 'mb-0' : 'mb-7'}`}>
              <div className={`inline-flex bg-white p-3 rounded-md shadow-md items-center space-x-3 justify-center border ring-2 ${errors.email ? 'ring-red-400' : 'ring-transparent'}`}>
                <label htmlFor="email" className="text-red-400 cursor-pointer hover:text-red-500">
                  <MdOutlineEmail className="text-xl" />
                </label>
                <input
                  type="email"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h3
                className="text-right px-3 text-red-400 my-1 font-semibold"
              >
                {errors.email}
              </h3>
            </div>

            {/* Password */}
            <div className={`${errors.password ? 'mb-0' : 'mb-7'}`}>
              <div className={`inline-flex bg-white  p-3 rounded-md shadow-md items-center space-x-3 justify-center border ring-2 ${errors.password ? 'ring-red-400' : 'ring-transparent'}`}>
                <label htmlFor="userpassword" className="text-red-400 cursor-pointer hover:text-red-500">
                  <FaLock />
                </label>
                <input
                  type={isVisible === false ? 'password' : 'text'}
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="userpassword"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button type="button" className="cursor-pointer text-red-400 text-xl hover:text-red-500" onClick={toggleEye}>
                  {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
              <h3
                className="text-right px-3 text-red-400 my-1 font-semibold"
              >
                {errors.password}
              </h3>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="bg-red-400 hover:bg-red-500 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Signup

            </button>
          </form>
        )}
      </Formik>

      <Alert />
    </div>
  );
}

export default Signup;
