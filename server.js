import express from "express";
import connectToDB from "./utils/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import cardRouter from "./routes/paymentCard.js";
import productRouter from "./routes/product.js";
import addressRouter from "./routes/address.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://order-uk-client-naol.vercel.app",
    "https://order-uk-client.vercel.app/",
  ],
  credentials: true,
};

dotenv.config();
connectToDB();
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use("/api/user", authRouter);
app.use("/api/productpage", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/card", cardRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

module.exports = app;
