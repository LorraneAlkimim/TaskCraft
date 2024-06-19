import jwt from "jsonwebtoken";

import User from "../models/User.js";

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userEmail = decoded.email;
    const userId = await User.findOne({ email: userEmail })
      .then((user) => user.id)
      .catch((error) => error);
    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
