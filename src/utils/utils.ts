import { toast } from "react-toastify";

export const failedNotify = (message: string) => {
  toast.error(message);
};

export const successNotify = (message: string) => {
  toast.success(message);
};
