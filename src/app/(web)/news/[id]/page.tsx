import Detail from "@/components/Page/News/Detail";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  return (
    <div>
      <Detail id={id} />
    </div>
  );
};

export default Page;
