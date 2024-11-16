import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// database conn

connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send({ message: "E-commerce App" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
