"use client";
import { categoryAsyncAction } from "@/store/category/action";
import { CategoryType } from "@/store/category/type";
import { useAppDispatch } from "@/store/store";
import { CloseRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Paper,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  item?: CategoryType;
  isOpen: boolean;
  onClose: () => void;
};

const CategoryModal = ({ item, isOpen, onClose }: Props) => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    try {

        if (item) {
        dispatch(
          categoryAsyncAction.update({
            id: item.id,
            name: e.name,
            code: e.code,
          })
        );
      } else {
        dispatch(
          categoryAsyncAction.create({
            name: e.name,
            code: e.code,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={isOpen} className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper className="w-[500px] pt-5 pb-7 px-7">
          <div className="flex items-center justify-end">
            <span onClick={onClose}>
              <CloseRounded className="text-slate-500 cursor-pointer text-3xl hover:bg-slate-400 hover:bg-opacity-30 rounded-full h-10 w-10 p-1" />
            </span>
          </div>
          <FormControl className="w-full mt-10">
            <InputLabel>Name:</InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue={item?.name || ""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <InputLabel>Code:</InputLabel>
            <Controller
              name="code"
              control={control}
              defaultValue={item?.code || ""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <div className="flex items-center justify-between space-x-3">
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="mt-14 w-full h-12 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-[#3d8bd9] mt-14 w-full h-12 rounded-lg"
            >
              Update
            </Button>
          </div>
        </Paper>
      </form>
    </Modal>
  );
};

export default CategoryModal;
