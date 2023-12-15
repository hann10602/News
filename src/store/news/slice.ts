import { createSlice } from "@reduxjs/toolkit";
import { NewsType } from "./type";
import { newsAsyncAction } from "./action";

type NewsStateType = {
  isGettingNews: boolean;
  isGettingNewsList: boolean;
  isGettingNewsLimitTen: boolean;
  isCreatingNews: boolean;
  isUpdatingNews: boolean;
  isDeletingNews: boolean;
  news: NewsType | undefined;
  newsList: NewsType[];
  newsLimitTen: NewsType[];
  response: ResponseType | undefined;
};

const initialState: NewsStateType = {
  isGettingNews: false,
  isGettingNewsList: false,
  isGettingNewsLimitTen: false,
  isCreatingNews: false,
  isUpdatingNews: false,
  isDeletingNews: false,
  news: undefined,
  newsList: [],
  newsLimitTen: [],
  response: undefined,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsAsyncAction.getOne.pending, (state) => {
        state.isGettingNewsList = true;
      })
      .addCase(newsAsyncAction.getOne.fulfilled, (state, action) => {
        state.news = action.payload as unknown as NewsType;

        state.isGettingNewsList = false;
      })
      .addCase(newsAsyncAction.getOne.rejected, (state, err: any) => {
        state.isGettingNewsList = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(newsAsyncAction.getAll.pending, (state) => {
        state.isGettingNewsList = true;
      })
      .addCase(newsAsyncAction.getAll.fulfilled, (state, action) => {
        state.newsList = action.payload as NewsType[];

        state.isGettingNewsList = false;
      })
      .addCase(newsAsyncAction.getAll.rejected, (state, err: any) => {
        state.isGettingNewsList = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(newsAsyncAction.getLimitTen.pending, (state) => {
        state.isGettingNewsLimitTen = true;
      })
      .addCase(newsAsyncAction.getLimitTen.fulfilled, (state, action) => {
        state.newsLimitTen = action.payload as NewsType[];

        state.isGettingNewsLimitTen = false;
      })
      .addCase(newsAsyncAction.getLimitTen.rejected, (state, err: any) => {
        state.isGettingNewsLimitTen = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(newsAsyncAction.create.pending, (state) => {
        state.isCreatingNews = true;
      })
      .addCase(newsAsyncAction.create.fulfilled, (state, action) => {
        state.isCreatingNews = false;
      })
      .addCase(newsAsyncAction.create.rejected, (state, err: any) => {
        state.isCreatingNews = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(newsAsyncAction.update.pending, (state) => {
        state.isUpdatingNews = true;
      })
      .addCase(newsAsyncAction.update.fulfilled, (state) => {
        state.isUpdatingNews = false;
      })
      .addCase(newsAsyncAction.update.rejected, (state, err: any) => {
        state.isUpdatingNews = false;
        throw new Error(err.payload as string);
      });
    builder
      .addCase(newsAsyncAction.deletes.pending, (state) => {
        state.isDeletingNews = true;
      })
      .addCase(newsAsyncAction.deletes.fulfilled, (state) => {
        state.isDeletingNews = false;
      })
      .addCase(newsAsyncAction.deletes.rejected, (state, err: any) => {
        state.isDeletingNews = false;
        throw new Error(err.payload as string);
      });
  },
});

export const newsReducer = newsSlice.reducer;
