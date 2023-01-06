import express from "express";
const router = express.Router();

import {
  getShopSearchProducts,
  getCustomerSearchProducts,
  getSearchFavoriteShop,
} from "../controllers/searchController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/shop/products").get(protect, getShopSearchProducts);
router.route("/customer/products").get(getCustomerSearchProducts);
router.route("/favorite/shops").get(protect, getSearchFavoriteShop);

export default router;
