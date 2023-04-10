/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

function OurCollection() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  // Fetch Hotels
  const getHotels = async () => {
    const response = await fetch('http://localhost:3000/hotel/all?page=1', {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
      },
    });

    const data = await response.json();
    // console.log(data);
    setHotels([]);
    setHotels(hotels.concat(data));
  };
  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="px-4 mb-11">
      <h1 className="font-bold text-xl my-4">Our collections</h1>
      <section className="flex gap-7 overflow-y-scroll hideScroll">
        {hotels.map((obj) => {
          // eslint-disable-next-line no-param-reassign
          obj.img = 'https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_960_720.jpg';
          const {
            _id, property_name, state, hotel_star_rating,
          } = obj;
          return (
            <button
              type="button"
              className="cursor-pointer hover:scale-[1.03] transition-all duration-300 ease-in-out text-sm rounded-md border shadow-lg bg-slate-100 relative"
              key={_id}
              onClick={() => navigate(`/hotel/${_id}`, { state: obj })}
            >
              <span
                className="flex items-center text-xs absolute right-0 font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-1 shadow-md rounded-sm rounded-tr-md"
              >
                {hotel_star_rating[0]}
                <MdOutlineStarPurple500 />

              </span>

              <LazyLoadImage
                className="h-28 w-full rounded-md aspect-video"
                alt={obj.property_name}
                effect="blur"
                src={obj.img}
              />

              <div className="w-44 p-2 flex flex-col justify-between">
                <h1 className="font-bold text-base leading-8">
                  {property_name.length > 15 ? `${property_name.slice(0, 15)}...` : property_name}
                </h1>
                <p className="text-xs font-semibold leading-4">{state}</p>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default OurCollection;
