/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  reducers: {
    login(state, action) {
      return state = action.payload;
    },
    signup(state, action) {
      return state = action.payload;
    },
    logout(state, action) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return state = null;
    },
    // TODO
    deleteAccount() {
      // return state = null;
    },
    // TODO
    changePassword() {
      // return state = null;
    },
  },
});
export const {
  login, signup, logout, deleteAccount, changePassword,
} = userSlice.actions;
export default userSlice.reducer;
