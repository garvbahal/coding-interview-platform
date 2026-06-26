import axios from "axios";
import { LoginData, SignupData } from "../types/auth.types";

export const loginFunction = async (data: LoginData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL!}/auth/login`,
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const signupUser = async (data: SignupData) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};
