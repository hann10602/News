"use client";
import React from "react";
import {
  Button,
  Fab,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { failedNotify } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

type Props = {};

const Page = (props: Props) => {
  const { register, handleSubmit, formState } = useForm();
  const router = useRouter();

  console.log(auth?.currentUser?.email);

  const onSubmit = async (e: any) => {
    try {
      await signInWithEmailAndPassword(auth, e.email, e.password)
        .then((res) => router.push("/home", { scroll: true }))
        .catch(() => failedNotify("Wrong email or password"));
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#6d9ac4] h-screen flex justify-center items-center relative"
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
      <Fab
        className="absolute top-10 left-10 w-20 h-20 bg-[#8BB8E2]"
        onClick={() => router.push("/home")}
      >
        <ArrowBack className="w-10 h-10" />
      </Fab>
      <Paper className="w-[500px] p-10">
        <Typography variant="h4" className="text-center">
          Login
        </Typography>
        <FormControl className="w-full mt-10">
          <InputLabel>Email:</InputLabel>
          <Input type="text" required {...register("email")} />
        </FormControl>
        <FormControl className="w-full mt-10">
          <InputLabel>Password:</InputLabel>
          <Input type="password" required {...register("password")} />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          className="bg-[#EE5684] hover:bg-[#F46791] mt-14 w-full h-12 rounded-lg"
        >
          Login
        </Button>
        <div className="flex mt-5 items-center">
          <div className="w-[45%] h-0.5 bg-gray-300"></div>
          <div className="w-[10%] h-10 border-2 border-solid border-gray-300 text-gray-500 flex items-center justify-center rounded-md font-bold">
            OR
          </div>
          <div className="w-[45%] h-0.5 bg-gray-300"></div>
        </div>
        <div className="w-full mt-5 flex items-center justify-center">
          <div
            className="w-10 h-10 flex justify-center items-center text-3xl font-extrabold text-red-500 border-2 border-solid border-red-500 rounded-full cursor-pointer"
            onClick={() => signInWithGoogle()}
          >
            G
          </div>
        </div>
        <div className="w-full text-gray-500 font-semibold mt-5 flex items-center justify-center">
          Need an account?{" "}
          <Link className="underline cursor-pointer" href="/register">
            SIGN UP
          </Link>
        </div>
      </Paper>
    </form>
  );
};

export default Page;
