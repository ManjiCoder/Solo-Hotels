import React from 'react';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function Toast() {
  const toast = useSelector((state) => state.toast);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {toast && (
      <div className="transition-all bg-gradient-to-l from-slate-800 to-slate-900 text-white rounded-md shadow-md h-14 w-[40%] flex space-x-7 justify-self-start items-center  fixed bottom-4 translate-x-[70%] z-20">
        <p className={`bg-${toast.success ? 'green' : 'red'}-500 h-full w-2 rounded-l-md`} />
        <div className="flex space-x-3 items-center font-semibold">
          {toast.success ? <HiOutlineCheckCircle className="text-green-500 text-2xl" />
            : <HiOutlineExclamationCircle className="text-red-500 text-2xl" />}
          <p>{toast.msg }</p>
        </div>
      </div>
      )}
    </>
  );
}

export default Toast;
