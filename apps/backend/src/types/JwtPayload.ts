export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  role: "CANDIDATE" | "INTERVIEWER";
};
