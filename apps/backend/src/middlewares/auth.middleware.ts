import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/JwtPayload.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //fetching jwt token from cookie
    const token = req.cookies["auth-cookie"];

    //if token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }

    const jwtSecret = process.env.JWT_SECRET!;

    //checking if jwt token is genuine or not
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    //putting the jwt payload in req.user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
