/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlertFn } from '../store/slices/AlertSlice';
import { showToastFn } from '../store/slices/ToastSlice';
import HotelsCard from '../components/HotelsCard';

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();

  // Fetch Hotels
  const getHotels = async () => {
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}hotel/all?page=${1}`, {
        method: 'GET',
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
        },
      });
      const data = await response.json();
      // If Server is up & error occurs
      if (!response.ok) dispatch(showToastFn(response.ok, data.msg, 5000));
      setHotels(hotels.concat(data));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error });
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className=" bg-slate-100">
      <HotelsCard hotels={hotels} />
    </div>
  );
}

export default Hotels;
