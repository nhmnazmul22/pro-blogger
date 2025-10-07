//====> External Imports <=====
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./features/authSlice";

//====> Create Store <=====
const store = configureStore({
  reducer: reducer,
});

//====> Export Store <=====
export default store;
