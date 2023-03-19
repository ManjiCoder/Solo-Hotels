/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

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
