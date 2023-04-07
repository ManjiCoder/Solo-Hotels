/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { showAlertFn } from '../store/slices/AlertSlice';

function Hotel() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isShowMore, setIsShowMore] = useState(false);

  const {
    _id,
    address,
    area,
    city,
    country,
    crawl_date,
    hotel_description,
    hotel_facilities,
    hotel_star_rating,
    landmark,
    locality,
    latitude,
    longitude,
    qts,
    property_id,
    property_name,
    property_type,
    province,
    room_count,
    room_facilities,
    room_type,
    state: hotelState,
    img,
  } = state;

  // console.log(
  //   {
  //     _id,
  //     address,
  //     area,
  //     city,
  //     country,
  //     crawl_date,
  //     hotel_description,
  //     hotel_facilities,
  //     hotel_star_rating,
  //     landmark,
  //     latitude,
  //     longitude,
  //     qts,
  //     property_id,
  //     property_name,
  //     property_type,
  //     province,
  //     room_count,
  //     room_facilities,
  //     room_type,
  //     hotelState,
  //     img,
  //   },
  // );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!state) return dispatch(showAlertFn(false, 'Not Allowed', true));
    const arr = hotel_facilities.split(':');
    console.log(arr);
  }, []);

  return (
    <div className="bg-slate-100">
      <BackButton />
      <section className="py-4 px-11">
        {state && (
        <div
          className="relative shadow-md bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          id={_id}
        >
          <span className="flex items-center text-sm absolute right-0 font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md">
            {hotel_star_rating[0]}
            <MdOutlineStarPurple500 />
            <span className="ml-1.5">{hotel_star_rating.slice(2, 20)}</span>
          </span>

          <img
            className="rounded-t-lg mx-auto border shadow-md rounded-md w-full h-96 aspect-video"
            src={img}
            alt=""
          />
          <div className="p-5 flex flex-col gap-3">
            <h2 className="mb-2 gap-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {property_name}
              {' '}
              -
              {' '}
              <span className="mr-3 text-sm font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md">
                {room_type}
              </span>
            </h2>
            <p className="">
              <strong className="not-italic mr-2 font-bold">
                Room
                {' '}
                {room_count > 0 ? 'Avaiable' : ''}
                {' '}
                -
              </strong>
              <span className={`${room_count === '0' ? 'text-red-500 font-semibold' : 'rounded-full bg-gradient-to-l from-[#df293a] to-[#d11450] px-2.5 py-2 mx-auto text-white font-bold'}`}>{room_count > 0 ? room_count : 'Out of stock'}</span>
            </p>

            <address className="capitalize text-gray-700 dark:text-gray-400">
              <strong className="not-italic mr-2 font-bold">Address:</strong>
              {`${address}, ${hotelState} ,${country.toLowerCase()}`}
            </address>

            <p className="transition-all ease-in-out duration-1000 font-normal text-gray-700 dark:text-gray-400 text-ellipsis">
              <strong className="not-italic mr-2 font-bold">Description:</strong>
              {hotel_description.length > 900 ? (
                <span>
                  {isShowMore ? hotel_description : `${hotel_description.slice(0, 800)}...`}
                  <button
                    type="button"
                    className="ml-1.5 rounded-md font-semibold py-1 px-1.5 hover:bg-gradient-to-l from-[#df293a] to-[#d11450] hover:text-white"
                    onClick={() => setIsShowMore(!isShowMore)}
                  >
                    {isShowMore ? 'Show Less' : 'Show More'}

                  </button>
                </span>
              ) : hotel_description}
            </p>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong className="not-italic mr-2 font-bold">Hotel Facilities:</strong>
              {hotel_facilities}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong className="not-italic mr-2 font-bold">Room Facilities:</strong>
              {room_facilities}
            </p>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong className="not-italic mr-2 font-bold">Province:</strong>
              {province}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong className="not-italic mr-2 font-bold">LandMark:</strong>
              {landmark}
            </p>
            <div>
              <button
                type="button"
                className="mr-3 text-sm font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md"
              >
                Add to cart
              </button>
              <button
                type="button"
                className="mr-3 text-sm font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-2 shadow-md rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        )}
      </section>
    </div>
  );
}

export default Hotel;
