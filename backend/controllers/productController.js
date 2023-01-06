import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import fs from "fs";
import Shop from "../models/shopModel.js";

// @desc add new product in shop
// @route POST /api/product/addproduct
// @access private
const addProduct = AsyncHandler(async (req, res) => {
  const {
    productName,
    productId,
    productPrice,
    productDiscount,
    productStock,
    productUnit,
    productAvailable,
    productDescription,
  } = req.body;

  if (productId) {
    const productExists = await Product.find({ productId: productId });

    if (productExists.length !== 0) {
      res.status(400);
      throw new Error("product exists already");
    }
  }

  const shop = await Shop.findById(req.shop._id);

  let productIdCreated;
  let count = await Product.estimatedDocumentCount();

  if (!productId) {
    productIdCreated = `${shop.shopId}pd${count + 1}`;
  }

  let shopDistrict = shop.district;
  let shopState = shop.state;
  let shopCountry = shop.country;
  let place = shop.place;

  let images = [];

  if (req.files) {
    images[0] = req.files["productImage1"]
      ? req.files["productImage1"][0].path
      : undefined;
    images[1] = req.files["productImage2"]
      ? req.files["productImage2"][0].path
      : undefined;
  }

  const product = await Product.create({
    productImages: images,
    productName,
    productId: productId ? productId : productIdCreated,
    productPrice,
    productShop: req.shop._id,
    productDiscount,
    productStock,
    productUnit,
    productAvailable,
    productDescription,
    place,
    district: shopDistrict,
    state: shopState,
    country: shopCountry,
  });
  if (product) {
    res.status(201).json({ status: "Product is added!" });
  } else {
    res.status(400);
    throw new Error("Invalid product data!");
  }
});

// @desc edit existing product
// @route POST /api/product/editproduct
// @access private
const editProduct = AsyncHandler(async (req, res) => {
  const {
    id,
    productName,
    productId,
    productPrice,
    productDiscount,
    productStock,
    productUnit,
    productAvailable,
    productDescription,
    deleteImage2,
  } = req.body;

  const productExists = await Product.findOne({
    _id: id,
    productShop: req.shop._id,
  });

  if (productExists) {
    productExists.productName = productName || productExists.productName;
    productExists.productId = productId || productExists.productId;
    productExists.productPrice = productPrice || productExists.productPrice;
    productExists.productDiscount =
      productDiscount || productExists.productDiscount;
    productExists.productStock = productStock || productExists.productStock;
    productExists.productUnit = productUnit || productExists.productUnit;
    productExists.productAvailable =
      productAvailable || productExists.productAvailable;
    productExists.productDescription =
      productDescription || productExists.productDescription;

    // store first image
    if (req.files["productImage1"]) {
      productExists.productImages[0] &&
        fs.unlinkSync(productExists.productImages[0]);
      productExists.productImages[0] = req.files["productImage1"][0].path;
    }
    // store second image
    if (req.files["productImage2"]) {
      productExists.productImages[1] &&
        fs.unlinkSync(productExists.productImages[1]);
      productExists.productImages[1] = req.files["productImage2"][0].path;
    }
    // no second image and delete second old image
    if (!req.files["productImage2"] && deleteImage2) {
      productExists.productImages[1] &&
        fs.unlinkSync(productExists.productImages[1]);
      productExists.productImages[1] = null;
    }

    const updatedProduct = await productExists.save();
    if (updatedProduct) {
      const populatedData = await updatedProduct.populate({
        path: "productShop",
        select: "shopName",
      });

      res
        .status(201)
        .json({ status: "Product is edited!", product: populatedData });
    }
  } else {
    res.status(404);
    throw new Error("Prodict doesn't exist!");
  }
});

// @desc check product id exists or not
// @route GET /api/product/checkid/:id
// @access private
const checkProductId = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const idExists = await Product.findOne({
    productId: id,
    productShop: req.shop._id,
  });

  if (idExists) {
    res.status(406);
    throw new Error("Id is not available!");
  } else {
    res.status(200).json({ available: "Id is available" });
  }
});

// /* example of promise all beaucase different promises loop */
// const result = Promise.all(
//   products.map(async (product, id) => {
//     let category = await ProductCategory.findById(
//       product.productCategory
//     ).select("productCategory");
//     return {
//       ...product._doc,
//       productCategory: category.productCategory,
//     };
//   })
// );
// const data = await result;

// @desc delete a product
// @route GET /api/product/delete/:id
// @access private
const deleteProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    product.productImages[0] && fs.unlinkSync(product.productImages[0]);
    product.productImages[1] && fs.unlinkSync(product.productImages[1]);
    await product.remove();
    res.json({ status: "Product has been deleted!", product: { _id: id } });
  } else {
    res.status(404);
    throw new Error("Invalid Data!");
  }
});

export { addProduct, checkProductId, editProduct, deleteProduct };
