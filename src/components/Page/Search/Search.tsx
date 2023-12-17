"use client";
import SearchResultSkeleton from "@/components/Skeleton/SearchResultSkeleton";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsBySearchSelector,
  newsBySearchSelector,
} from "@/store/news/selector";
import { NewsType } from "@/store/news/type";
import { useAppDispatch } from "@/store/store";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Search = (props: Props) => {
  const newsBySearch = useSelector(newsBySearchSelector);
  const isGettingNewsBySearch = useSelector(isGettingNewsBySearchSelector);

  const [news, setNews] = useState<NewsType[]>([]);

  const params = useSearchParams();
  const searchParam = params.get("search");

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParam) {
      dispatch(newsAsyncAction.getBySearch({ search: searchParam }));
    }
  }, []);

  useEffect(() => {
    if (searchParam) {
      setNews(
        newsBySearch.filter((news) =>
          news.title.toUpperCase().includes(searchParam.toUpperCase())
        )
      );
    }
  }, [newsBySearch]);

  return (
    <div className="flex-1 px-6 pt-10">
      <Typography className="text-3xl font-semibold border-b mb-8 border-solid border-gray-300">
        Search: {searchParam}
      </Typography>
      {!isGettingNewsBySearch && newsBySearch.length === 0 && (
        <Typography className="mt-5 text-lg">Not found</Typography>
      )}
      {!isGettingNewsBySearch && newsBySearch ? (
        news.map((news) => (
          <Card
            key={news.id}
            onClick={() => router.push(`/news/${news.id}`)}
            className="flex items-center mb-1 cursor-pointer p-2"
          >
            <CardContent className="px-4 pt-2 flex-1">
              <Typography className="line-clamp-2 mb-2 text-xl font-semibold">
                {news.title}
              </Typography>
              <Typography variant="subtitle2" className="line-clamp-2">
                {news.content}
              </Typography>
              <Typography
                variant="subtitle2"
                className="line-clamp-2 text-gray-400"
              >
                {news.createdDate}
              </Typography>
            </CardContent>
            <CardMedia
              image={news.image}
              component="img"
              alt="thumbnails"
              className="w-36 md:w-56 h-28 md:h-36 rounded-sm"
            />
          </Card>
        ))
      ) : (
        <div className="space-y-3">
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
        </div>
      )}
    </div>
  );
};

export default Search;
