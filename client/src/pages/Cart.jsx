/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddCircle, MdRemoveCircle, MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRoom, deleteOrder, getCartItemFn, removeRoom,
} from '../store/slices/CartSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import BackButton from '../components/BackButton';
import { showAlertFn } from '../store/slices/AlertSlice';

const headersList = {
  'auth-token': localStorage.getItem('token'),
  'Content-Type': 'application/json',
};

function Cart() {
  const { userCart } = useSelector((state) => state.cart);
  // console.log(userCart);

  return (
    <div className="px-5">
      <BackButton />
      {userCart !== undefined && userCart.order ? <CartItem userCart={userCart} /> : <EmptyCart />}
    </div>
  );
}

export default Cart;

function CartItem({ userCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveRoom = async (index, id) => {
    const { roomCount } = userCart.order[index];
    if (roomCount <= 1) return dispatch(showToastFn(false, 'Room Cannot Be Empty'));
    dispatch(removeRoom(index));
    // API Call
    const bodyContent = JSON.stringify({
      roomCount: roomCount - 1,
    });

    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}cart/update/${id}`, {
        method: 'PUT',
        body: bodyContent,
        headers: headersList,
      });

      const data = await response.json();
      dispatch(showToastFn(response.ok, data.msg));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };

  const handleAddRoom = async (index, id) => {
    // Validation for rooms limit
    const { roomCount } = userCart.order[index];
    if (roomCount >= 6) return dispatch(showToastFn(false, 'Rooms Limit Exceeded'));
    dispatch(addRoom(index));
    // API Call
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}cart/add/${id}`, {
        method: 'POST',
        // body: bodyContent,  You can pass it & it's not compalsory
        headers: headersList,
      });

      const data = await response.json();
      console.log(data);
      dispatch(showToastFn(response.ok, data.msg));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };

  const handleDeleteOrder = async (index, id) => {
    // API Call
    const bodyContent = JSON.stringify({
      hotel: userCart._id,
    });
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}cart/remove-order/${id}`, {
        method: 'PUT',
        body: bodyContent,
        headers: headersList,
      });
      const data = await response.json();
      console.log(data);
      dispatch(showToastFn(response.ok, data.msg));
      dispatch(deleteOrder(index));

      if (response.ok) dispatch(getCartItemFn());
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }

    dispatch(deleteOrder(index));
    dispatch(showToastFn(true, 'Item remove successfully'));
  };
  return (
    <div className="px-5">
      <div className="mt-7 grid grid-cols-6 font-bold">
        <h2>Hotel Name</h2>
        <h2>Room-Type</h2>
        <h2>Check-In</h2>
        <h2>Check-Out</h2>
        <h2>Rooms</h2>
        <h2>Action</h2>
      </div>
      <hr className="my-2 mt-7 h-0.5 bg-gray-300" />
      {userCart.order.map((obj, index) => {
        console.log(obj);
        const {
          hotel, from, to, roomCount,
        } = obj;
        const {
          _id, property_name, room_type,
        } = hotel;
        return (
          <section className="" key={_id} id={_id}>
            <div className="grid grid-cols-6 my-7 items-center gap-y-5">
              <Link
                className="font-semibold"
                state={hotel}
                to={`/hotel/${_id}`}
              >
                {property_name}
              </Link>
              <h3>{room_type}</h3>
              <h3>{from}</h3>
              <h3>{to}</h3>
              <div className="font-bold flex justify-left items-center">
                <button
                  className="text-2xl text-red-500"
                  type="button"
                  onClick={() => handleRemoveRoom(index, _id)}
                >
                  <MdRemoveCircle />
                </button>
                <h3 className="w-7 text-center">{roomCount}</h3>
                <button
                  className="text-2xl text-blue-500"
                  type="button"
                  onClick={() => handleAddRoom(index, _id)}
                >
                  <MdAddCircle />
                </button>
                <button
                  className="ml-10 text-3xl text-red-500"
                  type="button"
                  onClick={() => handleDeleteOrder(index, _id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
              <button
                type="button"
                className="mr-3 text-sm font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md"
                onClick={() => {
                  navigate('/booking', { state: obj });
                }}
              >
                Book Now
              </button>
            </div>
            <hr className="my-2 h-0.5 bg-gray-300" />
          </section>
        );
      })}
      <div className="flex space-x-2 font-semibold my-7">
        <h2>Total Order : </h2>
        <h2 className="font-bold">
          {userCart.orderCount}
          {' '}
          Items
        </h2>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="p-7 bg-slate-50">
      <h1 className="text-3xl font-bold">Cart</h1>
      <hr className="my-2 h-0.5 bg-gray-300" />

      <div>
        <h1 className="text-2xl font-semibold my-5">Your cart is empty</h1>
        <Link className="font-semibold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-3 rounded-sm shadow-md" to="/hotels">Continue Browsing...</Link>
      </div>

    </div>
  );
}
