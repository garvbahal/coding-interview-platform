import type { Language } from "../components/interviewRoom/constant";

export type runCodeDataReq = {
  code: string;
  language: Language;
  input: string;
};

export type runDataResponse = {
  success: boolean;
  message: string;
  data: {
    output: string;
    error: string;
    status: string;
    exitCode: number;
    executionTime: string;
    memory: string;
  };
};

export type submitCodeReq = {
  roomCode: string;
  code: string;
  language: Language;
};

export type submitCodeResponse = {
  success: boolean;
  verdict: string;
  error?: string;
  passed?: number;
  total?: number;
};
