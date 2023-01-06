import express from "express";
const router = express.Router();
import upload from "./uploadRoutes.js";

import {
  addProduct,
  checkProductId,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/addproduct").post(
  protect,
  upload.fields([
    { name: "productImage1", maxCount: 1 },
    { name: "productImage2", maxCount: 1 },
  ]),
  addProduct
);

router.route("/checkid/:id").get(protect, checkProductId);

router.route("/editproduct").post(
  protect,
  upload.fields([
    { name: "productImage1", maxCount: 1 },
    { name: "productImage2", maxCount: 1 },
  ]),
  editProduct
);

router.route("/delete/:id").get(protect, deleteProduct);

export default router;
