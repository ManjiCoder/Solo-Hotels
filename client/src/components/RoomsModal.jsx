/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGuest, addRoom, removeGuest, removeRoom,
} from '../store/slices/SearchSlice';

export default function RoomsModal({ closeModal }) {
  const rooms = useSelector((state) => state.search);
  const dispatch = useDispatch();

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
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <span className="ml-1.5">
                    {`Room - ${rooms.room}`}
                  </span>
                  <span className="mr-1.5">
                    {`Guest - ${rooms.guest}`}
                  </span>
                </Dialog.Title>
                <div className="mt-2 flex justify-between">
                  <div className="flex items-center text-xl">
                    <button
                      type="button"
                      className={`border-2 border-gray-400 rounded-sm p-1 hover:bg-slate-100 ${rooms.room === 1 ? 'text-gray-300' : ''}`}
                      onClick={() => dispatch(removeRoom(rooms.room))}
                    >
                      <AiOutlineMinus />
                    </button>
                    <h4 className="w-7 font-semibold text-center">{rooms.room}</h4>
                    <button
                      type="button"
                      className={`border-2 border-gray-400 rounded-sm p-1 hover:bg-slate-100 ${rooms.room === 6 ? 'text-gray-300' : ''}`}
                      onClick={() => dispatch(addRoom(rooms.room))}
                    >
                      <AiOutlinePlus />
                    </button>

                  </div>
                  <div className="flex items-center text-xl">
                    <button
                      type="button"
                      className={`border-2 border-gray-400 rounded-sm p-1 hover:bg-slate-100 ${rooms.guest === 1 ? 'text-gray-300' : ''}`}
                      onClick={() => dispatch(removeGuest(rooms.guest))}
                    >
                      <AiOutlineMinus />
                    </button>
                    <h4 className="w-7 font-semibold text-center">{rooms.guest}</h4>
                    <button
                      type="button"
                      className={`border-2 border-gray-400 rounded-sm p-1 hover:bg-slate-100 ${rooms.guest === 16 ? 'text-gray-300' : ''}`}
                      onClick={() => dispatch(addGuest(rooms.guest))}
                    >
                      <AiOutlinePlus />
                    </button>

                  </div>
                </div>

                <div className="mt-4 flex justify-end">

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
