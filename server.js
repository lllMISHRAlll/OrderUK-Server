import express from "express";
import connectToDB from "./utils/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import cardRouter from "./routes/paymentCard.js";
import productRouter from "./routes/product.js";
import addressRouter from "./routes/address.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://order-uk-client-naol.vercel.app",
    "https://order-uk-client.vercel.app",
  ],
  credentials: true,
};

connectToDB();

app.use(cors(corsOption));
app.options("*", cors(corsOption));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOption.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());

app.use("/api/user", authRouter);
app.use("/api/productpage", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/card", cardRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Backend serve is up and runnning!!!",
  });
});

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });
}

export default app;
