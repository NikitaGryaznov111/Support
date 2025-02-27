import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    setToken: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
