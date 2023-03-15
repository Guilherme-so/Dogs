import { createSlice } from "@reduxjs/toolkit";
import {
  Login,
  getUserData,
  autoLogin,
  cadastre,
  postFoto,
  fotos_Get,
  foto_Get,
  foto_comment,
  foto_delete,
} from "./authAsyncActions";

const initialState = {
  data: null,
  login: false,
  token: window.localStorage.getItem("token") ?? null,
  status: "idle", // | "pending" | "succeeded" | "failed"
  error: null,
  fotos: null,
  modal: null,
  modalData: null,
  modalError: null,
  modalStatus: "idle", // | "pending" | "succeeded" | "failed"
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
    setModalOpen: (state, action) => {
      state.modal = action.payload;
    },
    setModalClose: (state, action) => {
      state.modal = null;
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
      })
      .addCase(fotos_Get.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fotos_Get.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fotos = action.payload;
      })
      .addCase(fotos_Get.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action.payload);
      })
      .addCase(foto_Get.pending, (state, action) => {
        state.modalStatus = "pending";
      })
      .addCase(foto_Get.fulfilled, (state, action) => {
        state.modalStatus = "succeeded";
        state.modalData = action.payload;
      })
      .addCase(foto_Get.rejected, (state, action) => {
        state.modalStatus = "rejected";
        state.modalError = action.payload.message;
      })
      .addCase(foto_comment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(foto_comment.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action.payload);
      })
      .addCase(foto_delete.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(foto_delete.fulfilled, (state, action) => {
        state.status = "succeeded";
        window.location.reload();
      })
      .addCase(foto_delete.rejected, (state, action) => {
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
export const selectGetFotos = (state) => state.auth.fotos;
export const selectGetModal = (state) => state.auth.modal;
export const selectGetModalData = (state) => state.auth.modalData;
export const selectGetModalError = (state) => state.auth.modalError;
export const selectGetModalStatus = (state) => state.auth.modalStatus;

export const { logout, setModalOpen, setModalClose } = userSlice.actions;
export default userSlice.reducer;
