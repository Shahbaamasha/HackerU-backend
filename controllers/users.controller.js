const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { email, isAdmin } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUsers = await User.countDocuments();
    if (typeof isAdmin !== "undefined" && !req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can create other admin users." });
    }

    const newUser = new User({
      ...req.body,
      isAdmin: existingUsers === 0 ? true : isAdmin,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not exists" });
    }
    if (user.isLocked()) {
      return res.status(403).json({ message: 'Account is locked. Please try again later.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await user.incLoginAttempts();
      return res.status(400).json({ message: "Invalid password" });
    }

    await user.updateOne({ $set: { failedLoginAttempts: 0, lockUntil: null } });

    const token = jwt.sign(
      {
        userId: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(err.message);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (typeof req.body.isAdmin !== "undefined" && !req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can create other admin users." });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(err.message);
    next(error);
  }
};

const changeIsBusinessStatus = async (req, res, next) => {
  try {
    const { isBusiness } = req.body;
    if (typeof isBusiness === "undefined") {
      return res
        .status(400)
        .json({ message: "Only the 'isBusiness' field can be updated." });
    }
    if (typeof isBusiness !== "boolean") {
      return res
        .status(400)
        .json({ message: "isBusiness must be a boolean value." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBusiness },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(err);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user && !req.isAdmin) {
      return res
        .status(403)
        .json({ message: "don't have permission to delete the user" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).send(err.message);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  getUserById,
  changeIsBusinessStatus,
  deleteUser,
};
