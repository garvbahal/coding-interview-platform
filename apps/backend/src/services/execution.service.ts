import axios from "axios";
import { COMPILERS } from "../constants/compilers.js";

type RunCodeParams = {
  language: keyof typeof COMPILERS;
  code: string;
  input: string;
};
export const runCode = async ({ language, code, input }: RunCodeParams) => {
  const compiler = COMPILERS[language];

  const response = await axios.post(
    process.env.RUN_CODE_API!,
    {
      compiler,
      code,
      input,
    },
    {
      headers: {
        Authorization: process.env.ONLINE_COMPILER_API_KEY!,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
