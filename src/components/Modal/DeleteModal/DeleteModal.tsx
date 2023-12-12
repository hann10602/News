import { CloseRounded } from "@mui/icons-material";
import { Button, Modal, Paper, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  title: String;
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
};

const DeleteModal = ({ title, isOpen, onClose, handleDelete }: Props) => {
  return (
    <Modal open={isOpen} className="flex items-center justify-center">
      <Paper className="w-[400px] pt-5 pb-7 px-7 focus-visible:outline-none">
        <div className="flex items-center justify-end">
          <span onClick={onClose}>
            <CloseRounded className="text-slate-500 cursor-pointer text-3xl hover:bg-slate-400 hover:bg-opacity-30 rounded-full h-10 w-10 p-1" />
          </span>
        </div>
        <Typography className="mt-5 text-2xl text-slate-500 font-semibold text-center">
          {title}
        </Typography>
        <div className="flex items-center mt-10 justify-between space-x-3">
          <Button
            variant="outlined"
            color="primary"
            className="w-full h-12 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="bg-[#3d8bd9] w-full h-12 rounded-lg"
            onClick={handleDelete}
          >
            Accept
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default DeleteModal;
