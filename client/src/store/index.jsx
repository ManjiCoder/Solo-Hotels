import { configureStore } from '@reduxjs/toolkit';
import AlertSlice from './slices/AlertSlice';
import CartSlice from './slices/CartSlice';
import citiesSlice from './slices/CitiesSlice';
import ToastSlice from './slices/ToastSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    user: userSlice,
    alerts: AlertSlice,
    cart: CartSlice,
    toast: ToastSlice,
  },
});

export default store;
