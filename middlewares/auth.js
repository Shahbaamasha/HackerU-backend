const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.isBusiness = decoded.isBusiness;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
    next(error);
  }
};

module.exports = verifyToken;