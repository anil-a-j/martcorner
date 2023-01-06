import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productShop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    productImages: [
      {
        type: String,
        required: false,
      },
    ],
    productUnit: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      // price is not mandatory
      required: false,
    },
    productDiscount: {
      type: Number,
      required: false,
    },
    productAvailable: {
      type: Boolean,
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: false,
    },
    productNewPrice: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    place: {
      type: String,
      required: false,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "District",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "State",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "632e37235f0cbff425d91d76",
      ref: "Country",
    },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (!this.isModified("productDiscount")) next();
  if (this.productDiscount) {
    this.productNewPrice =
      this.productPrice - this.productPrice * (this.productDiscount / 100);
  }
  if (this.productDiscount == 0) {
    this.productDiscount = null;
    this.productNewPrice = null;
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
