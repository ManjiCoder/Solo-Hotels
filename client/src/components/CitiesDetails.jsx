import React from 'react';
import { MdNearMe } from 'react-icons/md';

function CitiesDetails() {
  const cities = Object.freeze(
    [
      {
        name: 'Near me',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
      {
        name: 'Mumbai',
        img: <MdNearMe />,
      },
    ],
  );
  return (
    <>
      <h2 className="font-bold text-xl my-4">Explore your next destination</h2>
      <section className="flex space-x-2 overflow-y-scroll scroll-smooth hideScroll">

        {cities.map((item) => (
          <div className="text-center" key={item.name}>
            <div className="text-2xl bg-cyan-500 text-white w-16 h-11 flex items-center justify-center rounded-md">
              <span>{item.img}</span>
            </div>
            <span className="text-xs  font-semibold">{item.name}</span>
          </div>
        ))}
      </section>
    </>
  );
}

export default CitiesDetails;
