import jwt from "jsonwebtoken";

export const accessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_FIRST, {
    expiresIn: "30s",
  });
};

export const refreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_SECOND, {
    expiresIn: "30d",
  });
};
