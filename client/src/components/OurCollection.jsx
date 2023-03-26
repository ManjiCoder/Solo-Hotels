/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';

function OurCollection() {
  // const hotelCollection = [
  //   {
  //     name: 'SOLO Home',
  //     description: 'Modern and stylish home stay',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
  //   },
  //   {
  //     name: 'SOLO Home1',
  //     description: 'Modern and stylish home stay',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
  //   },

  // ];
  const [hotels, setHotels] = useState([]);

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
    <div className="px-4">
      <h1 className="font-bold text-xl my-4">Our collections</h1>
      <section className="flex my-7 gap-7 overflow-y-scroll hideScroll">
        {hotels.map(({
          _id, property_name, state, hotel_star_rating,
        }) => (
          <div className="text-sm rounded-md border shadow-lg bg-slate-50 relative" key={_id}>
            <span
              className="flex items-center text-xs absolute right-0 font-bold bg-gradient-to-l from-[#df293a] to-[#d11450] text-white p-1 shadow-md rounded-sm rounded-tr-md"
            >
              {hotel_star_rating[0]}
              <MdOutlineStarPurple500 />

            </span>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU" className="h-28 w-full rounded-md" alt="" />

            <div className="w-44 p-2 flex flex-col justify-between">
              <h1 className="font-bold text-base leading-8">
                {property_name.length > 15 ? `${property_name.slice(0, 15)}...` : property_name}
              </h1>
              <p className="text-xs font-semibold leading-4">{state}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default OurCollection;
