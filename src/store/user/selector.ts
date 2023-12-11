import { RootState } from "../store";

export const isGettingUserSelector = (state: RootState) =>
  state.user.isGettingUser;

export const isGettingUsersSelector = (state: RootState) =>
  state.user.isGettingUsers;

export const isChangingPasswordUserSelector = (state: RootState) =>
  state.user.isChangingPasswordUsers;

export const isCreatingUserSelector = (state: RootState) =>
  state.user.isCreatingUser;

export const isUpdatingUserSelector = (state: RootState) =>
  state.user.isUpdatingUser;

export const isDeletingUserSelector = (state: RootState) =>
  state.user.isDeletingUser;

export const userSelector = (state: RootState) => state.user.user;

export const usersSelector = (state: RootState) => state.user.users;