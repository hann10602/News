"use client";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsLimitTenSelector,
  newsLimitTenSelector,
} from "@/store/news/selector";
import React from "react";
import { useAppDispatch } from "@/store/store";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const newsList = useSelector(newsLimitTenSelector);
  const isGettingNewsList = useSelector(isGettingNewsLimitTenSelector);

  useEffect(() => {
    dispatch(newsAsyncAction.getLimitTen());
  }, []);

  return (
    <div className="flex-1">
      {!isGettingNewsList && newsList.length !== 0 ? (
        <div>
          <Card className="flex p-4 md:p-7">
            <CardMedia
              className="object-cover w-[40%] md:w-[60%] rounded-sm mr-2 flex cursor-pointer"
              component="img"
              alt="thumbnails"
              image={newsList[0].image}
              onClick={() => router.push(`/news/${newsList[0].id}`)}
            />
            <CardContent>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Typography
                    className="lg:mb-7 mb-2 line-clamp-2 text-lg md:text-2xl font-semibold cursor-pointer"
                    onClick={() => router.push(`/news/${newsList[0].id}`)}
                  >
                    {newsList[0].title}
                  </Typography>
                  <Typography className="line-clamp-5 text-sm md:text-md">
                    {newsList[0].content}
                  </Typography>
                </div>
                <Typography variant="body1" className="text-gray-400 mt-2">
                  {newsList[0].createdDate}
                </Typography>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-2">
            {newsList.slice(1, 4).map((news) => (
              <Card key={news.id} className="p-4 w-[33%]">
                <CardMedia
                  className="object-cover w-full rounded-sm h-52 mr-4 cursor-pointer"
                  component="img"
                  alt="thumbnails"
                  image={news.image}
                  onClick={() => router.push(`/news/${news.id}`)}
                />
                <CardContent>
                  <Typography
                    className="md:mb-7 mb-2 text-md md:text-lg line-clamp-2 font-semibold cursor-pointer"
                    onClick={() => router.push(`/news/${news.id}`)}
                  >
                    {news.title}
                  </Typography>
                  <Typography className="line-clamp-4 text-sm md:text-md">
                    {news.content}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="text-gray-400 md:mt-5 mt-2"
                  >
                    {news.createdDate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          {newsList.slice(4, 11).map((news) => (
            <Card key={news.id} className="flex p-4 mt-2">
              <CardMedia
                className="object-cover w-60 h-40 rounded-sm mr-4 cursor-pointer"
                component="img"
                alt="thumbnails"
                image={news.image}
                onClick={() => router.push(`/news/${news.id}`)}
              />
              <CardContent>
                <Typography
                  className="mb-3 text-md md:text-xl line-clamp-2 font-semibold cursor-pointer"
                  onClick={() => router.push(`/news/${news.id}`)}
                >
                  {news.title}
                </Typography>
                <Typography variant="body2" className="line-clamp-3">
                  {news.content}
                </Typography>
                <Typography variant="subtitle2" className="text-gray-400 mt-2">
                  {news.createdDate}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex-1">
          <CardSkeleton size="large" />
          <div className="flex mt-2 mb-10 w-full justify-between">
            <CardSkeleton orientation="col" />
            <CardSkeleton orientation="col" />
            <CardSkeleton orientation="col" />
          </div>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  );
};

export default Home;
