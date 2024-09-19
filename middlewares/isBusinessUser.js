const User = require("../models/User");

const isBusinessUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isBusiness) {
      return res
        .status(401)
        .json({ message: "Access denied. Business users only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = isBusinessUser;
