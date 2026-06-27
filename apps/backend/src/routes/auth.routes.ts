import { Router } from "express";
import {
  getAuthDetails,
  googleAuth,
  login,
  logout,
  signup,
} from "../controllers/Auth.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/me", authMiddleware, getAuthDetails);
router.post("/auth/google", googleAuth);
router.post("/auth/logout", authMiddleware, logout);

export const authRouter = router;
