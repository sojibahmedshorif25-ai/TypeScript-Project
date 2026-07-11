import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "fallback-secret",
  jwtExpiresIn: 7 * 24 * 60 * 60,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

if (!config.mongodbUri) {
  throw new Error("MONGODB_URI environment variable is required");
}
