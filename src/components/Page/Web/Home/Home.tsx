"use client";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsLimitTenSelector,
  newsLimitTenSelector,
} from "@/store/news/selector";
import React from "react";
import { useAppDispatch } from "@/store/store";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
          <Card className="flex p-7">
            <CardMedia
              className="object-cover w-[60%] rounded-sm mr-2 flex cursor-pointer"
              component="img"
              alt="thumbnails"
              image={newsList[0].image}
              onClick={() => router.push(`news?id=${newsList[0].id}`)}
            />
            <CardContent>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <Typography
                    variant="h5"
                    className="mb-7 line-clamp-2 font-semibold cursor-pointer"
                    onClick={() => router.push(`news?id=${newsList[0].id}`)}
                  >
                    {newsList[0].title}
                  </Typography>
                  <Typography variant="body1" className="line-clamp-5">
                    {newsList[0].content}
                  </Typography>
                </div>
                <Typography variant="body1" className="text-gray-400">
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
                  onClick={() => router.push(`news?id=${news.id}`)}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    className="mb-7 line-clamp-2 font-semibold cursor-pointer"
                    onClick={() => router.push(`news?id=${news.id}`)}
                  >
                    {news.title}
                  </Typography>
                  <Typography variant="body2" className="line-clamp-4">
                    {news.content}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="text-gray-400 mt-5"
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
                onClick={() => router.push(`news?id=${news.id}`)}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  className="mb-3 line-clamp-2 font-semibold cursor-pointer"
                  onClick={() => router.push(`news?id=${news.id}`)}
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
        <div className="flex-1"></div>
      )}
    </div>
  );
};

export default Home;
