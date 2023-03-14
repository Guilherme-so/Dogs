import { createSlice } from "@reduxjs/toolkit";
import {
  Login,
  getUserData,
  autoLogin,
  cadastre,
  postFoto,
} from "./authAsyncActions";

const initialState = {
  data: null,
  login: false,
  token: window.localStorage.getItem("token") ?? null,
  status: "idle", // | "pending" | "succeeded" | "failed"
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
      state.login = false;
      localStorage.clear();
      window.location.replace("/login");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state, action) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = true;
        state.token = action.payload.token;
        window.localStorage.setItem("token", action.payload.token);
        window.location.replace("/conta");

      })
      .addCase(Login.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Usuario ou senha incorreto";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(autoLogin.pending, (state, action) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = true;
      })
      .addCase(cadastre.pending, (state, action) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(cadastre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = true;
      })
      .addCase(cadastre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(postFoto.pending, (state, action) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(postFoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        window.location.href = "/conta";
      })
      .addCase(postFoto.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectUserData = (state) => state.auth.data;
export const selectUserStatus = (state) => state.auth.status;
export const selectUserError = (state) => state.auth.error;
export const selectIsLoggedIn = (state) => state.auth.login;
export const selectUserToken = (state) => state.auth.token;

export const { logout } = userSlice.actions;
export default userSlice.reducer;
