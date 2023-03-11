import axios from "../../components/Helpers/customAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
