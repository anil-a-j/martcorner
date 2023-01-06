import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
  {
    store: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
