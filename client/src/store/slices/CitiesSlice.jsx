/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import { showToastFn } from './ToastSlice';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: ['near me'],
  reducers: {
    updateCities(state, action) {
      // TODO USE CHACHING
      return state = action.payload;
    },
  },
});

export const { updateCities } = citiesSlice.actions;
export default citiesSlice.reducer;

// Async
export function getCity() {
  return async function getCities(dispatch) {
    // TODO: Use RTK or React Query => Caching needed
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}hotel/cities`, {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwZGJlNTdkMGY5NzI0MzcxMDQxYjk0In0sImlhdCI6MTY3ODYzOTAyN30.sApsQJZC5mKB9_Ol9__a15ogOG6Osgv__hYTaN8SegA',
      },
    });
    const data = response.status === 500 ? false : await response.json();
    if (response.ok) dispatch(updateCities(data));
    dispatch(showToastFn(response.ok, data.msg || 'Server Down'));
  };
}
