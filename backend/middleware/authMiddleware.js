import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";
import Shop from "../models/shopModel.js";
import { accessToken } from "../utils/generateToken.js";

export const protect = AsyncHandler(async (req, res, next) => {
  let refresh = req.cookies.rf;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_FIRST);

    if (req.headers.authorization.startsWith("BearerCustomer")) {
      let customer = await Customer.findById(decoded.id).select("_id");
      if (customer) {
        req.customer = customer;
        return next();
      }
    }
    if (req.headers.authorization.startsWith("BearerShop")) {
      let shop = await Shop.findById(decoded.id).select("_id");
      if (shop) {
        req.shop = shop;
        return next();
      }
    }
  }

  if (refresh) {
    const decoded = jwt.verify(refresh, process.env.JWT_SECRET_SECOND);
    if (decoded.id) {
      res.json({
        access: accessToken(decoded.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  }

  if (!refresh) {
    res.end();
  }
});
