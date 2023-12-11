
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangePasswordUserType,
  CreateUserType,
  DeleteUserType,
  GetUserType,
  UpdateUserType,
} from "./type";

const getOne = createAsyncThunk(
  "user/self",
  async (param: GetUserType, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .get(`/user/self/${param.id}`)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "user/get-all",
  async (param, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .get(`/user/get-all`)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const create = createAsyncThunk(
  "user/create",
  async (param: CreateUserType, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .post(`/auth/register`, param)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const update = createAsyncThunk(
  "user/update",
  async (param: UpdateUserType, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .put(`/user/update`, param)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const changePassword = createAsyncThunk(
  "user/change-password",
  async (param: ChangePasswordUserType, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .put(`/user/change-password`, param)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const deletes = createAsyncThunk(
  "user/delete",
  async (param: DeleteUserType, { rejectWithValue }) => {
    try {
    //   const resp = await baseAxios
    //     .delete(`/user/delete/${param.id}`)
    //     .then((res) => res)
    //     .catch((err) => err);

    //   if (resp.code === "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   } else if (resp.status === 200) {
    //     return resp.data;
    //   } else if (resp.code !== "ERR_NETWORK") {
    //     return rejectWithValue(resp);
    //   }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userAsyncAction = {
  getOne,
  getAll,
  changePassword,
  create,
  update,
  deletes,
};