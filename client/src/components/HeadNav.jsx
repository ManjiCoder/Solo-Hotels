/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiPhoneCall } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsBuildings } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import {
  MdAdminPanelSettings, MdOutlineShoppingBag, MdEmail, MdSettings, MdLogout,
} from 'react-icons/md';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Transition } from '@headlessui/react';
import { logout } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import Search from './Search';
import { setCart } from '../store/slices/CartSlice';

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

function HeadNav(props) {
  // eslint-disable-next-line react/prop-types
  const { mainTitle } = props;
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.cart);

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
        {user && <UserInfo user={user} />}

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

function UserInfo({ user }) {
  const userArr = Object.freeze([
    {
      name: user.name,
      icon: <FaUser />,
      href: '#',
      isFuntion: false,
    },
    {
      name: user.email.length > 16 ? `${user.email.slice(0, 15)}...` : user.email,
      icon: <MdEmail />,
      href: '#',
      isFuntion: false,
    },
    {
      name: 'Setting',
      icon: <MdSettings />,
      href: '/account',
      isFuntion: false,
    },
    {
      name: 'Logout',
      icon: <MdLogout />,
      href: '/login',
      isFuntion: true,
    },
  ]);
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(logout());
    dispatch(showToastFn(true, 'logout successfully'));
    dispatch(setCart({ orderCount: 0 }));
  };
  return (
    <div className="relative w-9">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-full text-base font-medium hover:text-opacity-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-opacity-75 justify-center`}
            >
              <span
                className="flex justify-center items-center h-9 w-9 font-bold text-xl rounded-full ring-0 focus:ring-2 focus:ring-slate-500 bg-slate-50 border shadow-md"
              >
                {user.name.charAt(0)}
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 top-14 max-w-xs transform -left-24 px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg">

                  {/*  Show UserInfo */}
                  <div className="py-3 z-10 rounded-md bg-white shadow-md -left-12 h-52 w-44 border">
                    <ul className="flex flex-col gap-3 text-gray-700 ">
                      {userArr.map(({
                        name, href, icon, isFuntion,
                      }) => (
                        <li
                          className="font-medium hover:text-white hover:bg-gradient-to-l from-[#df293a] to-[#d11450] text-sm flex items-center space-x-2 p-2"
                          key={name}
                        >
                          {icon}
                          {isFuntion ? (
                            <Link to={href} onClick={handleSignout}>
                              {name}
                            </Link>
                          ) : (
                            <Link to={href}>
                              {name}
                            </Link>
                          )}
                        </li>
                      ))}

                    </ul>

                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
