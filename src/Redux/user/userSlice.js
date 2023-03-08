import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TOKEN, GET_USER, TOKEN_VALIDATE } from "../../api";

const initialState = {
  data: null,
  login: false,
  status: "idle", // | "pending" | "succeeded" | "failed"
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getUserData = (state) => state.user.data;
export const getLoginStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
