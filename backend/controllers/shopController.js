import AsyncHandler from "express-async-handler";
import Shop from "../models/shopModel.js";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";
import Store from "../models/storeModel.js";
import { refreshToken } from "../utils/generateToken.js";
import fs from "fs";

// @desc Signup a new shop
// @route POST /api/shop/signup
// @access public
const signupAsShop = AsyncHandler(async (req, res) => {
  const {
    email,
    password,
    phone,
    shopName,
    storeType,
    aboutShop,
    place,
    state,
    district,
  } = req.body;

  const shopExists = await Shop.findOne({ email });

  if (shopExists) {
    res.status(406);
    throw new Error("Shop already exists!");
  }

  let count = await Shop.estimatedDocumentCount();

  let shopId = `${shopName.replace(/\s/g, "").slice(0, 3)}${count + 1}`;

  const shop = await Shop.create({
    shopId: shopId.toLowerCase(),
    email,
    password,
    phone,
    shopName,
    storeType,
    place,
    state,
    district,
    aboutShop,
  });

  if (shop) {
    let stateName = await State.findById(shop.state).select("state");
    let districtName = await District.findById(shop.district).select(
      "district"
    );
    let storeName = await Store.findById(shop.storeType).select("store");

    res
      .cookie("rf", refreshToken(shop.id), {
        httpsOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(201)
      .json({
        shopId: shop.shopId,
        email: shop.email,
        shopName: shop.shopName,
        phone: shop.phone,
        place: shop.place,
        state: stateName ? stateName : "Invalid Data",
        district: districtName ? districtName : "Invalid Data",
        storeType: storeName ? storeName : "Invalid Data",
        aboutShop: shop.aboutShop,
      });
  } else {
    res.status(400);
    throw new Error("Invalid shop data");
  }
});

// @desc Login a shop
// @route POST /api/shop/login
// @access public
const loginAsShop = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let shop = await Shop.findOne({ email: email })
    .populate({ path: "state", select: "state" })
    .populate({ path: "district", select: "district" })
    .populate({ path: "storeType", select: "store" });

  if (shop && (await shop.matchPassword(password))) {
    res
      .cookie("rf", refreshToken(shop.id), {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(200)
      .json(shop);
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// @desc edit shop details
// @route PUT /api/shop/editshop
// @access private
const updateShop = AsyncHandler(async (req, res) => {
  const {
    email,
    phone,
    shopName,
    state,
    district,
    storeType,
    aboutShop,
    place,
    password,
  } = req.body;

  const shopExists = await Shop.findById(req.shop._id);

  const emailExists = await Shop.findOne({ email: email });

  if (emailExists) {
    res.status(406);
    throw new Error("That Email already in use!");
  }

  if (shopExists) {
    shopExists.email = email || shopExists.email;
    shopExists.phone = phone || shopExists.phone;
    shopExists.shopName = shopName || shopExists.shopName;
    shopExists.state = state || shopExists.state;
    shopExists.district = district || shopExists.district;
    shopExists.storeType = storeType || shopExists.storeType;
    shopExists.aboutShop = aboutShop || shopExists.aboutShop;
    shopExists.place = place || shopExists.place;

    if (password.trim() !== "") {
      shopExists.password = password;
    }
    if (req.files["shopLogo"]) {
      if (shopExists.shopLogo) {
        fs.unlinkSync(shopExists.shopLogo);
      }
      shopExists.shopLogo = req.files["shopLogo"][0].path;
    }

    if (req.files["shopBanner"]) {
      if (shopExists.shopBanner) {
        fs.unlinkSync(shopExists.shopBanner);
      }
      shopExists.shopBanner = req.files["shopBanner"][0].path;
    }

    const updatedShop = await shopExists.save();

    if (updatedShop) {
      let stateName = await State.findById(updatedShop.state).select("state");
      let districtName = await District.findById(updatedShop.district).select(
        "district"
      );
      let storeName = await Store.findById(updatedShop.storeType).select(
        "store"
      );

      res.json({
        shopId: updatedShop.shopId,
        email: updatedShop.email,
        shopName: updatedShop.shopName,
        phone: updatedShop.phone,
        place: updatedShop.place,
        state: stateName ? stateName : "Invalid Data",
        district: districtName ? districtName : "Invalid Data",
        storeType: storeName ? storeName : "Invalid Data",
        aboutShop: updatedShop.aboutShop,
        shopLogo: updatedShop.shopLogo,
        shopBanner: updatedShop.shopBanner,
      });
    } else {
      res.status(406);
      throw new Error("Data is not valid!");
    }
  } else {
    res.status(404);
    throw new Error("Shop doesn't exist!");
  }
});

// @desc remove shop data due to account deletion
// @route POST /api/shop/delete
// @access private
const deleteShop = AsyncHandler(async (req, res) => {
  const { password } = req.body;
  const shop = await Shop.findById(req.shop._id);

  if (shop && (await shop.matchPassword(password))) {
    if (shop.shopLogo) fs.unlinkSync(shop.shopLogo);
    if (shop.shopBanner) fs.unlinkSync(shop.shopBanner);

    await shop.remove();
    res.json({ status: "Accout has been deleted!" });
  } else {
    res.status(404);
    throw new Error("Invalid Data!");
  }
});

// @desc get shop page
// @route GET /api/shop/info/:shopId
// @access public
const getShopPage = AsyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findOne({ shopId })
    .populate({ path: "storeType" })
    .populate({ path: "district", select: "district" })
    .populate({ path: "state", select: "state" });

  if (shop) {
    res.status(200).json({
      shop,
    });
  } else {
    res.status(404);
    throw new Error("Page not found!");
  }
});

export { signupAsShop, loginAsShop, updateShop, deleteShop, getShopPage };
