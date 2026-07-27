import { Language } from "../components/interviewRoom/constant";

export type UserJoinedType = {
  name: string;
  role: string;
  userId: string;
};

export type UserLeftType = {
  name: string;
  role: string;
  userId: string;
};

export type CodeChangedType = {
  code: string;
};

export type LangaugeChangeType = {
  language: Language;
  starterCode: string;
};

export type CustomInputChangeType = {
  customInput: string;
};
