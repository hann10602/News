"use client";
import { useAppDispatch } from "@/store/store";
import { userAsyncAction } from "@/store/user/action";
import { UserType } from "@/store/user/type";
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
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  item?: UserType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const UserModal = ({ item, isOpen, onClose, onSuccess }: Props) => {
  const [role, setRole] = useState<Number>(0);
  const { handleSubmit, control, reset } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    try {
      // if (item) {
      //   dispatch(
      //     userAsyncAction.update({
      //       id: item.id,
      //       name: e.name,
      //       code: e.code,
      //     })
      //   )
      //     .then(() => {
      //       reset();
      //       onSuccess();
      //     })
      //     .catch((err) => {
      //       failedNotify(err.message);
      //     });
      // } else {
      //   dispatch(
      //     userAsyncAction.create({
      //       name: e.name,
      //       code: e.code,
      //     })
      //   )
      //     .then(() => {
      //       reset();
      //       onSuccess();
      //     })
      //     .catch((err) => {
      //       failedNotify(err.message);
      //     });
      // }
    } catch (err) {
      console.log(err);
    }
  };

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
              }}
            >
              <CloseRounded className="text-slate-500 cursor-pointer text-3xl hover:bg-slate-400 hover:bg-opacity-30 rounded-full h-10 w-10 p-1" />
            </span>
          </div>
          <Input />
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
            <InputLabel>Email:</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue={item?.email || ""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <InputLabel>Phone number:</InputLabel>
            <Controller
              name="phoneNum"
              control={control}
              defaultValue={item?.phoneNum || ""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <InputLabel>Password:</InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              render={({ field }) => <Input type="text" required {...field} />}
            />
          </FormControl>
          <FormControl className="w-full mt-10">
            <InputLabel>Role:</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(Number(e.target.value))}
            >
              <MenuItem value={0}>User</MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
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

export default UserModal;
