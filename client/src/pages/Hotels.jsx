/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert, showAlert } from '../store/slices/AlertSlice';
import { addItemToCart } from '../store/slices/CartSlice';

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.cart);
  // Fetch Hotels
  const getHotels = async () => {
    const response = await fetch('http://localhost:3000/hotel/all?page=1', {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
      },
    });

    const data = await response.json();
    console.log(data);
    setHotels(hotels.concat(data));
  };
  useEffect(() => {
    getHotels();
  }, []);

  // eslint-disable-next-line consistent-return
  const handleAddToCart = (item) => {
    if (userCart.length > 24) {
      return alert('you');
    }
    dispatch(addItemToCart(item));
    dispatch(showAlert({ success: true, msg: 'Item add to cart successfully' }));
    setTimeout(() => {
      dispatch(closeAlert(null));
    }, 2000);
  };
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-4 gap-x-5 gap-y-7 p-4 justify-center items-start">
      {hotels.map((obj) => (
        <div
          className="max-w-sm h-96 shadow-md bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          key={obj._id}
          id={obj._id}
        >
          <a href="#">
            <img
              className="rounded-t-lg w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {obj.state}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {obj.address}
            </p>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleAddToCart(obj)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hotels;
