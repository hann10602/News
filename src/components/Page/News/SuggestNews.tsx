"use client";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import { newsAsyncAction } from "@/store/news/action";
import {
  isGettingNewsByCategorySelector,
  newsByCategorySelector,
} from "@/store/news/selector";
import { useAppDispatch } from "@/store/store";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  categoryId: string;
};

const SuggestNews = ({ categoryId }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const newsByCategory = useSelector(newsByCategorySelector);
  const isGettingNewsByCategory = useSelector(isGettingNewsByCategorySelector);

  useEffect(() => {
    dispatch(newsAsyncAction.getByCategory({ categoryId }));
  }, []);

  return (
    <div className="p-4">
      <Typography className="text-xl md:text-lg font-semibold ml-2">
        Related news
      </Typography>
      {!isGettingNewsByCategory && newsByCategory ? (
        newsByCategory.map((news) => (
          <Card
            key={news.id}
            onClick={() => router.push(`/news/${news.id}`)}
            className="flex items-center mb-1 cursor-pointer p-2"
          >
            <CardMedia
              image={news.image}
              component="img"
              alt="thumbnails"
              className="w-36 md:w-24 h-28 md:h-24 rounded-sm"
            />
            <CardContent className="px-4 pt-2">
              <Typography className="line-clamp-2 mb-2 text-sm md:text-md font-semibold">
                {news.title}
              </Typography>
              <Typography
                variant="subtitle2"
                className="line-clamp-2 text-gray-400"
              >
                {news.createdDate}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          <CardSkeleton size="small" />
          <CardSkeleton size="small" />
          <CardSkeleton size="small" />
          <CardSkeleton size="small" />
          <CardSkeleton size="small" />
        </>
      )}
    </div>
  );
};

export default SuggestNews;
