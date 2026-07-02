import type { ExtendedError } from "socket.io";
import { parseCookie } from "cookie";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/JwtPayload.js";
import type { Socket } from "socket.io";

export const AuthenticateSocket = (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Authentication Required"));
    }

    const cookies = parseCookie(cookieHeader);

    const token = cookies["auth-cookie"];

    if (!token) {
      return next(new Error("Authentication Required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    socket.user = decoded;

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};
