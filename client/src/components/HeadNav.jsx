/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsBuildings } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import { MdAdminPanelSettings, MdOutlineShoppingBag } from 'react-icons/md';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import Search from './Search';
import { setCart } from '../store/slices/CartSlice';

function HeadNav(props) {
  // eslint-disable-next-line react/prop-types
  const { mainTitle } = props;
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navArr = Object.freeze([
    {
      name: 'Home',
      icon: <AiOutlineHome />,
      href: '/',
    },
    {
      name: 'About',
      icon: <AiOutlineQuestionCircle />,
      href: '/about',
    },
    {
      name: 'Booking',
      icon: <MdOutlineShoppingBag />,
      href: '/booking',
    },
    {
      name: 'Hotels',
      icon: <BsBuildings />,
      href: '/hotels',
    },

  ]);
  const toggleUserInfo = () => {
    setIsOpen(!isOpen);
  };
  const handleSignout = () => {
    dispatch(logout());
    dispatch(showToastFn(true, 'logout successfully'));
    dispatch(setCart({ orderCount: 0 }));
  };
  return (
    <header className="sticky top-0 grid grid-cols-[0.5fr,2fr,1fr] boder border-b-2 bg-slate-50 z-20 border-gray-300 shadow-md items-center px-4">
      {/* Brand Name */}
      <div className="text-2xl text-center font-bold  text-red-600">
        <Link to="/">{mainTitle}</Link>
      </div>

      <ul className={`flex justify-start space-x-7 items-center ${pathname === '/hotels' && 'hidden'}`}>
        {navArr.map(({ name, icon, href }) => (
          <li className="" key={name}>
            <NavLink className={`flex items-center hover:bg-slate-200 p-3 ${pathname === href ? 'bg-slate-200' : ''}`} to={href}>
              <span className="text-2xl mr-3">{icon}</span>
              {name}
            </NavLink>
          </li>
        ))}
        {user !== null && user.role === 'admin' && (
          <li className="">
            <NavLink className={`flex items-center hover:bg-slate-200 p-3 ${pathname === '/dashboard' ? 'bg-slate-200' : ''}`} to="/dashboard">
              <span className="text-2xl mr-3"><MdAdminPanelSettings /></span>
              Admin
            </NavLink>
          </li>
        )}
      </ul>

      {/* Show Search only if user visit /hotels page */}
      <ul className={`${pathname === '/hotels' ? 'flex items-center h-12 scale-[0.7]  transition-all ease-in-out duration-1000' : 'hidden'}`}>
        <Search />
      </ul>

      {/* Actions */}
      <div className="flex justify-center items-center place-self-end self-center space-x-3 md:-ml-5">
        {/* Login / Signup */}
        {!user && (
          <div className="flex place-items-center space-x-4">
            <Link className={`flex items-center hover:bg-slate-200 p-3 ${pathname === '/login' ? 'bg-slate-200' : ''}`} to="/login">
              Login
            </Link>
            <Link className={`flex items-center hover:bg-slate-200 p-3 ${pathname === '/signup' ? 'bg-slate-200' : ''}`} to="/signup">
              signup
            </Link>
          </div>

        )}
        {/* Call To Action */}
        <Link to="tel:+917517329166" className="text-2xl text-gray-500 cursor-pointer hover:scale-110">
          <FiPhoneCall className="text-red-600" />
        </Link>

        {/* UserInfo */}
        {user && (
          <div className="flex flex-col relative">
            <button
              type="button"
              className="h-9 w-9 font-bold text-xl rounded-full ring-0 focus:ring-2 focus:ring-slate-500 bg-slate-200"
              onClick={toggleUserInfo}
            >
              {user.name.charAt(0)}
            </button>

            {/*  Show UserInfo */}
            {isOpen && (
              <div className="absolute p-3 z-10 rounded-md bg-white shadow-md top-11 -left-20 h-36 w-44 ">
                <ul className="flex flex-col gap-3 text-gray-700">
                  <li className="text-sm font-semibold">{user.name}</li>
                  <li className="text-sm overflow-hidden">{user.email}</li>
                  <li className="text-sm hover:font-semibold">
                    <NavLink to="/account">Setting</NavLink>
                  </li>
                  <li className="text-sm hover:font-semibold">
                    <NavLink to="/login" onClick={handleSignout}>Signout</NavLink>
                  </li>
                </ul>

              </div>
            )}
          </div>
        )}

        {/* Cart */}
        <Link
          className="relative rounded-full h-9 w-9 shadow-md flex flex-col justify-center items-center p-1 border"
          to="/cart"
        >

          <AiOutlineShoppingCart className="text-2xl mr-0.5" />
          <span className="absolute text-center right-0 top-0 h-4 w-4 text-xs bg-red-500 rounded-full shadow-md text-white">
            {userCart !== undefined && userCart.orderCount ? userCart.orderCount : 0 }
          </span>
        </Link>
      </div>
    </header>
  );
}

export default HeadNav;

HeadNav.prototype = {
  mainTitle: PropTypes.string,
};
