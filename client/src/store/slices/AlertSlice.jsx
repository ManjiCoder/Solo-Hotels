/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import { createSlice } from '@reduxjs/toolkit';

const AlertSlice = createSlice({
  name: 'alerts',
  initialState: null,
  reducers: {
    showAlert(state, action) {
      const { success, msg } = action.payload;
      return state = { success, msg };
    },
    closeAlert(state, action) {
      return state = action.payload;
    },
  },
});

export const { showAlert, closeAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
