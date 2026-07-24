import { Router } from "express";
import {
  authMiddleware,
  isCandidate,
  isInterviewer,
} from "../middlewares/auth.middleware.js";
import {
  createRoom,
  getJoinedRooms,
  getMyRooms,
  joinRoom,
} from "../controllers/room.controller.js";

const router = Router();

router.post("/", authMiddleware, isInterviewer, createRoom);
router.post("/join", authMiddleware, joinRoom);

router.get("/my", authMiddleware, isInterviewer, getMyRooms);

router.get("/joined", authMiddleware, isCandidate, getJoinedRooms);

export const roomRouter = router;
