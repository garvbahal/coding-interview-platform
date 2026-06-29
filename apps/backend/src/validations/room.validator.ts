import { z } from "zod";

const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  expectedOutput: z.string().min(1, "Expected Output is required"),
  isHidden: z.boolean().default(false),
});

export const createRoomSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Problem title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().trim().min(1, "Problem description is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  testCases: z
    .array(testCaseSchema)
    .min(1, "At least one testcase is required"),
});

export const joinRoomSchema = z.object({
  roomCode: z.string().min(1, "Room Code is required"),
});
