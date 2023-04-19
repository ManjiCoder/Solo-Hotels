/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDownloadDone } from 'react-icons/md';
import Modal from '../components/Modal';
import { showAlertFn } from '../store/slices/AlertSlice';
import { showToastFn } from '../store/slices/ToastSlice';

const headersList = {
  'auth-token': localStorage.getItem('token'),
  'Content-Type': 'application/json',
};
function Booking() {
  const { state } = useLocation();
  console.log({ state });
  const [showModal, setShowModal] = useState(false);

  const {
    property_name, img, address, price,
  } = state.hotel;
  const { roomCount, from, to } = state;
  const dispatch = useDispatch();

  const handleBooking = async (id) => {
    const bodyContent = JSON.stringify({
      hotel: state.hotel._id,
      roomCount,
      from,
      to,
      // price: roomCount * price,
    });

    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}order/add/${id}`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      const data = await response.json();
      // console.log(data);
      dispatch(showToastFn(response.ok, data.msg));
      setShowModal(true);
      // navigate('/');
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center py-4">Order Summary</h2>
      <section className="flex justify-center mb-9">
        <div className="border-2 shadow-lg rounded-sm">
          <img
            className="max-w-sm rounded-t-md"
            src={img || 'https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_960_720.jpg'}
            loading="lazy"
            alt=""
          />
          <div className="p-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {property_name}
            </h5>
            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Address:</b>
              {' '}
              {address}
            </p>

            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Room:</b>
              {' '}
              {roomCount}
            </p>
            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Check-In:</b>
              {' '}
              {from}
            </p>
            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Check-Out:</b>
              {' '}
              {to}
            </p>
            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Price:</b>
              {' '}
              {`₹${price || 499}/room`}
            </p>
            <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
              <b>Total:</b>
              {' '}
              {`₹${price || 499 * roomCount}`}
            </p>
            <button
              type="button"
              className="mb-3 font-semibold w-full text-center text-2xl p-3 rounded-full shadow-lg bg-gradient-to-l from-[#df293a] to-[#d11450] hover:scale-[1.02] transition-all text-white"
              onClick={() => handleBooking(state.hotel._id)}
            >
              Pay
              {' '}
              {`₹${price || 499 * roomCount}`}
            </button>
            {showModal && (
            <Modal
              closeModal={() => setShowModal(false)}
              title="Payment Done & Order Booked Successfully!"
            >
              <Link to="/" className="flex flex-col justify-center items-center">
                <h2 className="text-5xl p-1 my-5 text-green-700 border rounded-full shadow-md">
                  {' '}
                  <MdOutlineDownloadDone />
                </h2>
                <button
                  type="button"
                  className="my-3 font-semibold w-full text-center text-xl p-3 rounded-full shadow-lg bg-gradient-to-l from-[#df293a] to-[#d11450] hover:scale-[1.02] transition-all text-white"

                >
                  Go to Home Page

                </button>
              </Link>
            </Modal>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
