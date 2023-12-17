import Image from "next/image";
import React from "react";
import Advert1 from "@/assets/img/ad1.jpg";
import Advert2 from "@/assets/img/ad2.jpg";
import Advert3 from "@/assets/img/ad3.jpg";

type Props = {
  quantity?: number;
};

const Advert = ({ quantity = 3 }: Props) => {
  return (
    <div className="hidden md:block">
      {quantity >= 1 && (
        <Image
          className="object-cover w-full p-5"
          src={Advert1}
          alt="advert 1"
        />
      )}
      {quantity >= 2 && (
        <Image
          className="object-cover w-full p-5"
          src={Advert2}
          alt="advert 2"
        />
      )}
      {quantity >= 3 && (
        <Image
          className="object-cover w-full p-5"
          src={Advert3}
          alt="advert 3"
        />
      )}
    </div>
  );
};

export default Advert;
