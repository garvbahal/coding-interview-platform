import { Router } from "express";
import {
  getAuthDetails,
  googleAuth,
  login,
  signup,
} from "../controllers/Auth.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/me", authMiddleware, getAuthDetails);
router.post("/auth/google", googleAuth);

export const authRouter = router;
