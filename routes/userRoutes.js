const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  getUserById,
  updateUser,
  changeIsBusinessStatus,
  deleteUser,
} = require("../controllers/users.controller");
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/auth");
const { userValidationSchema, updateUserValidationSchema } = require("../validation/user");
const validate = require("../middlewares/validate");

router.post("/", validate(userValidationSchema), createUser);

router.post("/admin", verifyToken, isAdmin, createUser);

router.post("/login", loginUser);

router.get("/", verifyToken, isAdmin, getAllUsers);

router.get("/:id", verifyToken, getUserById);

router.put("/:id", verifyToken, validate(updateUserValidationSchema), updateUser);

router.patch("/:id", verifyToken, changeIsBusinessStatus);

router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
