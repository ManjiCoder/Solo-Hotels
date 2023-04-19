/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function HotelsCard(props) {
  // eslint-disable-next-line react/prop-types
  const { hotels } = props;
  console.log(hotels);
  const navigate = useNavigate();

  return (
    <div className=" bg-slate-100">
      <BackButton />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-7 p-4 justify-center items-start bg-slate-100">
        {hotels !== undefined && hotels.map((obj) => {
          // eslint-disable-next-line no-param-reassign
          obj.img = 'https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_960_720.jpg';
          const {
            _id, address, state, hotel_star_rating, property_name, img, price,
          } = obj;
          return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="relative hover:scale-[1.03] transition-all ease-in-out duration-300  shadow-md bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              key={_id}
              id={_id}

            >
              {hotel_star_rating && (
                <p
                  className="flex items-center text-sm absolute z-10 right-0 font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md"
                >
                  {hotel_star_rating[0]}
                  <MdOutlineStarPurple500 />
                  <span className="ml-1.5">{hotel_star_rating.slice(2, 20)}</span>

                </p>
              )}
              <LazyLoadImage
                alt={property_name}
                effect="blur"
                src={img}
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
                <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
                  Price:
                  {' '}
                  {`₹${price || Math.floor(Math.random() + 499)}/room`}
                </p>

                <div className="flex justify-between my-3">
                  <button
                    type="button"
                    className="inline-flex shadow-md items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      navigate(`/hotel/${_id}`, { state: obj });
                    }}
                  >
                    View More
                  </button>
                  <button
                    type="button"
                    className="inline-flex shadow-md items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => navigate('/booking', { state: obj })}
                  >

                    Book Now
                  </button>
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
