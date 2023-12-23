"use client";
import React from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { failedNotify } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { userAsyncAction } from "@/store/user/action";

type Props = {};

const Page = (props: Props) => {
  const { handleSubmit, control } = useForm();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    try {
      if (
        !String(e.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        failedNotify("Wrong email format");
      } else if (!(e.password.length > 5)) {
        failedNotify("Password need at least 6 characters");
      } else {
        await createUserWithEmailAndPassword(auth, e.email, e.password)
          .then(() => {
            router.push("/login", { scroll: false });
            dispatch(
              userAsyncAction.create({
                email: e.email,
                password: e.password,
              })
            );
          })
          .catch((err) => failedNotify(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#6d9ac4] h-screen flex justify-center items-center"
    >
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
      <Paper className="w-[500px] p-10">
        <Typography variant="h4" className="text-center">
          Register
        </Typography>
        <FormControl className="w-full mt-10">
          <InputLabel>Email:</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <Input required {...field} />}
          />
        </FormControl>
        <FormControl className="w-full mt-10">
          <InputLabel>Password:</InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input type="password" required {...field} />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          className="bg-[#EE5684] hover:bg-[#F46791] mt-14 w-full h-12 rounded-lg"
        >
          Register
        </Button>
        <div className="flex mt-5 items-center">
          <div className="w-[45%] h-0.5 bg-gray-300"></div>
          <div className="w-[10%] h-10 border-2 border-solid border-gray-300 text-gray-500 flex items-center justify-center rounded-md font-bold">
            OR
          </div>
          <div className="w-[45%] h-0.5 bg-gray-300"></div>
        </div>
        <div className="w-full text-gray-500 font-semibold mt-5 flex items-center justify-center">
          Already have account?{" "}
          <Link className="underline cursor-pointer" href="/login">
            SIGN IN
          </Link>
        </div>
      </Paper>
    </form>
  );
};

export default Page;
