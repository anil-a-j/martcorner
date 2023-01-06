import mongoose from "mongoose";

const favoriteShopSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    shops: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Shop" },
    ],
  },
  { timestamps: true }
);

const FavoriteShop = mongoose.model("FavoriteShop", favoriteShopSchema);

export default FavoriteShop;
