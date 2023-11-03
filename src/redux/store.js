import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import contextSlice from "./slices/contextSlice";
import toggleSlice from "./slices/toggleSlice.js";
import pageSlice from "./slices/pageSlice";
import albumSlice from "./slices/albumSlice";
import { dataApi } from "./services/dataQuery"; // Import the `dataApi` object
import thunk from "redux-thunk";

const loggingMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  console.log("Current State:", store.getState());

  if (action.type === "counter/custom") {
    const currentValue = action.payload;
    console.log("action", action);
    console.log("currentValue", currentValue);
    return next({
      type: "counter/custom",
      payload: {
        value: parseInt(currentValue.value) || 0,
        operator: currentValue.operator || "+",
      },
    });
  }

  const result = next(action);

  console.log("Next State:", store.getState());
  return result;
};

export default configureStore({
  reducer: {
    counter,
    contextSlice,
    toggleSlice,
    pageSlice,
    albumSlice,
    [dataApi.reducerPath]: dataApi.reducer, // Add the reducer from dataApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loggingMiddleware,
      dataApi.middleware, // Add the RTK-Query middleware
      thunk
    ),
  preloadedState: {
    counter: 5,
    contextSlice: { value: "Hii" },
    toggleSlice: false,
  },
});
