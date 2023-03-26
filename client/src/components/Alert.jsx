/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-lone-blocks */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { closeAlert } from '../store/slices/AlertSlice';

function Alert() {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alerts);

  const handleCloseAlert = () => {
    dispatch(closeAlert(null));
  };

  return (
    <div className="absolute top-12 w-full h-14">

      {alertState && (
      <div className="flex flex-col z-10 bg-white shadow-md border ">
        <div className="flex items-center mx-7">
          {alertState.success ? <HiOutlineCheckCircle className="text-green-500 text-2xl" />
            : <HiOutlineExclamationCircle className="text-red-500 text-2xl" />}
          <p className={`flex justify-between w-full p-3 text-xl text-left font-semibold ${alertState.success ? '' : 'text-red-500'}`}>
            {alertState.msg}
            <button type="button" className="text-2xl cursor-pointer text-right" onClick={handleCloseAlert}>
              <MdClose />
            </button>
          </p>
        </div>

        <div className={`animate-line h-2 shadow-md rounded-full ${alertState.success ? 'bg-green-500' : 'bg-red-500'}`} />

      </div>
      )}

    </div>

  );
}

export default Alert;

// Side note use animate-pulse
{ /* <AnimatePresence initial={false}>
          {notifications.map(id => (
            <motion.li
              key={id}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <CloseButton
                close={() => setNotifications(remove(notifications, id))}
              />
            </motion.li>
          ))}
        </AnimatePresence> */ }
