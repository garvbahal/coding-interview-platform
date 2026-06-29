import type { Request, Response } from "express";
import {
  createRoomSchema,
  joinRoomSchema,
} from "../validations/room.validator.js";
import { prisma } from "@repo/db";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateRoomCode = () => {
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  return code;
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = createRoomSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: error.flatten(),
      });
    }

    const { title, description, difficulty, testCases } = data;

    const interviewerId = req.user?.id;

    let roomCode = generateRoomCode();

    while (
      await prisma.room.findFirst({
        where: {
          roomCode,
        },
      })
    ) {
      roomCode = generateRoomCode();
    }

    const room = await prisma.$transaction(async (tx) => {
      const problem = await tx.problem.create({
        data: {
          title,
          description,
          difficulty,
        },
      });

      await tx.testCase.createMany({
        data: testCases.map((testcase, index) => ({
          problemId: problem.id,
          input: testcase.input,
          expectedOutput: testcase.expectedOutput,
          isHidden: testcase.isHidden,
          orderIndex: index + 1,
        })),
      });

      const room = await tx.room.create({
        data: {
          roomCode,
          problemId: problem.id,
          createdBy: interviewerId!,
        },
      });

      await tx.roomState.create({
        data: {
          roomId: room.id,
          code: "",
          language: "cpp",
        },
      });

      return room;
    });

    return res.status(200).json({
      success: true,
      message: "Room created successfully",
      data: {
        roomId: room.id,
        roomCode: room.roomCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating room",
      error: error,
    });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    //zod validation
    const { success, error, data } = joinRoomSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        errors: error.flatten(),
      });
    }

    const { roomCode } = data;

    //check if roomcode is not valid
    const room = await prisma.room.findUnique({
      where: {
        roomCode,
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (room.status !== "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Room is not active",
      });
    }

    const user = req.user!;

    //Has this user already joined
    let participant = await prisma.roomParticipant.findUnique({
      where: {
        roomId_userId: {
          roomId: room.id,
          userId: user.id,
        },
      },
    });

    //user has not joined before
    if (!participant) {
      //if user is candidate then check other candidate has joined this room or not
      if (user.role === "CANDIDATE") {
        const existingCandidate = await prisma.roomParticipant.findFirst({
          where: {
            roomId: room.id,
            user: {
              role: "CANDIDATE",
            },
          },
        });

        if (existingCandidate) {
          return res.status(403).json({
            success: false,
            message: "A candidate has already joined this room",
          });
        }
      }

      // if user is interviewer then check if this room is created by this user or not
      if (user.role === "INTERVIEWER" && room.createdBy !== user.id) {
        return res.status(403).json({
          success: false,
          message: "This room is not owned by you",
        });
      }

      //since user has not joined this room yet so we create his entry in the room
      participant = await prisma.roomParticipant.create({
        data: {
          roomId: room.id,
          userId: user.id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Joined Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while joining the room",
    });
  }
};

export const getRoomDetails = async (req: Request, res: Response) => {
  try {
    const roomCode = req.params.roomCode;

    if (!roomCode || typeof roomCode !== "string") {
      return res.status(400).json({
        success: false,
        message: "Room code is missing",
      });
    }

    const room = await prisma.room.findUnique({
      where: {
        roomCode,
      },
      include: {
        problem: true,
        state: true,
      },
    });

    if (!room) {
      return res.status(400).json({
        success: false,
        message: "Room not found",
      });
    }

    if (room.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Room is not active now",
      });
    }

    const user = req.user!;

    const participant = await prisma.roomParticipant.findUnique({
      where: {
        roomId_userId: {
          roomId: room.id,
          userId: user.id,
        },
      },
    });

    if (!participant) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to see room details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Details fetched successfully",
      data: {
        roomId: room.id,
        roomCode,
        status: room.status,

        problem: {
          title: room.problem.title,
          description: room.problem.description,
          difficulty: room.problem.difficulty,
        },
        roomState: {
          language: room.state?.language,
          code: room.state?.code,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching room details",
    });
  }
};
