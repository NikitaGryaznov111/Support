import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setText(state, action: PayloadAction<string>) {
      return (state = action.payload);
    },
  },
});

export const { setText } = searchSlice.actions;
export default searchSlice.reducer;
