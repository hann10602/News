import { RootState } from "../store";

export const isGettingNewsSelector = (state: RootState) =>
  state.news.isGettingNews;

export const isGettingNewsListSelector = (state: RootState) =>
  state.news.isGettingNewsList;

export const isGettingNewsLimitTenSelector = (state: RootState) =>
  state.news.isGettingNewsLimitTen;

export const isGettingNewsByCategorySelector = (state: RootState) =>
  state.news.isGettingNewsByCategory;

export const isGettingNewsBySearchSelector = (state: RootState) =>
  state.news.isGettingNewsBySearch;

export const isCreatingNewsSelector = (state: RootState) =>
  state.news.isCreatingNews;

export const isUpdatingNewsSelector = (state: RootState) =>
  state.news.isUpdatingNews;

export const isDeletingNewsSelector = (state: RootState) =>
  state.news.isDeletingNews;

export const newsSelector = (state: RootState) => state.news.news;

export const newsListSelector = (state: RootState) => state.news.newsList;

export const newsByCategorySelector = (state: RootState) =>
  state.news.newsByCategory;

export const newsBySearchSelector = (state: RootState) =>
  state.news.newsBySearch;

export const newsLimitTenSelector = (state: RootState) =>
  state.news.newsLimitTen;

export const newsResponseSelector = (state: RootState) => state.news.response;
