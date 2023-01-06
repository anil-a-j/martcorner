import express from "express";
const router = express.Router();

import {
  getStoreTypes,
  getStates,
  getDistricts,
} from "../controllers/autoloadController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/storetypes").get(getStoreTypes);
router.route("/states").get(getStates);
router.route("/districts/:id").get(getDistricts);

export default router;
