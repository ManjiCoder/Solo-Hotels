/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import { login } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import { showAlertFn } from '../store/slices/AlertSlice';
import { getCartItemFn } from '../store/slices/CartSlice';

// eslint-disable-next-line react/prop-types
function Login({ mainTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSchema = Yup.object().shape({
    email: Yup.string().required('*required').email('Enter valid email'),
    password: Yup.string()
      .required('*required')
      .min(5, 'Should be min of 5 characters')
      .max(30, 'Should be max of 30 characters'),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };
  // const handleOnChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };
  const handleLogin = async (email, password) => {
    let response;

    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/login`, {
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
        await dispatch(getCartItemFn());
        navigate(-1);
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
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // console.log(values);
          handleLogin(values.email, values.password);
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
          <form className="inline-flex bg-slate-50 border rounded-md shadow-lg items-center  flex-col text-center py-5 px-10" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-5 text-center font-semibold">
              Login to continue
              {' '}
              {mainTitle}
              {' '}
              - Hotels
            </h2>
            {/* logo */}

            <div className={`${errors.email ? 'mb-0' : 'mb-7'}`}>
              <div
                className={`inline-flex bg-white p-3 ring-2 ${errors.email ? 'ring-red-400' : 'ring-transparent'}  rounded-md shadow-lg items-center space-x-3 justify-center border`}
              >
                <label htmlFor="username" className="text-red-400 cursor-pointer hover:text-red-500">
                  <FaUserCircle />
                </label>
                <input
                  type="email"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="username"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h2 className="text-right px-3 text-red-400 my-1 font-semibold">{errors.email}</h2>

            </div>

            <div className={`${errors.password ? 'mb-0' : 'mb-7'}`}>
              <div className={`inline-flex bg-white p-3 ring-2 ${errors.password ? 'ring-red-400' : 'ring-transparent'}  rounded-md shadow-lg items-center space-x-3 justify-center border`}>
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
              Login

            </button>
          </form>
        )}
      </Formik>

      <Alert />
    </div>
  );
}

export default Login;
