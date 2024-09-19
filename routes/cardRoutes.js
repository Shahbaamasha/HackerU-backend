const express = require("express");
const router = express.Router();
const {
  getAllCards,
  getUserCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
} = require("../controllers/cards.controller");
const isBusinessUser = require("../middlewares/isBusinessUser");
const verifyToken = require("../middlewares/auth");
const { cardValidationSchema } = require("../validation/card");
const validate = require("../middlewares/validate");

router.get("/", getAllCards);

router.get("/my-cards", verifyToken, getUserCards);

router.get("/:id", getCard);

router.post("/", verifyToken, isBusinessUser, validate(cardValidationSchema), createCard);

router.put("/:id", verifyToken, updateCard);

router.patch("/:id", verifyToken, likeCard);

router.delete("/:id", verifyToken, deleteCard);

module.exports = router;
