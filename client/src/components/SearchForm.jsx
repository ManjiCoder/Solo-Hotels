/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

import { addDays, format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import ModalContent from './ModalContent';

function SearchForm() {
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
    <>
      <h1 className="font-bold text-2xl my-4">Find hotels at best prices</h1>
      <form className="lg:flex lg:justify-center lg:items-center" onSubmit={handleBooking}>
        <main className="flex flex-col lg:flex-row border lg:space-x-10 lg:border-none lg:items-center border-gray-700 rounded-md">

          {/* Search Input */}
          <div className="flex border-b-black border border-t-0 border-l-0 border-r-0 lg:border-none px-4 py-1 lg:px-0">
            <input
              type="text"
              className="py-3  outline-none w-full lg:w-[240px]"
              name=""
              id=""
              placeholder="Search for city, hotels or location"
            />
          </div>

          <section className="grid grid-cols-3 lg:flex px-4 lg:p-0 lg:m-0 items-center">
            {/* <DatePick /> */}
            <div>
              <input
                value={`${format(range[0].startDate, 'dd')} ${format(range[0].startDate, 'MMM')} ➔ ${format(range[0].endDate, 'dd')} ${format(range[0].endDate, 'MMM')}`}
                className="outline-none text-sm font-semi-bold cursor-pointer py-3"
                readOnly
                placeholder="Date"
                onClick={() => setIsOpen(!isOpen)}
              />
              <div ref={refOne}>
                {isOpen && (
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  minDate={new Date()}
                  months={1}
                  direction="horizontal"
                  className="absolute mr-3 border border-gray-300"
                  rangeColors={['rgb(239 70 80)']}
                />
                )}
              </div>
            </div>
            <div className="place-self-center text-gray-400 text-xl">|</div>
            <button
              type="button"
              className="place-self-end self-center text-sm"
              onClick={() => setShowModal(true)}
            >
              Room - Guest
            </button>
            {showModal && (
            <ModalContent
              showModal={showModal}
              closeModal={closeModal}
            />
            )}
            {/* {showModal && createPortal(
              <ModalContent onClose={() => setShowModal(false)} />,
              document.getElementById('ParentModalDiv'),
            )} */}

          </section>
        </main>
        <button
          type="submit"
          className="bg-red-400 py-3 rounded-md font-semibold text-white my-5 lg:my-0 w-full lg:w-48 hover:bg-red-500"
        >
          Search

        </button>
      </form>
    </>
  );
}

export default SearchForm;
