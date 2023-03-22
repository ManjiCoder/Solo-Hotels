/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';

function HeadNav(props) {
  // eslint-disable-next-line react/prop-types
  const { mainTitle } = props;
  const user = useSelector((state) => state.user);
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
      icon: <AiOutlineHeart />,
      href: '/about',
    },
    {
      name: 'Booking',
      icon: <MdOutlineShoppingBag />,
      href: '/booking',
    },

  ]);
  const toggleUserInfo = () => {
    setIsOpen(!isOpen);
  };
  const handleSignout = () => {
    dispatch(logout());
  };
  return (
    <header className="grid grid-cols-[0.5fr,2fr,1fr] boder border-b-2 border-gray-400  items-center px-4">
      {/* Brand Name */}
      <div className="text-2xl text-center font-bold  text-red-600">
        <Link to="/">{mainTitle}</Link>
      </div>
      <ul className="flex justify-start space-x-7 items-center">
        {navArr.map(({ name, icon, href }) => (
          <li className="" key={name}>
            <NavLink className="flex items-center hover:bg-slate-200 p-3" to={href}>
              <span className="text-2xl mr-3">{icon}</span>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex justify-center items-center place-self-end self-center space-x-4">
        {/* Call To Action */}
        <Link to="tel:+917517329166" className="text-2xl text-gray-500 cursor-pointer hover:scale-110">
          <FiPhoneCall className="text-red-600" />
        </Link>

        {/* UserInfo */}
        {user && (
          <div className="flex flex-col relative">
            <button
              type="button"
              className="h-9 w-9 rounded-full ring-0 focus:ring-2 focus:ring-slate-500 bg-slate-200"
              onClick={toggleUserInfo}
            />

            {/*  Show UserInfo */}
            {isOpen && (
            <div className="absolute p-3 z-10 rounded-md bg-white shadow-md top-11 -left-20 h-36 w-40 ">
              <ul className="flex flex-col gap-3 text-gray-700">
                <li className="text-sm font-semibold">{user.name}</li>
                <li className="text-sm ">{user.email}</li>
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
        <button type="button">
          <AiOutlineShoppingCart className="text-3xl" />
        </button>
      </div>
    </header>
  );
}

export default HeadNav;

HeadNav.prototype = {
  mainTitle: PropTypes.string,
};
