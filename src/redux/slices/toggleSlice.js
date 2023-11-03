import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: false,
  reducers: {
    toggle: (state) => (state = !state),
  },
});
export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
