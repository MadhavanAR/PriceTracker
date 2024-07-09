import axios from "axios";
import toast from "react-hot-toast";

export const postData = async (url: string, formData: any) => {
  try {
    const res = await axios.post(url, formData, { withCredentials: true });
    return res.data;
  } catch (err) {
    toast.error("Oops something went wrong");
    throw new Error("Oops something went wrong");
  }
};