import { RootState } from "../store";

export const isGettingCategorySelector = (state: RootState) =>
  state.category.isGettingCategory;

export const isGettingCategoriesSelector = (state: RootState) =>
  state.category.isGettingCategories;

export const isCreatingCategorySelector = (state: RootState) =>
  state.category.isCreatingCategory;

export const isUpdatingCategorySelector = (state: RootState) =>
  state.category.isUpdatingCategory;

export const isDeletingCategorySelector = (state: RootState) =>
  state.category.isDeletingCategory;

export const categorySelector = (state: RootState) => state.category.category;

export const categoriesSelector = (state: RootState) =>
  state.category.categories;

export const categoryResponseSelector = (state: RootState) =>
  state.category.response;