import "socket.io";
import type { JwtPayload } from "../types/JwtPayload.ts";

declare module "socket.io" {
  interface Socket {
    user: JwtPayload;
  }
}
