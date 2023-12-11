import { db } from "@/config/firebase";
import {
  CreateCategoryType,
  DeleteCategoryType,
  GetCategoryType,
  UpdateCategoryType,
} from "@/store/category/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, where, onSnapshot } from "firebase/firestore";

const dbCollection = collection(db, "category");

const categoryDoc = (id: string) => {
  return doc(dbCollection, "category", id)
} 

const getOne = createAsyncThunk(
  "category/self",
  async (param: GetCategoryType, { rejectWithValue }) => {
    try {
      const data = await getDocs(dbCollection)
        .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        .catch((err) => rejectWithValue(err));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "category/get-all",
  async (param, { rejectWithValue }) => {
    try {
      const data = await getDocs(dbCollection)
        .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        .catch((err) => rejectWithValue(err));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const create = createAsyncThunk(
  "category/create",
  async (param: CreateCategoryType, { rejectWithValue }) => {
    try {
      const existCategory = query(dbCollection, where("code", "==", param.code));
      console.log(existCategory)
      // const data = 
      //   .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      //   .catch((err) => rejectWithValue(err));

      // return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const update = createAsyncThunk(
  "category/update",
  async (param: UpdateCategoryType, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const deletes = createAsyncThunk(
  "category/delete",
  async (param: DeleteCategoryType, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const categoryAsyncAction = { getOne, getAll, create, update, deletes };
