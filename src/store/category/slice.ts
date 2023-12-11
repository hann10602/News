import { CategoryType } from "@/store/category/type";
import { createSlice } from "@reduxjs/toolkit";
import { categoryAsyncAction } from "./action";

type CategoryStateType = {
  isGettingCategory: boolean;
  isGettingCategories: boolean;
  isCreatingCategory: boolean;
  isUpdatingCategory: boolean;
  isDeletingCategory: boolean;
  category: CategoryType | undefined;
  categories: CategoryType[];
  response: ResponseType | undefined;
};

const initialState: CategoryStateType = {
  isGettingCategory: false,
  isGettingCategories: false,
  isCreatingCategory: false,
  isUpdatingCategory: false,
  isDeletingCategory: false,
  category: undefined,
  categories: [],
  response: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryAsyncAction.getOne.pending, (state) => {
        state.isGettingCategory = true;
      })
      .addCase(categoryAsyncAction.getOne.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isGettingCategory = false;
      })
      .addCase(categoryAsyncAction.getOne.rejected, (state, err: any) => {
        state.isGettingCategory = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(categoryAsyncAction.getAll.pending, (state) => {
        state.isGettingCategories = true;
      })
      .addCase(categoryAsyncAction.getAll.fulfilled, (state, action) => {
        state.categories = action.payload as CategoryType[];

        state.isGettingCategories = false;
      })
      .addCase(categoryAsyncAction.getAll.rejected, (state, err: any) => {
        state.isGettingCategories = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(categoryAsyncAction.create.pending, (state) => {
        state.isCreatingCategory = true;
      })
      .addCase(categoryAsyncAction.create.fulfilled, (state, action) => {
        state.response = action.payload;
        state.isCreatingCategory = false;
      })
      .addCase(categoryAsyncAction.create.rejected, (state, err: any) => {
        state.isCreatingCategory = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(categoryAsyncAction.update.pending, (state) => {
        state.isUpdatingCategory = true;
      })
      .addCase(categoryAsyncAction.update.fulfilled, (state, action) => {
        state.response = action.payload;
        state.isUpdatingCategory = false;
      })
      .addCase(categoryAsyncAction.update.rejected, (state, err: any) => {
        state.isUpdatingCategory = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
    builder
      .addCase(categoryAsyncAction.deletes.pending, (state) => {
        state.isDeletingCategory = true;
      })
      .addCase(categoryAsyncAction.deletes.fulfilled, (state, action) => {
        state.response = action.payload;
        state.isDeletingCategory = false;
      })
      .addCase(categoryAsyncAction.deletes.rejected, (state, err: any) => {
        state.isDeletingCategory = false;
        if (err.payload.code === "ERR_NETWORK") {
          localStorage.removeItem("jwt");
          throw new Error(err.payload.code as string);
        } else {
          throw new Error(err.payload.code as string);
        }
      });
  },
});

export const categoryReducer = categorySlice.reducer;
