import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const SearchResultSkeleton = (props: Props) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Skeleton variant="text" className="mb-2 h-8" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-20 mt-2" />
      </div>
      <Skeleton variant="rectangular" className="w-60 h-40 ml-5" />
    </div>
  );
};

export default SearchResultSkeleton;
