import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdLogout, MdMenu } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import { setCart } from '../store/slices/CartSlice';

const navListItem = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdDashboard />,
  },
  {
    name: 'User',
    href: '#',
    icon: <FaUsers />,
  },
  {
    name: 'Order',
    href: '#',
    icon: <FaUsers />,
  },
  {
    name: 'Logout',
    icon: <MdLogout />,
    href: '/login',
  },
];
function Admin() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const showNav = () => {
    setIsOpen(true);
  };
  const handleSignout = () => {
    dispatch(logout());
    dispatch(showToastFn(true, 'logout successfully'));
    dispatch(setCart({ orderCount: 0 }));
  };
  return (
    <div className="flex min-h-screen">
      <nav className={`${!isOpen ? 'w-12' : 'w-40'} transition-all ease-in-out duration-300 border py-4 overflow-hidden`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl px-3"
        >
          {isOpen ? <RxCross1 /> : <MdMenu />}
        </button>
        <div className="flex flex-col items-center px-3 space-y-3">
          <button
            type="button"
            className="flex justify-center items-center h-9 w-9 font-bold text-xl rounded-full ring-0 focus:ring-2 focus:ring-red-600 bg-slate-50 border shadow-md"
          >
            {user.name.charAt(0)}
          </button>
          {isOpen && (
            <>
              <h2 className="font-medium capitalize place-self-start">{user.name}</h2>
              <h3 className="font-medium capitalize text-sm place-self-start">{user.role}</h3>
            </>
          )}
        </div>
        <ul className="space-y-2 my-3">
          {navListItem.map(({ name, href, icon }) => (
            <li key={name}>
              {href === '/login' ? (
                <Link
                  className="inline-flex space-x-3.5 py-2 px-3 w-40 items-center hover:text-white hover:bg-gradient-to-l from-[#df293a] to-[#d11450]"
                  to={href}
                  onClick={handleSignout}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{name}</span>
                </Link>
              ) : (
                <Link
                  className="inline-flex space-x-3.5 py-2 px-3 w-40 items-center hover:text-white hover:bg-gradient-to-l from-[#df293a] to-[#d11450]"
                  to={href}
                  onClick={showNav}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <div className="lg:mx-0 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          jfdl
        </div>
      </main>
    </div>
  );
}

export default Admin;
