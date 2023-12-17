import Advert from "@/components/Page/Advert/Advert";
import Search from "@/components/Page/Search/Search";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="md:flex">
      <Search />
      <div className="w-96">
        <Advert />
      </div>
    </div>
  );
};

export default Page;
