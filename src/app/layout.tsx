"use client";
import store from "@/store/store";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { Provider } from "react-redux";

type Props = { children: React.ReactNode };

const inter = Inter({ subsets: ["latin"] });

const layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default layout;
