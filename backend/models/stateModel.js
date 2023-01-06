import mongoose from "mongoose";

const stateSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
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

const State = mongoose.model("State", stateSchema);

export default State;
