/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircle, MdRemoveCircle, MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRoom, deleteOrder, removeRoom,
} from '../store/slices/CartSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import BackButton from '../components/BackButton';

function Cart() {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cart);
  console.log(userCart);

  const handleRemoveRoom = (index) => {
    const { roomCount } = userCart.order[index];
    if (roomCount <= 1) return dispatch(showToastFn(false, 'Room Cannot Be Empty'));
    dispatch(removeRoom(index));
  };

  const handleAddRoom = (index) => {
    const { roomCount } = userCart.order[index];
    if (roomCount >= 25) return dispatch(showToastFn(false, 'Rooms Limit Exceeded'));
    dispatch(addRoom(index));
  };

  const handleDeleteOrder = (index) => {
    dispatch(deleteOrder(index));
    dispatch(showToastFn(true, 'Item remove successfully'));
  };

  return (
    <>
      <BackButton />
      <div className="p-7 bg-slate-50">
        <h1 className="text-3xl font-bold">Cart</h1>
        <hr className="my-2 h-0.5 bg-gray-300" />
        {userCart !== undefined && userCart.order.length !== 0 ? (
          <div className="mt-7 grid grid-cols-5 font-bold">
            <h2>Hotel Name</h2>
            <h2>State</h2>
            <h2>Check-In</h2>
            <h2>Check-Out</h2>
            <h2>Rooms</h2>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold my-5">Your cart is empty</h1>
            <Link className="font-semibold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-3 rounded-sm shadow-md" to="/hotels">Continue Browsing...</Link>
          </div>
        )}
        {userCart !== undefined && userCart.order.map((obj, index) => {
          const {
            hotel, from, to, roomCount,
          } = obj;
          const {
            _id, property_name, room_type,
          } = hotel;
          console.log(room_type);
          console.log(obj);
          return (
            <section className="" key={_id} id={_id}>
              <div className="grid grid-cols-5 my-7 items-center gap-y-5">
                <h1 className="font-semibold">{property_name}</h1>
                <h3>{room_type}</h3>
                <h3>{from}</h3>
                <h3>{to}</h3>
                <div className="font-bold flex justify-left items-center">
                  <button
                    className="text-2xl text-red-500"
                    type="button"
                    onClick={() => handleRemoveRoom(index)}
                  >
                    <MdRemoveCircle />
                  </button>
                  <h3 className="w-7 text-center">{roomCount}</h3>
                  <button
                    className="text-2xl text-blue-500"
                    type="button"
                    onClick={() => handleAddRoom(index)}
                  >
                    <MdAddCircle />
                  </button>
                  <button
                    className="ml-10 text-3xl text-red-500"
                    type="button"
                    onClick={() => handleDeleteOrder(index)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
              <hr className="my-2 h-0.5 bg-gray-300" />
            </section>
          );
        })}
        {userCart !== undefined && userCart.order.length > 0 && (
        <div className="flex space-x-2 font-semibold">
          <h2>Total Order : </h2>
          <h2 className="font-bold">
            {userCart.orderCount}
            {' '}
            Items
          </h2>
        </div>
        )}
      </div>
    </>
  );
}

export default Cart;
