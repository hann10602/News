"use client";
import { auth } from "@/config/firebase";
import { categoryAsyncAction } from "@/store/category/action";
import {
  categoriesSelector,
  isGettingCategoriesSelector,
} from "@/store/category/selector";
import { useAppDispatch } from "@/store/store";
import { failedNotify, successNotify } from "@/utils/utils";
import { Home, Person, Search } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Header = (props: Props) => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const categories = useSelector(categoriesSelector);
  const isGettingCategories = useSelector(isGettingCategoriesSelector);

  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => successNotify("Logout success"))
        .catch(() => failedNotify("Logout failed"));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    router.push(`/search?search=${search}`);
  };

  useEffect(() => {
    dispatch(categoryAsyncAction.getAll());
  }, []);

  const getDay = () => {
    const data = new Date().getDay() + 1;
    switch (data) {
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
      case 8:
        return "Sunday";
    }
  };

  return (
    <div className="bg-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full py-2 flex justify-center items-center border-b border-solid border-gray-500">
        <Link
          className="cursor-pointer flex justify-center items-center h-10 border-r border-solid border-gray-300 px-3"
          href="/home"
        >
          <svg
            id="Layer_1"
            enable-background="new 0 0 491.5 491.5"
            height="40"
            viewBox="0 0 491.5 491.5"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <linearGradient
              id="SVGID_1_"
              gradientUnits="userSpaceOnUse"
              x1="245.8"
              x2="245.8"
              y1="35.6"
              y2="456"
            >
              <stop offset="0" stop-color="#f704fe" />
              <stop offset="1" stop-color="#24bce3" />
            </linearGradient>
            <path
              d="m413.9 335.1h-336.2c-6.4 0-11.7 5.2-11.7 11.7v97.5c0 6.4 5.2 11.7 11.7 11.7h336.2c6.4 0 11.7-5.2 11.7-11.7v-97.5c0-6.5-5.3-11.7-11.7-11.7zm-261.7 94.3c-1.8.7-3.9.2-5.3-1.3l-44.9-49.6v46.3c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8v-58.8c0-2 1.2-3.8 3.1-4.5s4-.2 5.3 1.3l44.9 49.6v-46.3c0-2.7 2.1-4.8 4.8-4.8s4.8 2.1 4.8 4.8v58.8c-.1 2-1.3 3.8-3.1 4.5zm79.5-38.7c2.7 0 4.8 2.1 4.8 4.8s-2.2 4.8-4.8 4.8h-48.4v19.8h48.4c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8h-53.2c-2.7 0-4.8-2.1-4.8-4.8v-58.8c0-2.7 2.1-4.8 4.8-4.8h53.2c2.7 0 4.8 2.1 4.8 4.8s-2.2 4.8-4.8 4.8h-48.4v19.8zm83.1 38.7c-1.8.7-3.9.2-5.3-1.2l-23.1-25.2-23.1 25.1c-1.3 1.5-3.4 1.9-5.3 1.2-1.8-.7-3.1-2.5-3.1-4.5v-58.8c0-2.7 2.1-4.8 4.8-4.8s4.8 2.1 4.8 4.8v46.5l18.3-19.9c.9-1 2.2-1.6 3.5-1.6 1.4 0 2.6.6 3.5 1.6l18.3 19.9v-46.5c0-2.7 2.1-4.8 4.8-4.8s4.8 2.1 4.8 4.8v58.8c.1 2.1-1.1 3.8-2.9 4.6zm70.2.3h-34.7c-7.8 0-14.1-5.9-14.1-13.2 0-2.7 2.1-4.8 4.8-4.8s4.8 2.1 4.8 4.8c0 2 2 3.6 4.5 3.6h34.7c2.4 0 4.5-1.6 4.5-3.6v-12.6c0-2-2-3.6-4.5-3.6h-34.7c-7.8 0-14.1-5.9-14.1-13.2v-12.6c0-7.3 6.3-13.2 14.1-13.2h34.7c7.7 0 14.1 5.9 14.1 13.2 0 2.6-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2-2-3.6-4.5-3.6h-34.7c-2.4 0-4.5 1.7-4.5 3.6v12.6c0 2 2 3.6 4.5 3.6h34.7c7.7 0 14.1 5.9 14.1 13.2v12.6c0 7.3-6.3 13.2-14.1 13.2zm-144-104.2v-52.9h-97c2.1 18.5 5.7 36.3 10.6 52.9zm-96.4 0c-4.7-16.7-8.2-34.5-10.2-52.9h-80c4 18.5 10.6 36.3 19.7 52.9zm-12.6-94.2c0-11.7.5-23.2 1.6-34.5h-80.7c-2 11.2-3 22.7-3 34.5 0 10.6.9 21.2 2.6 31.7h80.9c-.9-10.5-1.4-21.1-1.4-31.7zm109-34.5h-97.7c-1.1 11.3-1.6 22.8-1.6 34.5 0 10.6.5 21.2 1.4 31.7h98zm107.5 66.2c.9-10.4 1.4-21 1.4-31.7 0-11.7-.5-23.2-1.6-34.5h-97.7v66.1h97.9zm-11.5 62.5c4.9-16.6 8.4-34.5 10.6-52.9h-97v52.9zm10 0h70.6c9.1-16.6 15.7-34.4 19.7-52.9h-80.1c-2.1 18.4-5.5 36.2-10.2 52.9zm91.6-128.7h-80.7c1 11.3 1.6 22.8 1.6 34.5 0 10.6-.5 21.2-1.3 31.7h80.9c1.7-10.4 2.6-21 2.6-31.7-.1-11.7-1.1-23.2-3.1-34.5zm-81.7-9.6h79.8c-5.4-23.7-15.2-46-28.9-66.1h-65.8c7 20.3 12.1 42.6 14.9 66.1zm-106.3-66.1v66.1h96.7c-2.9-23.7-8.1-46-15.5-66.1zm-9.6 0h-81.2c-7.4 20.1-12.6 42.5-15.5 66.1h96.7zm-91.4 0h-65.7c-13.5 19.8-23.5 42.1-29 66.1h79.7c2.8-23.5 7.9-45.8 15-66.1zm3.6-9.6c3.4-8.6 7.2-16.7 11.3-24.4 11.3-20.9 24.7-36.8 39.4-47.2-45.6 10-85.4 35.9-113.1 71.6zm87.8-75.9c-25.5 2.2-49.5 21.9-68 56.1-3.4 6.3-6.5 12.9-9.4 19.8h77.4zm87 75.9c-2.9-6.9-6-13.5-9.4-19.8-18.5-34.2-42.5-53.9-68-56.1v75.9zm-1-24.4c4.2 7.7 7.9 15.8 11.3 24.4h62.4c-5.1-6.5-10.6-12.8-16.5-18.7-27-27-60.4-45.1-96.8-52.9 14.8 10.3 28.2 26.3 39.6 47.2z"
              fill="url(#SVGID_1_)"
            />
          </svg>
        </Link>
        <div className="flex justify-center items-center text-gray-500 h-8 border-r border-solid border-gray-300 px-3 text-sm font-semibold">
          {getDay()} , {new Date().toLocaleDateString()}
        </div>
        <div className="flex justify-center items-center h-8 border-r border-solid border-gray-300 px-5 text-sm font-semibold">
          <div>
            <span onClick={() => handleSearch()}>
              <Search className="cursor-pointer text-gray-500" />
            </span>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        {auth.currentUser ? (
          <div className="flex justify-center text-gray-500 items-center h-8 border-r border-solid border-gray-300 px-3 text-sm font-semibold"></div>
        ) : (
          <Link
            className="cursor-pointer text-gray-600 flex justify-center items-center h-8 border-r border-solid border-gray-300 px-3 text-sm font-semibold"
            href="/login"
          >
            <Person />
            <div className="ml-2">Login</div>
          </Link>
        )}
      </div>
      <div className="w-full py-2 space-x-5 text-sm flex justify-center items-center border-b border-solid border-gray-500">
        <Link href="/home">
          <Home className="text-gray-600 text-4xl p-1 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all ease-in-out rounded-full" />
        </Link>
        {isGettingCategories ||
          categories.slice(0, 10).map((category) => (
            <div
              key={category.id}
              className="cursor-pointer flex justify-center items-center hover:text-red-400"
              onClick={() => router.push(`category?${category.id}`)}
            >
              {category.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
