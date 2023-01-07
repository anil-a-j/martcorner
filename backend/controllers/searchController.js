import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Shop from "../models/shopModel.js";
import FavoriteShop from "../models/favoriteShopModel.js";

// @desc get shop products based on query for shop owner account
// @route GET /api/search/shop/products/:query
// @access private
const getShopSearchProducts = AsyncHandler(async (req, res) => {
  const { query, pagesize, id } = req.query;

  const page = Number(req.query.page) || 1;

  console.log("here i am");

  const filter = {
    productName: { $regex: query, $options: "i" },
    productShop: id,
  };

  const count = await Product.countDocuments({ ...filter });

  const products = await Product.find({ ...filter })
    .populate({ path: "productShop", select: "shopName shopId" })
    .limit(pagesize)
    .skip(pagesize * (page - 1));

  if (products) {
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pagesize), query });
  } else {
    res.status(404);
    throw new Error("No Products");
  }
});

// @desc customer get shop products based on query
// @route GET /api/search/customer/products?product=${product}&place=${place}&district=${district}&state=${state}
// @access private
const getCustomerSearchProducts = AsyncHandler(async (req, res) => {
  const { query, searchType, district, state, customerId } = req.query;

  const page = Number(req.query.page) || 1;
  const pagesize = Number(req.query.pageSize) || 15;

  let filter = null;
  let count = null;

  if (state && district) {
    switch (searchType) {
      case "storeType": {
        filter = {
          storeType: query,
          state,
          district,
        };
        count = await Shop.countDocuments({ ...filter });
        const shops = await Shop.find({ ...filter })
          .select(
            "-password -email -district -state -country -phone -place -numReviews -reviews"
          )
          .populate("storeType")
          .populate({
            path: "favCustomers",
            match: { _id: { $eq: customerId } },
            select: "_id",
          })
          .limit(pagesize)
          .skip(pagesize * (page - 1));

        if (shops) {
          res.status(200).json({
            shops,
            page,
            pages: Math.ceil(count / pagesize),
            query,
            searchType,
            district,
            state,
          });
        } else {
          res.status(404);
          throw new Error("No Result");
        }

        break;
      }
      case "productName": {
        filter = {
          productName: { $regex: query, $options: "i" },
          state,
          district,
        };
        count = await Product.countDocuments({ ...filter });
        const products = await Product.find({ ...filter })
          .populate({
            path: "productShop",
            select: "shopId shopName",
          })
          .limit(pagesize)
          .skip(pagesize * (page - 1));

        // /* multi level populate example */
        // .populate({
        //   path: "productShop",
        //   populate: [
        //     {
        //       path: "state",
        //       match: { _id: { $eq: state } },
        //     },
        //     {
        //       path: "district",
        //       match: { _id: { $eq: district } },
        //     },
        //   ],
        // })

        if (products) {
          res.status(200).json({
            products,
            page,
            pages: Math.ceil(count / pagesize),
            query,
            searchType,
            district,
            state,
          });
        } else {
          res.status(404);
          throw new Error("No Result");
        }
        break;
      }
      case "shopName": {
        filter = {
          shopName: { $regex: query, $options: "i" },
          state,
          district,
        };
        count = await Shop.countDocuments({ ...filter });
        const shops = await Shop.find({ ...filter })
          .select(
            "-password -email -district -state -country -phone -place -numReviews -reviews"
          )
          .populate("storeType")
          .populate({
            path: "favCustomers",
            match: { _id: { $eq: customerId } },
            select: "_id",
          })
          .limit(pagesize)
          .skip(pagesize * (page - 1));

        if (shops) {
          res.status(200).json({
            shops,
            page,
            pages: Math.ceil(count / pagesize),
            query,
            searchType,
            district,
            state,
          });
        } else {
          res.status(404);
          throw new Error("No Result");
        }

        break;
      }
      default: {
        res.status(400);
        throw new Error("Bad request");
      }
    }
  }
});

// @desc get favorite shops of a customer
// @route GET /api/search/favorite/shops
// @access private
const getSearchFavoriteShop = AsyncHandler(async (req, res) => {
  const { id: customer_id } = req.customer;
  const { query } = req.query;
  const page = Number(req.query.page) || 1;
  const pagesize = req.query.pageSize || 15;

  const customerFavoriteShops = await FavoriteShop.find({
    customer: customer_id,
  }).populate({
    path: "shops",
    match: { shopName: { $regex: query, $options: "i" } },
    select:
      "-password -email -district -state -country -phone -place -numReviews -reviews -createdAt -updatedAt -__v",
    options: { limit: pagesize, skip: pagesize * (page - 1) },
  });

  const count = customerFavoriteShops[0].shops.length;

  if (customerFavoriteShops) {
    res.status(200).json({
      shops: customerFavoriteShops[0].shops,
      page,
      pages: Math.ceil(count / pagesize),
      query,
    });
  } else {
    res.status(404);
    throw new Error("No favorite shops!");
  }
});

export {
  getShopSearchProducts,
  getCustomerSearchProducts,
  getSearchFavoriteShop,
};
