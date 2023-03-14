import { configureStore } from '@reduxjs/toolkit';
import citiesSlice from './slices/CitiesSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    user: userSlice,
  },
});

export default store;
