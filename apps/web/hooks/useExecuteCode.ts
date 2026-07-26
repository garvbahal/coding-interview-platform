import { useMutation } from "@tanstack/react-query";
import { postRunCode, postSubmitCode } from "../services/execute.service";

export const useRunCode = () => {
  return useMutation({
    mutationFn: postRunCode,
  });
};

export const useSubmitCode = () => {
  return useMutation({
    mutationFn: postSubmitCode,
  });
};
