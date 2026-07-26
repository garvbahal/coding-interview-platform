import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { RunCode, submitCode } from "../controllers/execute.controller.js";
const router = Router();

router.post("/runCode", authMiddleware, RunCode);
router.post("/submitCode", authMiddleware, submitCode);

export const ExecuteRouter = router;
