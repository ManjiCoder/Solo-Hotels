import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdLogout, MdMenu } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import { setCart } from '../store/slices/CartSlice';
import { showAlertFn } from '../store/slices/AlertSlice';

const headersList = {
  'auth-token': localStorage.getItem('token'),
};
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
  const [view, setView] = useState('list');
  const [isOpen, setIsOpen] = useState(false);
  const showNav = () => {
    setIsOpen(true);
  };
  const [allUser, setAllUser] = useState([]);
  const fetchAllUser = async () => {
    let response;
    try {
      response = await fetch('http://localhost:3000/admin/users', {
        method: 'GET',
        headers: headersList,
      });

      const data = await response.json();
      console.log(data);
      setAllUser(data);
      dispatch(showToastFn(response.ok, data.msg || 'Users Loaded'));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

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

      <main className="flex flex-1 flex-col p-4">
        <div className="flex justify-between place-self-end border shadow-lg rounded-md font-semibold overflow-hidden">
          <button
            type="button"
            className={`px-5 py-3 border-r ${view === 'list' && 'bg-gradient-to-l from-[#df293a] to-[#d11450] text-white'}`}
            onClick={() => setView('list')}
          >
            List

          </button>
          <button
            type="button"
            className={`px-5 py-3 border-r ${view === 'card' && 'bg-gradient-to-l from-[#df293a] to-[#d11450] text-white'}`}
            onClick={() => setView('card')}
          >
            Card

          </button>
        </div>
        <div className="lg:mx-0 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Table users={allUser} />
        </div>
      </main>
    </div>
  );
}

export default Admin;

function Table({ users }) {
  <div className="max-w-6xl py-8 mx-auto lg:py-16 ">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in Solo Hotels including their name, email and role.
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    Name
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                        {person.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {person.email}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {person.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
