import axios from "axios";
import { toast } from "react-hot-toast";
import { setCookies } from "@/utils/server-actions/cookies";
export const postUserData = async (url: string, data: any) => {
  try {
    const res: any = await axios.post(url, data, { withCredentials: true });
    if (res.data) {
      console.log({ res });
      const cookieResult = setCookies(res?.data?.token);
      if (cookieResult) {
        toast.success("Message posted successfully");
        return res.data;
      }
    }
    console.log("Signup success", res.data);
    toast.success("Signup successful!");
    return res.data;
  } catch (error: any) {
    console.log("Signup failed! Try again.");
    console.error(error.message);
    toast.error(error.message);
    return false;
  }
};
