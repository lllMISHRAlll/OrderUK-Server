import express from "express";
import { addproduct } from "../controllers/product.js";

const router = express.Router();

router.post("/addproduct", addproduct);

export default router;
