import React, { useEffect } from 'react';
import { MdNearMe } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCity } from '../store/slices/CitiesSlice';

function ExploreCities() {
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCity());
  }, []);

  return (
    <div className="px-4">
      <h2 className="font-bold text-xl my-4">Explore your next destination</h2>
      <section className="flex space-x-2 overflow-y-scroll scroll-smooth hideScroll">

        {allCities.slice(0, 10).map((item) => (
          <div className="text-center capitalize" key={item}>
            <Link className="text-2xl cursor-pointer font-semibold bg-blue-600 text-white w-16 h-11 flex items-center justify-center rounded-md" to="/cities">
              <button type="button">{item === 'near me' ? <MdNearMe /> : item[0]}</button>
            </Link>
            <span className="text-xs font-semibold">{item}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ExploreCities;
