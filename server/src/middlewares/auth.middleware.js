import { verifyToken } from "../utils/auth.utils.js";
import { findUserById } from "../repository/users.js";

const requireAuth = async (req, res, next) => {
  // get the token from the cookies
  const token = req.cookies.accessToken;

  // check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // verify the token
  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    return res.status(401).json({ message: `Unauthorized, failed to validate access token. ${err.message}`});
  }

  // check if the payload has userId
  if (!payload && !payload.userId)
    return res.status(401).json({ message: "Unauthorized, invalid JWT Token" });

  // check if the user exists
  let user = await findUserById(payload.userId);
  if (user === null) {
    return res.status(401).json({ message: "Unauthorized, user not found" });
  }
  // set the user in the request object
  user.password = undefined;
  req.user = user;
  next();
};

export { requireAuth };