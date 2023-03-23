/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart(state, action) {
      const { updateRoomCount } = action.payload;
      console.log(updateRoomCount);
      return state = updateRoomCount;
    },
  },
});

export default CartSlice.reducer;
export const { addItemToCart } = CartSlice.actions;
