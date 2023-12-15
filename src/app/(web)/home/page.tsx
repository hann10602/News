import Advert1 from "@/assets/img/ad1.jpg";
import Advert2 from "@/assets/img/ad2.jpg";
import Advert3 from "@/assets/img/ad3.jpg";
import Image from "next/image";
import Home from "@/components/Page/Web/Home/Home";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex">
      <Home />
      <div className="w-80">
        <Image
          className="object-cover w-full p-5"
          src={Advert1}
          alt="advert 1"
        />
        <Image
          className="object-cover w-full p-5"
          src={Advert2}
          alt="advert 2"
        />
        <Image
          className="object-cover w-full p-5"
          src={Advert3}
          alt="advert 3"
        />
      </div>
    </div>
  );
};

export default Page;
