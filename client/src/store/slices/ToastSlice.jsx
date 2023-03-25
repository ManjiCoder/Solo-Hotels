/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

const ToastSlice = createSlice({
  name: 'toast',
  initialState: null,
  reducers: {
    showToast(state, action) {
      return state = action.payload;
    },
    closeToast(state) {
      return state = null;
    },
  },
});

export default ToastSlice.reducer;
export const { showToast, closeToast } = ToastSlice.actions;

export function showToastFn(type, msg, time) {
  return async function setToast(dispatch, getState) {
    dispatch(showToast({ success: type, msg }));
    setTimeout(() => {
      dispatch(closeToast());
    }, time || 1500);
  };
}
