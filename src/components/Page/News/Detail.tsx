"use client";
import { newsAsyncAction } from "@/store/news/action";
import { isGettingNewsSelector, newsSelector } from "@/store/news/selector";
import { useAppDispatch } from "@/store/store";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Advert from "../Advert/Advert";
import SuggestNews from "./SuggestNews";
import DetailSkeleton from "@/components/Skeleton/DetailSkeleton";

type Props = {
  id: string;
};

const Detail = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const news = useSelector(newsSelector);
  const isGettingNews = useSelector(isGettingNewsSelector);

  useEffect(() => {
    dispatch(newsAsyncAction.getOne({ id }));
  }, []);

  return (
    <div className="md:flex">
      <div className="flex-1 p-8">
        {!isGettingNews && news ? (
          <Box>
            <div className="flex justify-between mb-2 text-gray-500">
              <Typography className="text-md md:text-lg">
                {news.category}
              </Typography>
              <Typography className="text-md md:text-lg">
                {news.createdDate}
              </Typography>
            </div>
            <Typography
              variant="h4"
              className="font-semibold line-clamp-2 mb-10"
            >
              {news.title}
            </Typography>
            <img src={news.image} alt="thumbnail" className="w-full mb-16" />
            <Typography className="text-lg leading-[160%]">
              {news.content}
            </Typography>
          </Box>
        ) : (
          <DetailSkeleton />
        )}
      </div>
      <div className="md:w-96">
        {news && <SuggestNews categoryId={news.categoryId} />}
        <Advert quantity={2} />
      </div>
    </div>
  );
};

export default Detail;
