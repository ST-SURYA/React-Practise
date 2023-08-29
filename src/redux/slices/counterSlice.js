import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    add: (state, action) => state + action.payload,
    sub: (state) => state - 1,
  },
});
export const { add, sub } = counter.actions;
export default counter.reducer;
