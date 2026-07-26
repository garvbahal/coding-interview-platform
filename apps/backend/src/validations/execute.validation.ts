import { z } from "zod";

export const runCodeSchema = z.object({
  language: z.enum(["cpp", "java", "python", "typescript"]),
  code: z.string().min(1, "Code is required"),
  input: z.string().optional().default(""),
});

export const submitCodeSchema = z.object({
  language: z.enum(["cpp", "java", "python", "typescript"]),
  code: z.string().min(1, "Code is required"),
  roomCode: z.string().min(1, "Room Code is required"),
});
