import { toast } from "react-toastify";

export const toastError = (error) => {
  if (error?.data) {
    const { data, message } = error.data;
    if (data) {
      const keys = Object.keys(data);
      toast.error(data[keys[0]]);
    } else {
      toast.error(message);
    }
  } else {
    toast.error(error.message);
  }
};
