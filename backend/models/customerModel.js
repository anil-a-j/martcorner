import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const customerSchema = mongoose.Schema(
  {
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
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    place: {
      type: String,
      required: false,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "District",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "State",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "632e37235f0cbff425d91d76",
      ref: "Country",
    },
    favoriteShops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Shop",
      },
    ],
    phone: {
      type: Number,
      required: false,
      unique: false,
      min: [10, "Must be 10 digit number"],
    },
    pincode: {
      type: Number,
      required: false,
      min: [6, "Must be 6 digit number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return v.length < 8 ? false : true;
        },
        message: () => `Password should be contain at least 8 characters`,
      },
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
