/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import { showAlertFn } from './AlertSlice';
import { showToastFn } from './ToastSlice';

const CartSlice = createSlice({
  name: 'cart',
  initialState: { },
  reducers: {
    addItemToCart(state, action) {
      const { updateRoomCount } = action.payload;
      // console.log(action.payload);
      state.order = updateRoomCount;
    },
    setCart(state, action) {
      return {
        ...state, userCart: action.payload,
      };
    },
    // eslint-disable-next-line consistent-return
    addRoom(state, action) {
      const { roomCount } = state.userCart.order[action.payload];
      state.userCart.order[action.payload] = { ...state.userCart.order[action.payload], roomCount: roomCount + 1 };

      // let { roomCount } = state.userCart.order[action.payload];
      // roomCount += 1;
      // console.log(roomCount);
      // state.userCart.order[action.payload].roomCount = roomCount;
    },
    removeRoom(state, action) {
      const { roomCount } = state.userCart.order[action.payload];
      state.userCart.order[action.payload] = { ...state.userCart.order[action.payload], roomCount: roomCount - 1 };
    },
    deleteOrder(state, action) {
      const index = action.payload;
      state.userCart.order.splice(index, 1);
    },
  },
});

export default CartSlice.reducer;
export const {
  addItemToCart, setCart, addRoom, removeRoom, deleteOrder,
} = CartSlice.actions;

// Get all carts

export function getCartItemFn() {
  return async function getCart(dispatch) {
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}cart/all`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();
      // console.log(data);
      if (!response.ok && data.msg !== 'Your cart is empty') dispatch(showToastFn(response.ok, data.msg, 5000));
      dispatch(setCart(data));
    } catch (error) {
      dispatch(showAlertFn(false, response.statusText, true));
      console.log({ error });
    }
  };
}
