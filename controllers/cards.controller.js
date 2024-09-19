const { nextDay } = require("date-fns");
const Card = require("../models/Card");
const User = require("../models/User");

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getUserCards = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).send();
    }
    const cards = await Card.find({ email: user.email });
    if (!cards.length) {
      return res.status(404).json({ message: "No cards found for this user" });
    }
    res.status(200).json(cards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user cards", error: error.message });
    next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).send();
    }
    res.status(200).send(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const generateUniqueBizNumber = async () => {
  let bizNumber;
  let card;
  do {
    bizNumber = Math.floor(100000 + Math.random() * 900000);
    card = await Card.findOne({ bizNumber });
  } while (card);

  return bizNumber;
};

const createCard = async (req, res, next) => {
  try {
    const newCard = new Card({
      ...req.body,
      user_id: req.userId,
      bizNumber: generateUniqueBizNumber,
    });
    await newCard.save();
    res.status(201).json({ message: "Card created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (card.user_id.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only the user created the card can edit the card",
      });
    }

    //Bonus 1
    if (req.isAdmin) {
      if (req.body.bizNumber && req.body.bizNumber !== card.bizNumber) {
        const existingCard = await Card.findOne({ bizNumber });
        if (existingCard) {
          return res.status(400).json({
            message: "bizNumber already exists. Please use a different one.",
          });
        }
      }
    } else if (card.user_id.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this card" });
    }

    const updatedCard = await Card.findByIdAndUpdate(cardId, updates, {
      new: true,
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating card", error: error.message });
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (card.likes.includes(req.userId)) {
      return res
        .status(400)
        .json({ message: "User has already liked this card" });
    }
    card.likes.push(req.userId);
    const updatedCard = await card.save();
    res.status(200).json(updatedCard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating card", error: error.message });
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).send();
    }
    if (card.user_id.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({
        message: "Only the user created the card or admin can delete the card",
      });
    }

    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Card deleted successfully", card });
  } catch (error) {
    res.status(500).send(err.message);
    next(error);
  }
};

module.exports = {
  getAllCards,
  getUserCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
};
