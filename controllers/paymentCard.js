import Card from "../models/paymentCardModel.js";
import connectToDB from "../utils/connection.js";
import createError from "../utils/error.js";

export const addCard = async (req, res, next) => {
  try {
    const { cardInfo, expDate, cvv, nameOnCard } = req.body;

    if (!cardInfo || !expDate || !cvv || !nameOnCard) {
      return next(createError(400, "All fields are required"));
    }

    const existingCard = await Card.findOne({
      cardInfo,
      userId: req?.user?.userId,
    });
    if (existingCard) {
      return next(createError(400, "This card is already saved"));
    }

    await connectToDB();

    const newCard = new Card({
      cardInfo,
      expDate,
      cvv,
      nameOnCard,
      userId: req?.user?.userId,
    });
    await newCard.save();

    res.status(201).json({ message: "Card added successfully", card: newCard });
  } catch (error) {
    next(createError(500, error.message || "Internal Server Error"));
  }
};

export const updateCard = async (req, res, next) => {
  try {
    console.log(req.params);

    const { id } = req.params;
    const userId = req?.user?.userId;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!updatedCard) {
      return next(createError(404, "Card not found"));
    }

    res
      .status(200)
      .json({ message: "Card updated successfully", card: updatedCard });
  } catch (error) {
    next(createError(500, error.message || "Internal Server Error"));
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req?.user?.userId;
    const deletedCard = await Card.findByIdAndDelete({
      _id: id,
      userId,
    });

    if (!deletedCard) {
      return next(createError(404, "No Card found"));
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    next(createError(500, error.message || "Internal Server Error"));
  }
};
export const getCard = async (req, res, next) => {
  try {
    const card = await Card.find({ userId: req?.user?.userId });

    if (!card) {
      return next(createError(404, "Card not found"));
    }

    res.status(200).json({ message: "Card found", card });
  } catch (error) {
    next(createError(500, error.message || "Internal Server Error"));
  }
};
