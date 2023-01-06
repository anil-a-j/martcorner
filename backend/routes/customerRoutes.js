import express from "express";
const router = express.Router();

import {
  signupAsCustomer,
  loginAsCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/signup").post(signupAsCustomer);
router.route("/login").post(loginAsCustomer);
router.route("/editcustomer").put(protect, updateCustomer);
router.route("/delete").post(protect, deleteCustomer);

export default router;
