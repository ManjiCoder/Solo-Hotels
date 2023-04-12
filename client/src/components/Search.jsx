/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState, Fragment } from 'react';

import { addDays, addMonths, format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import VerticalLine from './VerticalLine';
import { setCity } from '../store/slices/SearchSlice';
import RoomsModal from './RoomsModal';

function Search() {
  const allCities = useSelector((state) => state.cities);
  const rooms = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);
  const navigate = useNavigate();
  const [showDateModal, setShowDateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [search, setSearch] = useState(rooms.city);
  const [showCity, setShowCity] = useState([]);

  function closeModal() {
    setShowModal(false);
  }
  function closeDateModal() {
    setShowDateModal(false);
  }

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
        onSubmit={(e) => {
          handleBooking(e, search.split(',')[0]);
          dispatch(setCity(search));
          // dispatch(setFromDate(format(range[0].startDate, 'dd/MM/yyyy')));
          // dispatch(setToDate(format(range[0].endDate, 'dd/MM/yyyy')));
        }}
      >
        {/* Search-Input */}
        <section className="relative">
          <input
            className="capitalize outline-none text-xl font-semibold w-96 p-4 rounded-l-sm "
            type="search"
            placeholder="Search for hotels or city"
            onChange={handleChange}
            value={search}
            required
          />
          <div
            className={`absolute w-full z-10 bg-white ${showOption && search.length > 0 && showCity.length > 0 ? 'flex flex-col gap-3 p-4 transition-all' : 'hidden'} max-h-60 shadow-md border-t ${showCity.length > 4 ? 'overflow-y-scroll' : 'overflow-hidden'}`}
          >
            {search.length > 0 && showCity.length > 0 && showCity.map(({ city, state, country }) => {
              const cityStr = `${city}, ${state}, ${country.toLowerCase()}`;
              return (
                <button
                  type="button"
                  className="w-full text-left text-xl font-semibold capitalize p-2 hover:text-white hover:bg-gradient-to-l from-[#df293a] to-[#d11450] rounded-sm"
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
            onClick={() => setShowDateModal(true)}
          />
          {showDateModal && (
            <DateModal closeDateModal={closeDateModal} range={range} setRange={setRange} />
          )}
        </div>

        {/* Room-Guest */}
        <VerticalLine />
        <button
          type="button"
          className="text-xl bg-white font-semibold p-4 w-60 outline-none"
          onClick={() => setShowModal(true)}
        >
          {rooms.room}
          -Room,
          {' '}
          {rooms.guest}
          -Guest
        </button>
        {showModal && (
        <RoomsModal showModal={showModal} closeModal={closeModal} />
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

function DateModal({ range, setRange, closeDateModal }) {
  const { pathname } = useLocation();
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeDateModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`${pathname === '/hotels' ? 'max-w-2xl' : 'max-w-3xl'} w-full transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all`}>
                <Dialog.Title
                  as="h3"
                  className="text-lg p-2 font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <span>
                    Check-In :
                    {' '}
                    {`${format(range[0].startDate, 'dd')} ${format(range[0].startDate, 'MMM')}  ${format(range[0].endDate, 'yyyy')}`}
                  </span>
                  <span>
                    Check-Out :
                    {' '}
                    {`${format(range[0].endDate, 'dd')} ${format(range[0].endDate, 'MMM')} ${format(range[0].endDate, 'yyyy')}`}
                  </span>
                </Dialog.Title>
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 12)}
                  months={2}
                  direction="horizontal"
                  className={`flex justify-center rounded-lg border border-gray-300 mx-auto shadow-lg ${pathname === '/hotels' ? 'text-sm' : 'text-base'}`}
                  rangeColors={['rgb(239 70 80)']}
                />
                <div className="mt-4 flex justify-end">

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-[#df293a] to-[#d11450] px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeDateModal}
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
