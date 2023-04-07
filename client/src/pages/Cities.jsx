import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelsCard from '../components/HotelsCard';

function Cities() {
  const [hotels, setHotels] = useState([]);
  const { cityName } = useParams();
  // console.log(cityName);

  const getHotelByCity = async () => {
    const headersList = {
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
    };

    const response = await fetch(`http://localhost:3000/hotel/?city=${cityName}`, {
      method: 'GET',
      headers: headersList,
    });

    const data = await response.json();
    // console.log(data);
    setHotels(data.rooms);
  };

  useEffect(() => {
    getHotelByCity();
  }, []);

  return (
    <div>
      <HotelsCard hotels={hotels} />

    </div>
  );
}

export default Cities;
