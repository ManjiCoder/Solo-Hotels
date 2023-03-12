import React from 'react';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { MdManageAccounts, MdOutlineShoppingBag } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();

  // Read-Only Like Enums in TypeScript
  const footerList = Object.freeze([
    {
      name: 'Home',
      icon: <AiOutlineHome />,
      href: '/',
    },
    {
      name: 'Saved',
      icon: <AiOutlineHeart />,
      href: '/saved',
    },
    {
      name: 'Booking',
      icon: <MdOutlineShoppingBag />,
      href: '/booking',
    },
    {
      name: 'Account',
      icon: <MdManageAccounts />,
      href: '/account',
    },
  ]);
  return (
  //   For Moblie view
    <footer className="">
      <div className="fixed bottom-0 border border-y-gray-500 box-border bg-white w-full  py-2 text-gray-600">
        <ol className="flex justify-around">
          {footerList.map((item) => (
            <li key={item.name}>
              <NavLink className={`flex place-items-center flex-col ${location.pathname === item.href && 'text-red-600'} `} to={item.href}>
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
    </footer>
  );
}

export default BottomNav;
