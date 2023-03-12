import axios from "../../components/Helpers/customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

export const Login = createAsyncThunk("auth/Login", async (data, thunkAPI) => {
  try {
    const response = await axios.post("/jwt-auth/v1/token", data);
    window.location.replace("/conta");
    return response.data;
  } catch (err) {
    console.log("err", err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const getUserData = createAsyncThunk(
  "auth/GetUserData",
  async (_, thunk) => {
    const state = thunk.getState();
    if (state.auth.token) {
      try {
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        });
        return response.data;
      } catch (error) {
        return thunk.rejectWithValue(error);
      }
    }
  }
);

export const autoLogin = createAsyncThunk(
  "auth/autoLogin",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.token) {
      try {
        const response = await axios.post("/jwt-auth/v1/token/validate");
        dispatch(getUserData());
      } catch (error) {
        dispatch(logout());
        rejectWithValue(error.response.data.code);
      }
    }
  }
);

export const cadastre = createAsyncThunk(
  "auth/cadastreUser",
  async (data, { rejectWithValue, dispatch }) => {
    const { username, password } = data;
    try {
      const response = await axios.post("/api/user", data);
      if (response.status) {
        dispatch(Login({ username: username, password: password }));
      }
      return response.data;
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
