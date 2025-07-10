// services/auth.ts
import axios from "./api/axiosInstance";

export const login = async (phone: string) => {
  console.log(phone);
  try {
    const res = await axios.post("/generateOTP", { mobile_number: phone });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtp = (phone: string, otp: string) =>
  axios.post("/validateOTP", { mobile_number: phone, otp });
