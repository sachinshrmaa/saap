import jwt from "jsonwebtoken";

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || "1d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
