import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangePasswordUserType,
  CreateUserType,
  DeleteUserType,
  GetUserType,
  UpdateUserType,
  UserType,
} from "./type";
import {
  addDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, userCollection, userDoc } from "@/config/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { failedNotify, successNotify } from "@/utils/utils";

const getOne = createAsyncThunk(
  "user/self",
  async (param: GetUserType, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getAll = createAsyncThunk(
  "user/get-all",
  async (param, { rejectWithValue }) => {
    try {
      const data = await getDocs(userCollection)
        .then((res) =>
          res.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phoneNum: doc.data().phoneNum,
            avatar: doc.data().avatar,
            role: doc.data().role === 0 ? "ROLE_USER" : "ROLE_ADMIN",
          }))
        )
        .catch((err) => rejectWithValue(err));

      return data;
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
      addDoc(userCollection, {
        email: param.email,
        password: param.password,
      }).catch((err) => rejectWithValue(err));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const update = createAsyncThunk(
  "user/update",
  async (param: UpdateUserType, { rejectWithValue }) => {
    try {
      const q = query(userCollection, where("email", "==", param.email));
      await new Promise((resolve) => {
        onSnapshot(q, (snapshot) => {
          const users: UserType[] = [];
          snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id } as UserType);
          });

          resolve(users);
        });
      }).then((res) => {
        if ((res as UserType[]).length <= 1) {
          updateDoc(userDoc((res as UserType[])[0].id), {
            name: param.name,
            avatar: param.avatar,
            email: param.email,
            phoneNum: param.phoneNum,
          }).catch((err) => rejectWithValue(err));
        }
      });
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
