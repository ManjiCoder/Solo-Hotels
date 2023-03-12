import React from 'react';
import CitiesDetails from '../components/CitiesDetails';
import OurCollection from '../components/OurCollection';
import SearchForm from '../components/SearchForm';

function Home() {
  return (
    <div className="px-5 h-[80vh]">
      <SearchForm />
      <CitiesDetails />
      <OurCollection />
    </div>
  );
}

export default Home;
