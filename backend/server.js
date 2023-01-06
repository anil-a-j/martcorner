import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import autoloadRoutes from "./routes/autoloadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import utilityRoutes from "./routes/utilityRoutes.js";
import cookieParser from "cookie-parser";
import AsyncHandler from "express-async-handler";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/api/customer", customerRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/autoload", autoloadRoutes);
app.use("/api/product", productRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/utility", utilityRoutes);

// @desc provide access key
// @route GET /api/user/getaccesskey
// @access private
app.use(
  "/api/user/getaccesskey",
  protect,
  AsyncHandler(async (req, res) => {
    res.end();
  })
);

// Route logout
app.use(
  "/api/logout",
  AsyncHandler(async (req, res) => {
    res
      .clearCookie("rf", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .end();
  })
);

// Location static folder for image upload
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
