import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import React from "react";

type Props = {
  size?: "small" | "medium" | "large";
  orientation?: "row" | "col";
};

const CardSkeleton = ({ size = "medium", orientation = "row" }: Props) => {
  return (
    <div className="mt-1">
      <Card className={`${orientation === "row" ? "flex" : ""} p-4 md:p-7`}>
        <Skeleton
          variant="rectangular"
          className={`
          ${size === "small" && "w-40 h-24"}
          ${size === "medium" && "w-60 h-40"}
          ${size === "large" && "w-[40%] md:w-[60%] h-[346px]"}`}
        />
        <CardContent className="flex-1">
          <div className={`h-full flex flex-col justify-between`}>
            <div>
              {size === "small" && (
                <>
                  <Skeleton variant="rounded" className="mb-2 h-4" />
                  <Skeleton variant="rounded" className="mb-4 h-4" />
                </>
              )}
              {size === "medium" && orientation === "row" && (
                <>
                  <Skeleton variant="rounded" className="mb-4 h-8" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </>
              )}
              {size === "large" && (
                <>
                  <Skeleton variant="rounded" className="mb-4 h-8" />
                  <Skeleton variant="rounded" className="mb-8 h-8" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </>
              )}
            </div>
            <Skeleton variant="text" className="w-40" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardSkeleton;
