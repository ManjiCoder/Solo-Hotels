/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

import { addDays, format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import ModalContent from './ModalContent';
import VerticalLine from './VerticalLine';

function Search() {
  const refOne = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    document.addEventListener('keydown', hideOnEscape, true);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    const payload = {
      hotel: 'oyo',
      from: format(range[0].startDate, 'MM/dd/yyyy'),
      to: format(range[0].endDate, 'MM/dd/yyyy'),
    };
    console.log(payload);
  };
  return (
    <div className="flex justify-center">
      <form className="inline-flex justify-center border border-gray-500 rounded-sm" onSubmit={handleBooking}>
        {/* Search-Input */}
        <input
          className="outline-none text-xl font-semibold w-96 p-4 rounded-l-sm "
          type="search"
          placeholder="Search for hotels or city"
        />
        <VerticalLine />
        {/* DatePicker */}
        <div className="flex  relative justify-center items-center">
          <input
            value={`${format(range[0].startDate, 'dd')} ${format(range[0].startDate, 'MMM')} ➔ ${format(range[0].endDate, 'dd')} ${format(range[0].endDate, 'MMM')}`}
            className="outline-none w-60 text-center text-xl font-semibold  cursor-pointer p-4"
            readOnly
            placeholder="Date"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div
            className="absolute top-16"
            ref={refOne}
          >
            {isOpen && (
            <DateRange
              onChange={(item) => setRange([item.selection])}
              editableDateInputs
              moveRangeOnFirstSelection={false}
              ranges={range}
              minDate={new Date()}
              months={2}
              direction="horizontal"
              className="border border-gray-300 shadow-lg"
              rangeColors={['rgb(239 70 80)']}
            />
            )}
          </div>
        </div>

        {/* Room-Guest */}
        <VerticalLine />
        <button type="button" className="text-xl bg-white font-semibold p-4 w-60">Room-Guest</button>
        {showModal && (
        <ModalContent
          showModal={showModal}
          closeModal={closeModal}
        />
        )}
        {/* Search */}
        <button type="submit" className="bg-green-600 text-xl text-white font-semibold p-4 rounded-r-sm w-44">Search</button>
      </form>
    </div>
  );
}

export default Search;
