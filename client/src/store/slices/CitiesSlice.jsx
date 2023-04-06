/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import { showAlertFn } from './AlertSlice';
import { showToastFn } from './ToastSlice';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: [],
  reducers: {
    setCities(state, action) {
      // TODO USE CHACHING
      return state = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;
export default citiesSlice.reducer;

// Async
export function getCityFn() {
  return async function getCities(dispatch) {
    let response;
    try {
      // TODO: Use RTK or React Query => Caching needed
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}hotel/cities`, {
        method: 'GET',
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
        },
      });
      const data = await response.json();
      // If Server is up & error occurs
      if (!response.ok) dispatch(showToastFn(response.ok, data.msg, 5000));
      dispatch(setCities(data));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error }, response.statusText);
    }
  };
}
