import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userReducer } from "./user/slice";
import { categoryReducer } from "./category/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;

export default store;
