import mongoose from "mongoose";

const passwordRecoverySchema = mongoose.Schema(
  {
    userDataBaseId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    securityCode: {
      type: String,
      required: true,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordRecovery = mongoose.model(
  "PasswordRecovery",
  passwordRecoverySchema
);

export default PasswordRecovery;
