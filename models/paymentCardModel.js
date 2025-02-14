import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    cardInfo: {
      type: String,
      required: [true, "Please provide a card number"],
      match: [/^\d{16}$/, "Invalid card number"],
    },
    expDate: {
      type: String,
      required: [true, "Please provide the card expiry date"],
      match: [/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)"],
    },
    cvv: {
      type: String,
      required: [true, "Must provide a CVV number"],
      match: [/^\d{3,4}$/, "Invalid CVV"],
    },
    nameOnCard: {
      type: String,
      required: [true, "Please provide the name on the card"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Must Provide userId"],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
