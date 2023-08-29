import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import contextSlice from "./slices/contextSlice";
const loggingMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  console.log("Current State:", store.getState());

  if (action.type === "counter/add") {
    const currentValue = action.payload;
    return next({ type: "counter/add", payload: currentValue + 1 });
  }

  const result = next(action);

  console.log("Next State:", store.getState());
  return result;
};

export default configureStore({
  reducer: {
    counter,
    contextSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggingMiddleware),
  preloadedState: {
    counter: 5,
    contextSlice: { value: "Hii" },
  },
});
