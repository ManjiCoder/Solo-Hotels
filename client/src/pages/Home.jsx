import React from 'react';
import ExploreCities from '../components/ExploreCities';
import OurCollection from '../components/OurCollection';
import SearchForm from '../components/SearchForm';

function Home() {
  return (
    <div className="px-5 h-[80vh]">
      <SearchForm />
      <ExploreCities />
      <OurCollection />
    </div>
  );
}

export default Home;
