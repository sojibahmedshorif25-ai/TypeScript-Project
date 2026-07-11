import { Router } from "express";
import * as itemController from "../controllers/itemController";
import * as reviewController from "../controllers/reviewController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/role";
import { validate } from "../middlewares/validate";
import { createItemSchema, updateItemSchema } from "../validators/item";
import { createReviewSchema } from "../validators/review";

const router = Router();

router.get("/", itemController.getItems);
router.get("/dashboard", authenticate, authorize("admin"), itemController.getDashboardStats);
router.get("/mine", authenticate, itemController.getUserItems);
router.get("/:id", itemController.getItem);
router.post("/", authenticate, validate(createItemSchema), itemController.createItem);
router.put("/:id", authenticate, validate(updateItemSchema), itemController.updateItem);
router.delete("/:id", authenticate, itemController.deleteItem);

router.get("/:id/reviews", reviewController.getReviews);
router.post("/:id/reviews", authenticate, validate(createReviewSchema), reviewController.createReview);

export default router;
