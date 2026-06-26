export type LoginData = {
  email: string;
  password: string;
};

export type AuthUser = {
  name: string;
  id: string;
  email: string;
  role: "CANDIDATE" | "INTERVIEWER";
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
};
