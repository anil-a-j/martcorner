import express from "express";
const router = express.Router();

import {
  addReview,
  getReviews,
  addFeedback,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/add").post(protect, addReview);

router.route("/shop").get(getReviews);

router.route("/feedback/add").post(addFeedback);

export default router;
