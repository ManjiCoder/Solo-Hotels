/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

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
      <section className="flex space-x-3 overflow-y-scroll hideScroll">
        {hotels.map((obj) => (
          <main className="text-sm w-36 " key={obj._id}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU" className="h-32 w-28 rounded-md" alt="" />
            <div className="w-28">
              <h5 className="font-bold">{obj.property_name}</h5>
              <p className="text-xs break-words">{obj.state}</p>
            </div>
          </main>
        ))}
      </section>
    </div>
  );
}

export default OurCollection;
