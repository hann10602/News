"use client";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import React from "react";
import { failedNotify, successNotify } from "@/utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Page = (props: Props) => {
  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => successNotify("Logout success"))
        .catch(() => failedNotify("Logout failed"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
      home{" "}
      <Button variant="outlined" onClick={() => handleLogout()}>
        Logout
      </Button>
    </div>
  );
};

export default Page;
