import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="mt-14 border-t border-solid border-gray-400">
      <div className="flex justify-between items-center px-5 py-2">
        <Typography variant="body1" className="font-semibold">
          Online newspaper
        </Typography>
        <Typography variant="body1" className="font-semibold">
          Follow us on
          <Link href="https://www.facebook.com/">
            <Facebook className="ml-2 cursor-pointer" />
          </Link>
          <Link href="https://www.instagram.com/">
            <Instagram className="ml-2 cursor-pointer" />
          </Link>
          <Link href="https://twitter.com/">
            <Twitter className="ml-2 cursor-pointer" />
          </Link>
        </Typography>
      </div>
      <div className="flex justify-between px-5 pt-5 pb-10 border-t space-x-5 border-solid border-gray-300">
        <div>
          <Typography variant="body2" className="font-semibold">
            The most popular online newspaper
          </Typography>
          <Typography variant="body2">
            Belongs to the Ministry of Science and Technology
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            <b>Editor:</b> Nguyen Ngoc Ha
          </Typography>
          <Typography variant="body2">
            <b>Address:</b> 29lk15 Van Phu, Ha Dong district, Hanoi city
          </Typography>
          <Typography variant="body2">
            <b>Phone Number:</b>1 0986.868.686
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            © 1997-2023. All copyright belongs to news
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
