"use client";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsByCategorySelector,
  newsByCategorySelector,
} from "@/store/news/selector";
import { useAppDispatch } from "@/store/store";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Advert from "../Advert/Advert";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

type Props = {
  id: string;
  name: string;
};

const Category = ({ id, name }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const newsByCategory = useSelector(newsByCategorySelector);
  const isGettingNewsByCategory = useSelector(isGettingNewsByCategorySelector);

  useEffect(() => {
    dispatch(newsAsyncAction.getByCategory({ categoryId: id }));
  }, []);

  return (
    <div className="mt-10">
      <Typography className="text-3xl font-semibold mx-6 border-b border-solid border-gray-300">
        {name}
      </Typography>
      <div className="flex">
        <div className="flex-1">
          {!isGettingNewsByCategory ? (
            <div>
              <Card className="md:flex p-4 md:p-7">
                <CardMedia
                  className="object-cover md:w-[52%] rounded-sm mr-2 flex cursor-pointer"
                  component="img"
                  alt="thumbnails"
                  image={newsByCategory[0]?.image}
                  onClick={() => router.push(`/news/${newsByCategory[0]?.id}`)}
                />
                <CardContent>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <Typography
                        className="lg:mb-7 mb-2 line-clamp-2 text-xl md:text-2xl font-semibold cursor-pointer"
                        onClick={() =>
                          router.push(`/news/${newsByCategory[0]?.id}`)
                        }
                      >
                        {newsByCategory[0]?.title}
                      </Typography>
                      <Typography className="line-clamp-5 text-md md:text-lg">
                        {newsByCategory[0]?.content}
                      </Typography>
                    </div>
                    <Typography variant="body1" className="text-gray-400 mt-2">
                      {newsByCategory[0]?.createdDate}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              {newsByCategory.slice(1).map((news) => (
                <Card key={news.id} className="flex p-4 mt-2 items-center">
                  <CardMedia
                    className="object-cover w-48 md:w-60 h-36 md:h-40 rounded-sm mr-4 cursor-pointer"
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
                    <Typography
                      variant="subtitle2"
                      className="text-gray-400 mt-2"
                    >
                      {news.createdDate}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex-1">
              <CardSkeleton size="large" />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}
        </div>
        <div className="md:w-72 lg:w-96">
          <Advert />
        </div>
      </div>
    </div>
  );
};

export default Category;
