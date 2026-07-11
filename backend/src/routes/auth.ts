import { Router } from "express";
import * as authController from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth";
import { registerSchema, loginSchema } from "../validators/auth";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.getMe);

export default router;
