import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: [],
  reducers: {
    getAll: (state, action) => (state = action.payload),
  },
});
export const { getAll } = albumSlice.reducer;
export default albumSlice.reducer;
