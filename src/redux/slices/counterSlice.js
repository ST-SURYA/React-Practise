import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    add: (state, action) => state + action.payload,
    sub: (state) => state - 1,
    custom: (state, action) => {
      if (action.payload.operator === "+") {
        return (state += action.payload.value);
      }
      if (action.payload.operator === "-") {
        return (state -= action.payload.value);
      }
    },
  },
});
export const { add, sub, custom } = counter.actions;
export default counter.reducer;
