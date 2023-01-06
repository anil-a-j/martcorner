import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

const shopSchema = mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    shopLogo: {
      type: String,
      required: false,
    },
    shopBanner: {
      type: String,
      required: false,
    },
    shopName: {
      type: String,
      required: true,
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
    phone: {
      type: Number,
      required: [true, "User phone number required"],
      unique: false,
      min: [10, "Must be 10 digit number"],
    },
    storeType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    place: {
      type: String,
      required: true,
    },
    aboutShop: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    favCustomers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
      },
    ],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

shopSchema.virtual("reviewsLength").get(function () {
  return this.reviews.length;
});

shopSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
