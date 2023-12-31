"use client";
import { categoriesSelector } from "@/store/category/selector";
import { newsAsyncAction } from "@/store/news/action";
import { NewsType } from "@/store/news/type";
import { useAppDispatch } from "@/store/store";
import { failedNotify } from "@/utils/utils";
import { CloseRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  item?: NewsType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const NewsModal = ({ item, isOpen, onClose, onSuccess }: Props) => {
  const categories = useSelector(categoriesSelector);

  const [chooseCategory, setChooseCategory] = useState<string>("");

  const { handleSubmit, control, reset } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    try {
      if (item) {
        dispatch(
          newsAsyncAction.update({
            id: item.id,
            title: e.title,
            content: e.content,
            categoryId: chooseCategory,
            createdDate: serverTimestamp(),
          })
        )
          .then(() => {
            reset();
            onSuccess();
          })
          .catch((err) => {
            failedNotify(err.message);
          });
      } else {
        dispatch(
          newsAsyncAction.create({
            title: e.title,
            content: e.content,
            categoryId: chooseCategory,
            createdDate: serverTimestamp(),
          })
        )
          .then(() => {
            reset();
            onSuccess();
          })
          .catch((err) => {
            failedNotify(err.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (item) {
      setChooseCategory(item.categoryId);
    }
  });

  return (
    <Modal open={isOpen} className="flex items-center justify-center">
      <Paper className="w-[500px] pt-5 pb-7 px-7 focus-visible:outline-none">
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
          <div className="flex items-center justify-end">
            <span
              onClick={() => {
                onClose();
                reset();
                setChooseCategory("");
              }}
            >
              <CloseRounded className="text-slate-500 cursor-pointer text-3xl hover:bg-slate-400 hover:bg-opacity-30 rounded-full h-10 w-10 p-1" />
            </span>
          </div>
          <FormControl className="w-full mt-10">
            <InputLabel>Title:</InputLabel>
            <Controller
              name="title"
              control={control}
              defaultValue={item?.title || ""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <Controller
              name="content"
              control={control}
              defaultValue={item?.content || ""}
              render={({ field }) => (
                <TextField
                  type="text"
                  label="Content"
                  required
                  multiline
                  rows={10}
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <InputLabel>Category:</InputLabel>
            <Select
              name="category"
              value={chooseCategory}
              required
              onChange={(e) => setChooseCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex mt-14 items-center justify-between space-x-3">
            <Button
              variant="outlined"
              color="primary"
              className=" w-full h-12 rounded-lg"
              onClick={() => {
                onClose();
                reset();
                setChooseCategory("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-[#3d8bd9] w-full h-12 rounded-lg"
            >
              Accept
            </Button>
          </div>
        </form>
      </Paper>
    </Modal>
  );
};

export default NewsModal;
