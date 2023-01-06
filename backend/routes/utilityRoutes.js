import express from "express";
const router = express.Router();

import {
  passwordReset,
  securityCodeCheck,
  createNewPassword,
  addToFavoriteShop,
  removeFromFavoriteShop,
} from "../controllers/utilityController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/pwd/reset").post(passwordReset);

router.route("/pwd/create").post(createNewPassword);

router.route("/favorite/shop/add").post(protect, addToFavoriteShop);

router.route("/favorite/shop/remove").post(protect, removeFromFavoriteShop);

router.route("/pwd/check/:securitycode").get(securityCodeCheck);

export default router;
