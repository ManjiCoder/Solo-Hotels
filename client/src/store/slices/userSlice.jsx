import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    login(state, action) {},
    signup(state, action) {},
  },
});
export const { login, signup } = userSlice.actions;
export default userSlice;
