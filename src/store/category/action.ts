import { categoryCollection, db, newsCollection } from "@/config/firebase";
import {
  CategoryType,
  CreateCategoryType,
  DeleteCategoryType,
  GetCategoryType,
  UpdateCategoryType,
} from "@/store/category/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { NewsType } from "../news/type";

const categoryDoc = (id: string) => {
  return doc(categoryCollection, "category", id);
};

const getOne = createAsyncThunk(
  "category/self",
  async (param: GetCategoryType, { rejectWithValue }) => {
    try {
      const data = await getDocs(categoryCollection)
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
      const data = await getDocs(categoryCollection)
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
      const q = query(categoryCollection, where("code", "==", param.code));
      const data = await new Promise((resolve, reject) => {
        onSnapshot(q, (snapshot) => {
          const categories: CategoryType[] = [];
          snapshot.docs.forEach((doc) => {
            categories.push({ ...doc.data(), id: doc.id } as CategoryType);
          });

          resolve(categories);
        });
      })
        .then((res) => {
          if ((res as CategoryType[]).length === 0) {
            addDoc(categoryCollection, {
              name: param.name,
              code: param.code,
            }).catch(() => rejectWithValue("Add category failed"));
          } else {
            return rejectWithValue("Category is exist");
          }
        })
        .catch(() => rejectWithValue("Add category failed"));

      return data;
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
      const q = query(newsCollection, where("category_id", "==", param.id));
      const data = await new Promise((resolve, reject) => {
        onSnapshot(q, (snapshot) => {
          const news: NewsType[] = [];
          snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id } as NewsType);
          });

          console.log(news);
        });
      })
        .then((res) => {
          if ((res as NewsType[]).length === 0) {
            console.log("length = 0");
          } else {
            return rejectWithValue("This category exist news");
          }
        })
        .catch(() => rejectWithValue("Delete category failed"));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const categoryAsyncAction = { getOne, getAll, create, update, deletes };
