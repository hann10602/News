import { categoryCollection, categoryDoc, newsCollection } from "@/config/firebase";
import {
  CategoryType,
  CreateCategoryType,
  DeleteCategoryType,
  UpdateCategoryType
} from "@/store/category/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { NewsType } from "../news/type";

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
      return rejectWithValue("Add category failed");
    }
  }
);

const update = createAsyncThunk(
  "category/update",
  async (param: UpdateCategoryType, { rejectWithValue }) => {
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
          if ((res as CategoryType[]).length <= 1) {
            updateDoc(categoryDoc(param.id), {
              name: param.name,
              code: param.code,
            }).catch(() => rejectWithValue("Update category failed"));
          } else {
            return rejectWithValue("Category is exist");
          }
        })
        .catch(() => rejectWithValue("Update category failed"));

      return data;
    } catch (err) {
      return rejectWithValue("Update category failed");
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

          resolve(news);
        });
      })
        .then((res) => {
          if ((res as NewsType[]).length === 0) {
            deleteDoc(categoryDoc(param.id)).catch(() =>
              rejectWithValue("Delete category failed")
            );
          } else {
            return rejectWithValue("This category exist news");
          }
        })
        .catch((err) => {
          console.log(err);
          return rejectWithValue("Delete category failed");
        });

      return data;
    } catch (err) {
      return rejectWithValue("Delete category failed");
    }
  }
);

export const categoryAsyncAction = { getAll, create, update, deletes };
