import React from 'react';
import ExploreCities from '../components/ExploreCities';
import OurCollection from '../components/OurCollection';
import Search from '../components/Search';
// import SearchForm from '../components/SearchForm';

function Home() {
  return (
    <div className="">
      {/* <SearchForm /> */}
      <header className="pb-9 bg-gradient-to-l from-[#df293a] to-[#d11450]">
        <h1 className="text-3xl text-white text-center py-7 font-bold">Over 157,000 hotels and homes across 35 countries</h1>
        <Search />
      </header>
      <ExploreCities />
      <OurCollection />
    </div>
  );
}

export default Home;
