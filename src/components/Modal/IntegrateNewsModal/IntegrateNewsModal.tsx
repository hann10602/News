import { IntegrateNewsType } from "@/store/integrate-news/type";
import { Close } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import React from "react";

type Props = {
  item: IntegrateNewsType;
  onClose: () => void;
};

const IntegrateNewsModal = ({ item, onClose }: Props) => {
  return (
    <Card className="w-[1000px] h-[800px] overflow-auto bg-white rounded-sm p-10">
      <div className="w-full flex justify-end" onClick={onClose}>
        <Close className="cursor-pointer hover:bg-gray-200 rounded-full h-10 w-10 p-2" />
      </div>
      <Typography className="text-4xl font-semibold flex justify-center mb-2">
        {item.title}
      </Typography>
      <Typography className="w-full flex justify-end text-lg text-gray-500 mb-8">
        {item.category}
      </Typography>
      <CardMedia
        className="object-cover w-full rounded-sm mb-10 flex"
        component="img"
        alt="thumbnails"
        image={item.image_url}
      />
      <Typography className="text-xl">{item.content}</Typography>
    </Card>
  );
};

export default IntegrateNewsModal;
