import axios from "axios";
import {
  AuthCookieResponse,
  LoginData,
  LoginResponse,
  LogoutResponse,
  SignupData,
  SignupResponse,
} from "../types/auth.types";

export const loginFunction = async (
  data: LoginData,
): Promise<LoginResponse> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL!}/auth/login`,
    data,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<AuthCookieResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
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

export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    {},
    { withCredentials: true },
  );
  return response.data;
};
