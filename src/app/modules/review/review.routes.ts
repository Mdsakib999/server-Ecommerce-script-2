import { Router } from "express";
import * as reviewController from "./review.controller";

const router = Router();

router.post("/", reviewController.createReview);
router.get("/:productId", reviewController.getReviewsByProduct);
router.delete("/:id", reviewController.deleteReview);

export default router;
