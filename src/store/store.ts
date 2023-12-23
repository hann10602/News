import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userReducer } from "./user/slice";
import { newsReducer } from "./news/slice";
import { categoryReducer } from "./category/slice";
import { integrateNewsReducer } from "./integrate-news/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    news: newsReducer,
    integrateNews: integrateNewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;

export default store;
