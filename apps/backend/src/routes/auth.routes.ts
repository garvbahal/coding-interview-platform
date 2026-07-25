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
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getAuthDetails);
router.post("/google", googleAuth);
router.post("/logout", authMiddleware, logout);

export const authRouter = router;
