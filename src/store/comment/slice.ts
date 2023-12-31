import { CategoryType } from "@/store/category/type";
import { createSlice } from "@reduxjs/toolkit";
import { categoryAsyncAction } from "./action";

type CategoryStateType = {
  isGettingCategories: boolean;
  isCreatingCategory: boolean;
  isUpdatingCategory: boolean;
  isDeletingCategory: boolean;
  category: CategoryType | undefined;
  categories: CategoryType[];
  response: ResponseType | undefined;
};

const initialState: CategoryStateType = {
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
      .addCase(categoryAsyncAction.getAll.pending, (state) => {
        state.isGettingCategories = true;
      })
      .addCase(categoryAsyncAction.getAll.fulfilled, (state, action) => {
        state.categories = action.payload as CategoryType[];

        state.isGettingCategories = false;
      })
      .addCase(categoryAsyncAction.getAll.rejected, (state, err: any) => {
        state.isGettingCategories = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(categoryAsyncAction.create.pending, (state) => {
        state.isCreatingCategory = true;
      })
      .addCase(categoryAsyncAction.create.fulfilled, (state, action) => {
        state.isCreatingCategory = false;
      })
      .addCase(categoryAsyncAction.create.rejected, (state, err: any) => {
        state.isCreatingCategory = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(categoryAsyncAction.update.pending, (state) => {
        state.isUpdatingCategory = true;
      })
      .addCase(categoryAsyncAction.update.fulfilled, (state) => {
        state.isUpdatingCategory = false;
      })
      .addCase(categoryAsyncAction.update.rejected, (state, err: any) => {
        state.isUpdatingCategory = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(categoryAsyncAction.deletes.pending, (state) => {
        state.isDeletingCategory = true;
      })
      .addCase(categoryAsyncAction.deletes.fulfilled, (state) => {
        state.isDeletingCategory = false;
      })
      .addCase(categoryAsyncAction.deletes.rejected, (state, err: any) => {
        state.isDeletingCategory = false;
        throw new Error(err.payload as string);
      });
  },
});

export const categoryReducer = categorySlice.reducer;
