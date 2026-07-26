import axios from "axios";
import {
  runCodeDataReq,
  runDataResponse,
  submitCodeReq,
  submitCodeResponse,
} from "../types/execute.types";

export const postRunCode = async ({
  code,
  input,
  language,
}: runCodeDataReq): Promise<runDataResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/execute/runCode`,
    {
      code,
      input,
      language,
    },
    { withCredentials: true },
  );
  return data;
};

export const postSubmitCode = async ({
  code,
  language,
  roomCode,
}: submitCodeReq): Promise<submitCodeResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/execute/submitCode`,
    {
      code,
      language,
      roomCode,
    },
    { withCredentials: true },
  );
  return data;
};
