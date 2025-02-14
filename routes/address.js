import express from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAllAddresses,
} from "../controllers/address.js";
import { verifyToken } from "../middlware/index.js";

const router = express.Router();

router.get("/", verifyToken, getAllAddresses);
router.post("/add", verifyToken, addAddress);
router.put("/edit/:id", verifyToken, editAddress);
router.delete("/delete/:id", verifyToken, deleteAddress);

export default router;
