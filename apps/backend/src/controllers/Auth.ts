import type { Request, Response } from "express";
import {
  googleAuthSchema,
  loginSchema,
  signupSchema,
} from "../validations/auth.validator.js";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/JwtPayload.js";
import { OAuth2Client } from "google-auth-library";

export const signup = async (req: Request, res: Response) => {
  try {
    // zod validation of signup
    const { success, error, data } = signupSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Signup credentials are not correct",
        errors: error.flatten(),
      });
    }

    const { name, email, password } = data;

    //checking if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user entry in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CANDIDATE",
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("SignupError: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while signing up with credentials",
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // zod validation
    const { success, error, data } = loginSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Login credentials are not correct",
        errors: error.flatten(),
      });
    }

    const { email, password } = data;

    //checking if user exists or not
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    // if password is not there then it is google account
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses Google Sign In",
      });
    }

    //comparing the password
    if (await bcrypt.compare(password, user.password)) {
      const jwtPayload: JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const jwtSecret = process.env.JWT_SECRET!;
      const jwtToken = jwt.sign(jwtPayload, jwtSecret, {
        expiresIn: "7d",
      });

      res.cookie("auth-cookie", jwtToken, {
        httpOnly: true,
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });

      return res.status(200).json({
        success: true,
        message: "Login Successfull",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Password doesnot match",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
      error: error,
    });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    //zod validation of google auth token
    const { success, error, data } = googleAuthSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Google Auth token is missing",
        errors: error.flatten(),
      });
    }

    const { token } = data;

    //verifying the token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid Google Token",
      });
    }

    //finding user already exists or not
    let user = await prisma.user.findUnique({
      where: {
        email: payload?.email!,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload?.email!,
          name: payload?.name!,
          role: "CANDIDATE",
          password: null,
        },
      });
    }

    //creating jwt token
    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    //setting jwt cookie
    res.cookie("auth-cookie", jwtToken, {
      httpOnly: true,
      //   secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User Logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while google signup",
    });
  }
};

export const getAuthDetails = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
    });
  }
};
