import express from "express";
import {
  addCard,
  deleteCard,
  getCard,
  updateCard,
} from "../controllers/paymentCard.js";
import { verifyToken } from "../middlware/index.js";

const router = express.Router();

router.get("/get", verifyToken, getCard);
router.post("/add", verifyToken, addCard);
router.patch("/update/:id", verifyToken, updateCard);
router.delete("/delete/:id", verifyToken, deleteCard);

export default router;
