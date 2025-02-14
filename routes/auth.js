import express from "express";
import { getUserInfo, login, signUp } from "../controllers/auth.js";
import { verifyToken } from "../middlware/verify.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/userinfo", verifyToken, getUserInfo);

export default router;
