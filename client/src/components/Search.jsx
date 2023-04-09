/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

import { addDays, format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalContent from './ModalContent';
import VerticalLine from './VerticalLine';

function Search() {
  const allCities = useSelector((state) => state.cities);
  const refOne = useRef('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [search, setSearch] = useState('');
  const [showCity, setShowCity] = useState([]);

  function closeModal() {
    setShowModal(false);
  }

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const hideOnEscape = (e) => {
    // console.log(e.key);
    if (e.key === 'Escape') setIsOpen(false);
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    const matchCity = [];
    setShowOption(true);
    // eslint-disable-next-line array-callback-return
    allCities.map((obj) => {
      const { city, state, country } = obj;
      const str = `${city}, ${state}, ${country}`;
      if (str.toLowerCase().includes(e.target.value.toLowerCase())) {
        matchCity.push(obj);
        // console.log(str);
      }
    });
    setShowCity(matchCity);
  };

  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    document.addEventListener('keydown', hideOnEscape, true);
  }, []);

  const handleBooking = (e, city) => {
    e.preventDefault();
    const payload = {
      hotel: search,
      from: format(range[0].startDate, 'dd/MM/yyyy'),
      to: format(range[0].endDate, 'dd/MM/yyyy'),
    };
    console.log({ payload, city });
    navigate(`/city/${city}`);
  };
  return (
    <div className="flex justify-center">
      <form
        className="inline-flex justify-center border border-gray-500 rounded-sm"
        onSubmit={(e) => handleBooking(e, search.split(',')[0])}
      >
        {/* Search-Input */}
        <section className="relative">
          <input
            className="capitalize outline-none text-xl font-semibold w-96 p-4 rounded-l-sm "
            type="search"
            placeholder="Search for hotels or city"
            onChange={handleChange}
            value={search}
          />
          <div
            className={`absolute w-full z-10 bg-white ${showOption && search.length > 0 && showCity.length > 0 ? 'flex flex-col gap-3 p-4 transition-all' : 'hidden'} max-h-60 shadow-md border-t ${showCity.length > 4 ? 'overflow-y-scroll' : 'overflow-hidden'}`}
          >
            {search.length > 0 && showCity.length > 0 && showCity.map(({ city, state, country }) => {
              const cityStr = `${city}, ${state}, ${country.toLowerCase()}`;
              return (
                <button
                  type="button"
                  className="w-full text-left text-xl font-semibold capitalize"
                  key={city}
                  onClick={() => {
                    setSearch(cityStr);
                    setShowOption(false);
                  }}
                >
                  {cityStr.length > 34 ? `${cityStr.slice(0, 34)}...` : cityStr}
                </button>
              );
            })}
          </div>
        </section>

        <VerticalLine />
        {/* DatePicker */}
        <div className="flex  relative z-10 justify-center items-center">
          <input
            value={`${format(range[0].startDate, 'dd')} ${format(range[0].startDate, 'MMM')} ➔ ${format(range[0].endDate, 'dd')} ${format(range[0].endDate, 'MMM')}`}
            className="outline-none w-60 text-center text-xl font-semibold  cursor-pointer p-4"
            readOnly
            placeholder="Date"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="absolute top-16" ref={refOne}>
            {isOpen && (
            <DateRange
              onChange={(item) => setRange([item.selection])}
              editableDateInputs
              moveRangeOnFirstSelection={false}
              ranges={range}
              minDate={new Date()}
              months={2}
              direction="horizontal"
              className={`border border-gray-300 shadow-lg ${pathname === '/hotels' && 'text-base'}`}
              rangeColors={['rgb(239 70 80)']}
            />
            )}
          </div>
        </div>

        {/* Room-Guest */}
        <VerticalLine />
        <button
          type="button"
          className="text-xl bg-white font-semibold p-4 w-60"
        >
          Room-Guest
        </button>
        {showModal && (
        <ModalContent showModal={showModal} closeModal={closeModal} />
        )}
        {/* Search */}
        <button
          type="submit"
          className="bg-green-600 text-xl text-white font-semibold p-4 rounded-r-sm w-44"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
