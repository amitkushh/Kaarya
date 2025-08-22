import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/mongoose";

//Custom Routes

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

//Middlewares
app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
),
  app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

//Custom Apies

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Database connection failed", err);
  });
