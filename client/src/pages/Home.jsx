import React from 'react';
import ExploreCities from '../components/ExploreCities';
import OurCollection from '../components/OurCollection';
import Search from '../components/Search';
// import SearchForm from '../components/SearchForm';

function Home() {
  return (
    <div className="">
      {/* <SearchForm /> */}
      <Search />
      <ExploreCities />
      <OurCollection />
    </div>
  );
}

export default Home;
