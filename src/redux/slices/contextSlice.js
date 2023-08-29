import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
  name: "contextSlice",
  initialState: { value: 0 },
  reducers: {
    setContextValue: (state, action) => {
      console.log(action);
      state.value = action.payload.value;
    },
  },
});

export const { setContextValue } = contextSlice.actions;
export default contextSlice.reducer;
