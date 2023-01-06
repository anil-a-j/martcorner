import AsyncHandler from "express-async-handler";
import Shop from "../models/shopModel.js";
import Customer from "../models/customerModel.js";
import { passwordResetLinkMail } from "../utils/sendMail.js";
import PasswordRecovery from "../models/passwordRecoveryModel.js";
import { v4 as uuidv4 } from "uuid";
import { passwordChange } from "../utils/htmlTemplate.js";
import FavoriteShop from "../models/favoriteShopModel.js";

// @desc reset password of an account
// @route POST /api/utility/pwd/reset
// @access public
const passwordReset = AsyncHandler(async (req, res) => {
  const { email, userType } = req.body;

  switch (userType) {
    case "customer": {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        res.status(404);
        throw new Error("No account exists");
      }

      const securityCode = uuidv4().replaceAll("-", "");

      const passwordRecoveryDB = await PasswordRecovery.create({
        userDataBaseId: customer._id,
        userType,
        securityCode,
      });

      if (passwordRecoveryDB) {
        const status = await passwordResetLinkMail(
          customer.email,
          "Password Update",
          passwordChange(securityCode)
        );
        if (status.code === 200) {
          res
            .status(200)
            .json({ status: "Message has been sent Please check your email!" });
        } else {
          res.status(401);
          throw new Error("Someting went wrong!");
        }
      }

      break;
    }
    case "shop": {
      const shop = await Shop.findOne({ email });
      if (!shop) {
        res.status(404);
        throw new Error("No account exists");
      }

      const securityCode = uuidv4();

      const passwordRecoveryDB = await PasswordRecovery.create({
        userDataBaseId: shop._id,
        userType,
        securityCode,
      });

      if (passwordRecoveryDB) {
        const status = await sendMail(
          shop.email,
          "Password Update",
          passwordChange(securityCode)
        );
        if (status.code === 200) {
          res.status(200).json({
            status: "Message has been sent. Please check your email!",
          });
        } else {
          res.status(401);
          throw new Error("Someting went wrong!");
        }
      }
      break;
    }
    default: {
      res.status(404);
      throw new Error("No account exists");
    }
  }
});

// @desc check validity of securitycode
// @route POST /api/utility/pwd/check/:securitycode
// @access public
const securityCodeCheck = AsyncHandler(async (req, res) => {
  const { securitycode } = req.params;
  const secuirtyCodeExists = await PasswordRecovery.findOne({
    securityCode: securitycode,
    expired: false,
  });

  if (secuirtyCodeExists) {
    const createdTimeMinutes =
      new Date(secuirtyCodeExists.createdAt).getTime() / 1000 / 60;

    const currentTimeMinutes = Date.now() / 1000 / 60;

    const interval = Math.ceil(currentTimeMinutes - createdTimeMinutes);

    if (interval > 5) {
      res.status(400);
      throw new Error("Link expired!");
    }

    res.status(200).json({ status: "Valid link" });
  } else {
    res.status(400);
    throw new Error("Invalid URL");
  }
});

// @desc create new password
// @route POST /api/utility/pwd/create
// @access public
const createNewPassword = AsyncHandler(async (req, res) => {
  const { securitycode, password } = req.body;
  const secuirtyCodeExists = await PasswordRecovery.findOne({
    securityCode: securitycode,
    expired: false,
  });
  if (secuirtyCodeExists && password) {
    switch (secuirtyCodeExists.userType) {
      case "customer": {
        const customer = await Customer.findById(
          secuirtyCodeExists.userDataBaseId
        );

        if (customer) {
          if (password.trim() !== "") customer.password = password;
        }
        const updatedCustomer = await customer.save();
        secuirtyCodeExists.expired = true;
        await secuirtyCodeExists.save();
        if (updatedCustomer)
          res.status(200).json({ status: "Password Changed Successfully" });
        break;
      }
      case "shop": {
        const shop = await Shop.findById(secuirtyCodeExists.userDataBaseId);

        if (shop) {
          if (password.trim() !== "") shop.password = password;
          const updatedShop = await shop.save();
          secuirtyCodeExists.expired = true;
          await secuirtyCodeExists.save();
          if (updatedShop)
            res.status(200).json({ status: "Password Changed Successfully" });
        }
        break;
      }
      default: {
        res.status(401);
        throw new Error("Something went wrong!");
      }
    }
  }
});

// @desc add shop to favorite
// @route POST /api/utility/favorite/shop/add
// @access private
const addToFavoriteShop = AsyncHandler(async (req, res) => {
  const { id: shop_id } = req.body;

  const { id: customer_id } = req.customer;

  let favorite = null;

  const favShopExisted = await FavoriteShop.find({
    customer: customer_id,
    shops: shop_id,
  });

  if (favShopExisted.length !== 0) {
    res.status(409);
    throw new Error("Shop already added");
  }

  const existingFavDoc = await FavoriteShop.find({ customer: customer_id });

  if (existingFavDoc.length !== 0) {
    favorite = await FavoriteShop.updateOne(
      { customer: customer_id },
      { $push: { shops: shop_id } },
      { runValidators: true }
    );
  } else {
    favorite = await FavoriteShop.create({
      customer: customer_id,
      shops: [shop_id],
    });
  }

  if (favorite) {
    const shopFavCustomerExisted = await Shop.find({
      _id: shop_id,
      favCustomers: customer_id,
    });

    if (shopFavCustomerExisted.length !== 0) {
      res.status(409);
      throw new Error("Shop already existed");
    }

    const shopFavCustomer = await Shop.updateOne(
      { _id: shop_id },
      { $push: { favCustomers: customer_id } },
      { runValidators: true }
    );

    if (shopFavCustomer) {
      res.status(201).json({ status: "Shop added to favorites", shop_id });
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc remove shop from favorite
// @route POST /api/utility/favorite/shop/remove
// @access private
const removeFromFavoriteShop = AsyncHandler(async (req, res) => {
  const { id: shop_id } = req.body;

  const { id: customer_id } = req.customer;

  const findAndUpdateFavoriteShop = await FavoriteShop.findOneAndUpdate(
    { customer: customer_id },
    { $pull: { shops: shop_id } },
    { runValidators: true }
  );

  if (findAndUpdateFavoriteShop) {
    const findandUpdateShop = await Shop.updateOne(
      { _id: shop_id },
      { $pull: { favCustomers: customer_id } },
      { runValidators: true }
    );

    if (findandUpdateShop.acknowledged) {
      res.status(201).json({ status: "Shop removed from favorites", shop_id });
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

export {
  passwordReset,
  securityCodeCheck,
  createNewPassword,
  addToFavoriteShop,
  removeFromFavoriteShop,
};
