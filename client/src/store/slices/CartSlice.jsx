import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart(state, action) {
      state.push(action.payload);
    },
  },
});

export default CartSlice.reducer;
export const { addItemToCart } = CartSlice.actions;
