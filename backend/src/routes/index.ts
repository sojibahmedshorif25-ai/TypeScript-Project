import { Router } from "express";
import authRoutes from "./auth";
import itemRoutes from "./item";

const router = Router();

router.use("/auth", authRoutes);
router.use("/items", itemRoutes);

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Server is running" });
});

export default router;
