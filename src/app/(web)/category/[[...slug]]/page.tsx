import Category from "@/components/Page/Category/Category";
import React from "react";

type Props = {
  params: { slug: [id: string, name: string] };
};

const Page = ({ params }: Props) => {
  const { slug } = params;
  return <div>
    <Category id={slug[0]} name={slug[1]} />
    </div>;
};

export default Page;
