import { categoryDoc, newsCollection, newsDoc } from "@/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { CreateNewsType, DeleteNewsType, UpdateNewsType } from "../news/type";

const getOne = createAsyncThunk(
  "news/self",
  async (param, { rejectWithValue }) => {
    try {
      const data = await getDocs(newsCollection)
        .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        .catch((err) => rejectWithValue(err));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "news/get-all",
  async (param, { rejectWithValue }) => {
    try {
      const data = await getDocs(newsCollection)
        .then((res) =>
          res.docs.map((doc) => {
            const category = getDoc(categoryDoc(doc.data().categoryId)).then(
              (res) => res.data()?.name
            );

            return {
              id: doc.id,
              category: category,
              title: doc.data().title,
              content: doc.data().content,
              categoryId: doc.data().categoryId,
              createdDate: format(
                doc.data().createdDate.toDate(),
                "dd/MM/yyyy"
              ),
            };
          })
        )
        .catch((err) => rejectWithValue(err));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const create = createAsyncThunk(
  "news/create",
  async (param: CreateNewsType, { rejectWithValue }) => {
    try {
      return addDoc(newsCollection, {
        title: param.title,
        content: param.content,
        categoryId: param.categoryId,
        createdDate: param.createdDate,
      }).catch(() => rejectWithValue("Add news failed"));
    } catch (err) {
      return rejectWithValue("Add news failed");
    }
  }
);

const update = createAsyncThunk(
  "news/update",
  async (param: UpdateNewsType, { rejectWithValue }) => {
    try {
      return updateDoc(newsDoc(param.id), {
        title: param.title,
        content: param.content,
        categoryId: param.categoryId,
        createdDate: param.createdDate,
      }).catch(() => rejectWithValue("Update news failed"));
    } catch (err) {
      return rejectWithValue("Update news failed");
    }
  }
);

const deletes = createAsyncThunk(
  "news/delete",
  async (param: DeleteNewsType, { rejectWithValue }) => {
    try {
      return deleteDoc(newsDoc(param.id)).catch(() =>
        rejectWithValue("Delete news failed")
      );
    } catch (err) {
      return rejectWithValue("Delete news failed");
    }
  }
);

export const newsAsyncAction = { getOne, getAll, create, update, deletes };
