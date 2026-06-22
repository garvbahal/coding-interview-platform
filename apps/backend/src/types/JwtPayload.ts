export type JwtPayload = {
  id: string;
  email: string;
  role: "CANDIDATE" | "INTERVIEWER";
};
