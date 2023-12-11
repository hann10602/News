"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { useState } from "react";
import { Avatar } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isSideOpen, setIsSideOpen] = useState<Boolean>(false);
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex">
          <div>
            <aside
              className={`${
                isSideOpen ? "w-48" : "w-20"
              } h-full border-r border-solid border-gray-500`}
            ></aside>
          </div>
          <div className="flex-1">
            <header className="w-full h-20 border-b border-solid border-gray-500 flex justify-end"><Avatar alt="avatar" src=""/></header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
