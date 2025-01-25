import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  loginToastId: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  loginToastId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set user after login
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    // clear user info after logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },

    // set login toast id
    setLoginToastId: (state, action) => {
      state.loginToastId = action.payload;
    },
  },
});

export default authSlice;
export const { setUser, logout, setLoginToastId } = authSlice.actions;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectLoginToastId = (state: RootState) => state.auth.loginToastId;
