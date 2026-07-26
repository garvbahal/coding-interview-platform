import type { Request, Response } from "express";
import {
  runCodeSchema,
  submitCodeSchema,
} from "../validations/execute.validation.js";
import { runCode } from "../services/execution.service.js";
import { prisma } from "@repo/db";

const normalize = (str: string) => str.trim();

export const RunCode = async (req: Request, res: Response) => {
  try {
    const { data, error, success } = runCodeSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: error.flatten(),
      });
    }

    const { code, input, language } = data;

    const result = await runCode({ code, input, language });

    return res.status(200).json({
      success: true,
      message: "Code Executed Successfully",
      data: {
        output: result.output,
        error: result.error,
        status: result.status,
        exitCode: result.exit_code,
        executionTime: result.time,
        memory: result.memory,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Execution Service Unavailable",
    });
  }
};

export const submitCode = async (req: Request, res: Response) => {
  try {
    const { data, error, success } = submitCodeSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: error.flatten(),
      });
    }

    const { code, roomCode, language } = data;

    const room = await prisma.room.findUnique({
      where: {
        roomCode: roomCode,
      },
      include: {
        problem: {
          include: {
            testCases: true,
          },
        },
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const testCases = room?.problem.testCases;

    if (testCases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Test cases are missing",
      });
    }

    let passed = 0;

    for (const testcase of testCases) {
      const result = await runCode({ language, code, input: testcase.input });

      if (result.status !== "success") {
        return res.status(200).json({
          success: true,
          verdict: "Compilation Error",
          error: result.error,
        });
      }

      if (normalize(result.output) !== normalize(testcase.expectedOutput)) {
        return res.status(200).json({
          success: true,
          verdict: "Wrong Answer",
          passed,
          total: testCases.length,
        });
      }

      passed++;
    }

    return res.status(200).json({
      success: true,
      verdict: "Accepted",
      passed,
      total: testCases.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Execution Service Unavailable",
    });
  }
};
