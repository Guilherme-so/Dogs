import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TOKEN, GET_USER, TOKEN_VALIDATE } from "../../api";

export const autoLogin = createAsyncThunk(
  "user/autoLogin",
  async (_, thunkAPI) => {
    const token = window.localStorage.getItem("token");
    const { url, options } = TOKEN_VALIDATE(token);
    if (token) {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

      } catch (err) {
        thunkAPI.dispatch(userLogout());
      }
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const token = window.localStorage.getItem("token");
  const { url, options } = GET_USER(token);
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Erro na busca de dados do usuario");
    const data = await response.json();
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userData, thunkAPI) => {
    const { url, options } = GET_TOKEN(userData);
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Usuario ou senha invalida");
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      getUser();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  data: null,
  login: false,
  status: "idle", // | "pending" | "succeeded" | "failed"
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = null;
      state.login = false;
      state.status = "idle";
      state.error = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.login = true;
        state.status = "succeeded";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const getUserData = (state) => state.user.data;
export const getLoginStatus = (state) => state.user.status;
export const IsloggedIn = (state) => state.user.login;
export const getError = (state) => state.user.error;

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
