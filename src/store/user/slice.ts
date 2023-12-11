import { createSlice } from "@reduxjs/toolkit";
import { userAsyncAction } from "./action";
import { UserType } from "./type";

type UserStateType = {
  isGettingUser: boolean;
  isGettingUsers: boolean;
  isChangingPasswordUsers: boolean;
  isCreatingUser: boolean;
  isUpdatingUser: boolean;
  isDeletingUser: boolean;
  user: UserType | undefined;
  users: UserType[];
};

const initialState: UserStateType = {
  isGettingUser: false,
  isGettingUsers: false,
  isChangingPasswordUsers: false,
  isCreatingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,
  user: undefined,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsyncAction.getOne.pending, (state) => {
        state.isGettingUser = true;
      })
      .addCase(userAsyncAction.getOne.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isGettingUser = false;
      })
      .addCase(userAsyncAction.getOne.rejected, (state, err: any) => {
        state.isGettingUser = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          state.user = undefined;
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(userAsyncAction.getAll.pending, (state) => {
        state.isGettingUsers = true;
      })
      .addCase(userAsyncAction.getAll.fulfilled, (state, action) => {
        state.users = action.payload || [];
        state.isGettingUsers = false;
      })
      .addCase(userAsyncAction.getAll.rejected, (state, err: any) => {
        state.isGettingUsers = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(userAsyncAction.create.pending, (state) => {
        state.isCreatingUser = true;
      })
      .addCase(userAsyncAction.create.fulfilled, (state, action) => {
        state.isCreatingUser = false;
      })
      .addCase(userAsyncAction.create.rejected, (state, err: any) => {
        state.isCreatingUser = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(userAsyncAction.update.pending, (state) => {
        state.isUpdatingUser = true;
      })
      .addCase(userAsyncAction.update.fulfilled, (state, action) => {
        state.isUpdatingUser = false;
      })
      .addCase(userAsyncAction.update.rejected, (state, err: any) => {
        state.isUpdatingUser = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(userAsyncAction.changePassword.pending, (state) => {
        state.isChangingPasswordUsers = true;
      })
      .addCase(userAsyncAction.changePassword.fulfilled, (state) => {
        state.isChangingPasswordUsers = false;
      })
      .addCase(userAsyncAction.changePassword.rejected, (state, err: any) => {
        state.isChangingPasswordUsers = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(userAsyncAction.deletes.pending, (state) => {
        state.isDeletingUser = true;
      })
      .addCase(userAsyncAction.deletes.fulfilled, (state, action) => {
        state.isDeletingUser = false;
      })
      .addCase(userAsyncAction.deletes.rejected, (state, err: any) => {
        state.isDeletingUser = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
