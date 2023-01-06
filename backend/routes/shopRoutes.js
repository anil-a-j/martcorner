import express from "express";
const router = express.Router();
import upload from "./uploadRoutes.js";

import {
  signupAsShop,
  loginAsShop,
  updateShop,
  deleteShop,
  getShopPage,
} from "../controllers/shopController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/signup").post(signupAsShop);
router.route("/login").post(loginAsShop);
router.route("/editshop").put(
  protect,
  upload.fields([
    { name: "shopLogo", maxCount: 1 },
    { name: "shopBanner", maxCount: 1 },
  ]),
  updateShop
);

router.route("/delete").post(protect, deleteShop);
router.route("/info/:shopId").get(getShopPage);

export default router;
