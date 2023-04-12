/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  MdBorderAll, MdDashboard, MdLogout, MdMenu,
} from 'react-icons/md';
import { FaUserEdit, FaUsers, FaUserSlash } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { GoListUnordered } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
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
  // const closeNav = () => {
  //   setIsOpen(false);
  // };
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
            className={`transition-all w-20 flex items-center justify-around px-2 py-3 border-r ${view === 'list' && 'bg-gradient-to-l from-[#df293a] to-[#d11450] text-white'}`}
            onClick={() => setView('list')}
          >
            <GoListUnordered />
            <span>List</span>

          </button>
          <button
            type="button"
            className={`transition-all w-20 flex items-center justify-around px-2 py-3 border-r ${view === 'card' && 'bg-gradient-to-l from-[#df293a] to-[#d11450] text-white'}`}
            onClick={() => setView('card')}
          >
            <MdBorderAll className="text-xl" />
            <span>Card</span>

          </button>
        </div>

        <div className="w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in Solo Hotels including their name, email and role.
                </p>
              </div>
            </div>
            {view === 'list' ? (
              <UserTable
                users={allUser}
                fetchAllUser={fetchAllUser}
              />
            ) : <UserCard users={allUser} />}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Admin;

function UserTable({ users, fetchAllUser }) {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const handleDeleteUser = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}admin/users/delete/${id}`, {
      method: 'DELETE',
      headers: headersList,
    });

    const data = await response.json();
    console.log(data);
    fetchAllUser();
  };
  const handleEditUser = async (id, user) => {
    setShowModal(true);
    console.log(id, user);
    setEditUser(user);
  };

  return (
    <div className="flex flex-col mt-8 shadow-lg border rounded-md">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className="">
                  <td className="font-semibold text-base py-4 pl-4 pr-3 text-gray-900 whitespace-nowrap sm:pl-6">Name</td>
                  <td className="font-semibold text-base px-3 py-4 text-gray-900 whitespace-nowrap">Email</td>
                  <td className="font-semibold text-base px-3 py-4 text-gray-900 whitespace-nowrap">Last Login</td>
                  <td className="font-semibold text-base px-3 py-4 text-gray-900 whitespace-nowrap">Role</td>
                </tr>

              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((person) => (
                  <tr key={person.email}>
                    <td className="capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-700 whitespace-nowrap sm:pl-6">
                      {person.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-blue-700 font-medium whitespace-nowrap">
                      {person.email}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                      {`${new Date(person.date).toDateString()}, ${new Date(person.date).toLocaleTimeString()}`}
                    </td>
                    <td className="flex items-center capitalize px-3 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                      {person.role}
                      <div className="ml-2 space-x-2 text-xl relative bg-slate-50 z-10">
                        <button
                          className="text-blue-600"
                          type="button"
                          onClick={() => handleEditUser(person._id, person)}
                        >
                          <FaUserEdit />
                          {showModal && <EditUserModal user={editUser} closeModal={() => setShowModal(false)} />}

                        </button>
                        <button
                          className="text-red-600"
                          type="button"
                          onClick={() => handleDeleteUser(person._id)}
                        >
                          <FaUserSlash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCard({ users }) {
  return (
    <div>{JSON.stringify(users)}</div>
  );
}

function EditUserModal({ user, closeModal }) {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit User field like e.g. Name & Email
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
