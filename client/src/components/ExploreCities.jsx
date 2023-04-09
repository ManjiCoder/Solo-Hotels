import React from 'react';
import { MdNearMe } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ExploreCities() {
  const allCities = useSelector((state) => state.cities);
  return (
    <div className="px-4">
      <h2 className="font-bold text-xl my-4">Explore your next destination</h2>
      <section className="flex gap-3 overflow-y-scroll scroll-smooth hideScroll">
        <div className="text-center capitalize">
          <button
            type="button"
            className="text-2xl cursor-pointer font-semibold bg-blue-600 text-white w-24 h-16 flex items-center justify-center rounded-md"
          >
            N
          </button>
          <span className="text-xs font-semibold">Near Me</span>
        </div>

        { allCities.length > 0 && allCities.slice(0, 51).map(({ city }) => (
          <div className="text-center capitalize" key={city}>
            <Link
              className="text-2xl cursor-pointer font-semibold bg-blue-600 text-white w-24 h-16 flex items-center justify-center rounded-md"
              to={`/city/${city}`}
            >
              <button type="button">{city === 'near me' ? <MdNearMe /> : city[0]}</button>
            </Link>
            <span className="text-xs font-semibold">{city}</span>
          </div>
        ))}

        <div className="text-center capitalize">
          <Link
            className="text-2xl cursor-pointer font-semibold bg-blue-600 text-white w-24 h-16 flex items-center justify-center rounded-md"
            to="/cities"
          >
            A
          </Link>
          <span className="text-xs font-semibold">All Cities</span>
        </div>
      </section>
    </div>
  );
}

export default ExploreCities;
