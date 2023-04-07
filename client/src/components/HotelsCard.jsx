/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showAlertFn } from '../store/slices/AlertSlice';
import { addItemToCart, getCartItemFn } from '../store/slices/CartSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import BackButton from './BackButton';

function HotelsCard(props) {
  // eslint-disable-next-line react/prop-types
  const { hotels } = props;
  console.log(hotels);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (id) => {
    if (user !== null) {
      let response;
      try {
        const bodyContent = JSON.stringify({
          from: '16-03-2033',
          to: '15-04-2023',
        });

        response = await fetch(`http://localhost:3000/cart/add/${id}`, {
          method: 'POST',
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: bodyContent,
        });

        const data = await response.json();
        // console.log(data);
        if (response.ok) dispatch(addItemToCart(data));
        dispatch(showToastFn(response.ok, data.msg));
        dispatch(getCartItemFn());
      } catch (error) {
        dispatch(showAlertFn(false, response.statusText, true));
        console.log({ error });
      }
    } else {
      dispatch(showToastFn(false, 'Login to add item to cart', 3000));
    }
  };

  return (
    <div className=" bg-slate-100">
      <BackButton />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-7 p-4 justify-center items-start bg-slate-100">
        {hotels !== undefined && hotels.map((obj) => {
          // eslint-disable-next-line no-param-reassign
          obj.img = 'https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_960_720.jpg';
          const {
            _id, address, state, hotel_star_rating, property_name, img,
          } = obj;
          return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="relative hover:scale-[1.03] transition-all ease-in-out duration-300  shadow-md bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              key={_id}
              id={_id}
              onClick={() => {
                navigate(`/hotel/${_id}`, { state: obj });
              }}
            >
              <p
                className="flex items-center text-sm absolute right-0 font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md"
              >
                {hotel_star_rating[0]}
                <MdOutlineStarPurple500 />
                <span className="ml-1.5">{hotel_star_rating.slice(2, 20)}</span>

              </p>
              <img
                className="rounded-t-lg w-full h-52 aspect-video"
                src={img}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {property_name.length > 20 ? `${property_name.slice(0, 20)}...` : property_name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {address.length > 30 ? `${address.slice(0, 30)}...` : address}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {state}
                </p>

                <div className="flex justify-between my-3">
                  <button
                    type="button"
                    className="inline-flex shadow-md items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleAddToCart(_id)}
                  >
                    Add to cart
                  </button>
                  <Link
                    type="button"
                    className="inline-flex shadow-md items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    state={{
                      data: {
                        obj,
                      },
                    }}
                    to={`/hotel/${_id}`}
                  >

                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelsCard;
