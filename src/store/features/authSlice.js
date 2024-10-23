import { createSlice } from "@reduxjs/toolkit";

//===> Define the initial State
const initialState = {
  isLoggedIn: true,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

//===> Export the Auth Reducer && Methods
export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
