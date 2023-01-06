import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    customerName: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
