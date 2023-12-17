import Advert from "@/components/Page/Advert/Advert";
import Home from "@/components/Page/Web/Home/Home";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex">
      <Home />
      <div className="md:w-72 lg:w-96">
        <Advert />
      </div>
    </div>
  );
};

export default Page;
