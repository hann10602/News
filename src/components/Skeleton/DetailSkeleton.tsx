import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const DetailSkeleton = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <Skeleton variant="text" className="w-14" />
        <Skeleton variant="text" className="w-40" />
      </div>
      <Skeleton variant="text" className="w-full h-20 mb-8" />
      <Skeleton variant="rectangular" className="w-full h-[500px] mb-20" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
      <Skeleton variant="text" className="w-full h-10" />
    </div>
  );
};

export default DetailSkeleton;
