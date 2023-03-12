import React from 'react';

function SearchForm() {
  return (
    <>
      <h1 className="font-bold text-2xl my-4">Find hotels at best prices</h1>
      <form className="">
        <main className="flex flex-col border border-gray-700 rounded-md">
          <div className="flex flex-col place-items-start border-b-black border border-t-0 border-l-0 border-r-0 px-4 py-1">
            <div className="text-gray-600 text-sm">Destination</div>
            <button type="button">
              Search for city, location or hotel
            </button>
          </div>
          {/* <input type="email" className="peer " />
          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p> */}

          <section className="flex justify-between px-4 py-1">
            <div className="">
              <div className="text-gray-600 text-sm">Date</div>
              <button type="button">
                11Mar - 12Mar
              </button>
            </div>
            <div className="">
              <div className="text-gray-600 text-sm">Rooms and guests</div>
              <button type="button">
                1 room.1guest
              </button>
            </div>
          </section>
        </main>
        <button type="submit" className="bg-red-400 py-3 rounded-md font-semibold text-white my-5 w-full hover:bg-red-500">Search</button>
      </form>
    </>
  );
}

export default SearchForm;
