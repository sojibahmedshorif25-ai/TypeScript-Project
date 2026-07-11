import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";
import type { AuthPayload } from "../types";

function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

export async function registerUser(name: string, email: string, password: string) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const user = await User.create({ name, email: email.toLowerCase(), password });

  const payload: AuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = signToken(payload);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload: AuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = signToken(payload);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}
