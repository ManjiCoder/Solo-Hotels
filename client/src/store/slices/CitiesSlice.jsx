import { createSlice } from '@reduxjs/toolkit';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: ['near me'],
  reducers: {
    updateCities(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { updateCities } = citiesSlice.actions;
export default citiesSlice.reducer;
