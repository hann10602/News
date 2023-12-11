import {
  CreateCategoryType,
  DeleteCategoryType,
  GetCategoryType,
  UpdateCategoryType,
} from "@/store/category/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";

const dbCollection = collection(db, "category");

const getOne = createAsyncThunk(
  "category/self",
  async (param: GetCategoryType, { rejectWithValue }) => {
    try {
      // const resp = await baseAxios
      //   .get(`/category/self/${param.id}`)
      //   .then((res) => res)
      //   .catch((err) => err);
      // if (resp.code === "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // } else if (resp.status === 200) {
      //   return resp.data;
      // } else if (resp.code !== "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "category/get-all",
  async (param, { rejectWithValue }) => {
    try {
      await getDocs(dbCollection)
        .then((res) => res)
        .catch((err) => rejectWithValue(err));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const create = createAsyncThunk(
  "category/create",
  async (param: CreateCategoryType, { rejectWithValue }) => {
    try {
      // const resp = await baseAxios
      //   .post(`/category/create`, param)
      //   .then((res) => res)
      //   .catch((err) => err);
      // if (resp.code === "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // } else if (resp.status === 200) {
      //   return resp.data;
      // } else if (resp.code !== "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const update = createAsyncThunk(
  "category/update",
  async (param: UpdateCategoryType, { rejectWithValue }) => {
    try {
      // const resp = await baseAxios
      //   .put(`/category/update`, param)
      //   .then((res) => res)
      //   .catch((err) => err);
      // if (resp.code === "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // } else if (resp.status === 200) {
      //   return resp.data;
      // } else if (resp.code !== "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const deletes = createAsyncThunk(
  "category/delete",
  async (param: DeleteCategoryType, { rejectWithValue }) => {
    try {
      // const resp = await baseAxios
      //   .delete(`/category/delete/${param.id}`)
      //   .then((res) => res)
      //   .catch((err) => err);
      // if (resp.code === "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // } else if (resp.status === 200) {
      //   return resp.data;
      // } else if (resp.code !== "ERR_NETWORK") {
      //   return rejectWithValue(resp);
      // }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const categoryAsyncAction = { getOne, getAll, create, update, deletes };
