import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "./global/globalSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
setupListeners(store.dispatch);

export default store;
