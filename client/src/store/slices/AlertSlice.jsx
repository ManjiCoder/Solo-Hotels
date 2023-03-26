/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import { createSlice } from '@reduxjs/toolkit';

const AlertSlice = createSlice({
  name: 'alerts',
  initialState: null,
  reducers: {
    setAlert(state, action) {
      return state = action.payload;
    },
    closeAlert(state, action) {
      return state = null;
    },
  },
});

export const { setAlert, closeAlert } = AlertSlice.actions;
export default AlertSlice.reducer;

export function showAlertFn(type, msg, isInfinite) {
  return async function showAlert(dispatch, getState) {
    dispatch(setAlert({ success: type, msg }));
    if (!isInfinite) {
      dispatch(closeAlert());
    }
  };
}
