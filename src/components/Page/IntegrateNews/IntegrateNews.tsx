"use client";
import IntegrateNewsModal from "@/components/Modal/IntegrateNewsModal/IntegrateNewsModal";
import { integrateNewsAsyncAction } from "@/store/integrate-news/action";
import {
  integrateNewsListSelector,
  isGettingIntegrateNewsListSelector,
} from "@/store/integrate-news/selector";
import { IntegrateNewsType } from "@/store/integrate-news/type";
import { useAppDispatch } from "@/store/store";
import { Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const IntegrateNews = (props: Props) => {
  const [page, setPage] = useState<number>(0);
  const [news, setNews] = useState<IntegrateNewsType | undefined>();

  const router = useRouter();

  const integrateNews = useSelector(integrateNewsListSelector);
  const isGettingIntegrateNews = useSelector(
    isGettingIntegrateNewsListSelector
  );

  const pagination = Array.from(
    { length: integrateNews.length / 10 },
    (_, id: number) => id + 1
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setNews(undefined);
  };

  useEffect(() => {
    dispatch(integrateNewsAsyncAction.getAll());
  }, []);

  return (
    <div>
      {news && (
        <Modal
          open={news ? true : false}
          onClose={handleClose}
          className="flex justify-center items-center"
        >
          <IntegrateNewsModal item={news} onClose={handleClose} />
        </Modal>
      )}
      {isGettingIntegrateNews || (
        <>
          {integrateNews.slice(page * 10, page * 10 + 10).map((news) => (
            <Card
              key={news.article_id}
              className="py-5 px-10 cursor-pointer"
              onClick={() => setNews(news)}
            >
              <CardContent className="flex">
                <CardMedia
                  className="object-cover w-52 rounded-sm mr-8 flex"
                  component="img"
                  alt="thumbnails"
                  image={news.image_url}
                />
                <div className="flex-1 w-full flex flex-col justify-between">
                  <div>
                    <Typography className="text-xl line-clamp-2 font-semibold mb-2">
                      {news.title}
                    </Typography>
                    <Typography className="line-clamp-2">
                      {news.description}
                    </Typography>
                  </div>
                  <div className="text-end text-lg text-gray-500">
                    <Typography>{news.category}</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center mt-5 gap-2">
            {pagination.map((item) => (
              <div
                key={item}
                className={`${
                  page + 1 === item
                    ? "bg-gray-400"
                    : "bg-gray-200 hover:bg-gray-300"
                } w-10 h-10 flex justify-center items-center cursor-pointer`}
                onClick={page + 1 === item ? () => {} : () => setPage(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IntegrateNews;
