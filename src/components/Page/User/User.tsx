"use client";
import { auth } from "@/config/firebase";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import firebase from "firebase/compat/app";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

type Props = {};

const User = (props: Props) => {
  const { register, handleSubmit, control } = useForm();

  const [authUser, setAuthUser] = useState(auth.currentUser);

  console.log(authUser);

  const router = useRouter();

  //   if (!auth.currentUser) {
  //     router.push("/login");
  //   }

  const onSubmit = (e: any) => {
    firebase.auth().currentUser?.updateProfile({
      displayName: e.name,
    });
  };

  return (
    <div className="px-40 pt-8">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="w-full mt-10">
          <InputLabel>Name:</InputLabel>
          <Controller
            name="name"
            control={control}
            defaultValue={authUser?.displayName || ""}
            render={({ field }) => <Input type="text" required {...field} />}
          />
        </FormControl>
        <FormControl className="w-full mt-10">
          <InputLabel>Email:</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue={authUser?.email || ""}
            render={({ field }) => <Input type="text" required {...field} />}
          />
        </FormControl>
        <FormControl className="w-full mt-10">
          <InputLabel>Phone number:</InputLabel>
          <Controller
            name="phoneNum"
            control={control}
            defaultValue={authUser?.phoneNumber || ""}
            render={({ field }) => <Input type="text" required {...field} />}
          />
        </FormControl>
        <div className="flex justify-end mt-10">
          <Button type="submit" variant="contained" className="bg-[#3D8BD9]">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default User;
