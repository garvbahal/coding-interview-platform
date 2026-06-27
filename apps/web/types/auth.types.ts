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

export type SignupResponse = {
  success: boolean;
  message: string;
  user: AuthUser;
};

export type AuthCookieResponse = {
  success: boolean;
  message: string;
  user: AuthUser;
};

export type LoginResponse = {
  success: boolean;
  message: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
  error?: object;
};

export type LogoutResponse = {
  success: string;
  message: string;
};
