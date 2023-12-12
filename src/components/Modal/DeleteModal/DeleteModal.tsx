"use client";
import { categoryAsyncAction } from "@/store/category/action";
import { CategoryType } from "@/store/category/type";
import { useAppDispatch } from "@/store/store";
import { failedNotify } from "@/utils/utils";
import {
    Button,
    Modal,
    Paper
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  item?: CategoryType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CategoryModal = ({ item, isOpen, onClose, onSuccess }: Props) => {
  const { handleSubmit, control, reset } = useForm();

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
        )
          .then(() => {
            onSuccess();
            reset();
          })
          .catch((err) => {
            failedNotify(err.message);
          });
      }
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
        <div className="flex items-center justify-between space-x-3">
          <Button
            variant="outlined"
            color="primary"
            className="mt-14 w-full h-12 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-[#3d8bd9] mt-14 w-full h-12 rounded-lg"
          >
            Accept
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default CategoryModal;
