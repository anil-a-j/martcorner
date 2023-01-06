import mongoose from "mongoose";

const districtSchema = mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "State",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  }
);

const District = mongoose.model("District", districtSchema);

export default District;
