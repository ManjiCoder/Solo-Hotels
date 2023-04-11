/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    city: '', from: '', to: '', room: 1, guest: 2,
  },
  reducers: {
    addRoom(state, action) {
      if (state.room > 5) return;
      return ({ ...state, room: action.payload + 1 });
    },
    removeRoom(state, action) {
      if (state.room === 1) return;
      return ({ ...state, room: action.payload - 1 });
    },
    addGuest(state, action) {
      if (state.guest > 15) return;
      return ({ ...state, guest: action.payload + 1 });
    },
    removeGuest(state, action) {
      if (state.guest === 1) return;
      return ({ ...state, guest: action.payload - 1 });
    },
    setCity(state, action) {
      console.log(action.payload);
      return ({ ...state, city: action.payload });
    },
    setFromDate(state, action) {
      return ({ ...state, from: action.payload });
    },
    setToDate(state, action) {
      return ({ ...state, to: action.payload });
    },
  },
});

export default SearchSlice.reducer;

export const {
  addRoom, addGuest, removeRoom, removeGuest,
  setFromDate, setToDate, setCity,
} = SearchSlice.actions;
