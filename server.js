import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// database conn

connectDb();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ message: "E-commerce App" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
