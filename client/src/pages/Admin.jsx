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
import { logout } from '../store/slices/userSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import { setCart } from '../store/slices/CartSlice';
import { showAlertFn } from '../store/slices/AlertSlice';
import Modal from '../components/Modal';

const headersList = {
  'auth-token': localStorage.getItem('token'),
  'Content-Type': 'application/json',
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
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}admin/users`, {
        method: 'GET',
        headers: headersList,
      });

      const data = await response.json();
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteUser = async (id) => {
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: headersList,
      });

      const data = await response.json();
      console.log(data);
      fetchAllUser();

      dispatch(showToastFn(response.ok, data.msg));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };

  const handleEditUser = async () => {
    const bodyContent = JSON.stringify({
      role: targetUser.role === 'admin' ? 'user' : 'admin',
    });

    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}admin/users/update/${targetUser._id}`, {
        method: 'PUT',
        headers: headersList,
        body: bodyContent,
      });

      const data = await response.json();
      console.log(data);

      dispatch(showToastFn(response.ok, data.msg));
      if (targetUser.role === 'admin') {
        dispatch(showAlertFn(false, 'Please refresh the page to see changes', true));
      } else {
        setTimeout(() => {
          fetchAllUser();
        }, 1000);
      }
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
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
                {users?.map((person) => (
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
                          onClick={() => {
                            setShowEditModal(true);
                            setTargetUser(person);
                          }}
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          className="text-red-600"
                          type="button"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setTargetUser(person);
                          }}
                        >
                          <FaUserSlash />
                        </button>
                      </div>
                      {showEditModal && (
                      <Modal
                        closeModal={() => setShowEditModal(false)}
                        title="Are you sure?"
                      >

                        <>
                          <div className="flex flex-col gap-y-2 mt-3">
                            <h2>Do you want to change role of the</h2>
                            <h3>
                              <b>{` ${targetUser.name} `}</b>
                              to
                              <b>{` ${targetUser.role === 'admin' ? 'user' : 'admin'}`}</b>
                            </h3>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => setShowEditModal(false)}
                            >
                              Cancel!
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => {
                                handleEditUser(targetUser);
                                setShowEditModal(false);
                              }}
                            >
                              Done!
                            </button>
                          </div>

                        </>

                      </Modal>
                      )}
                      {showDeleteModal && (
                      <Modal
                        closeModal={() => setShowDeleteModal(false)}
                        title={`Are you sure to delete user with name ${targetUser.name}`}
                      >
                        <div className="mt-4 flex justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Cancel!
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              setShowDeleteModal(false);
                              handleDeleteUser(targetUser._id);
                            }}

                          >
                            Delete!
                          </button>
                        </div>
                      </Modal>
                      )}
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
