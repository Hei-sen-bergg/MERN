const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;  // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Store the userId in the request for further use
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
