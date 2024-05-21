import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import connectDB from "./src/db/index.js";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
connectDB();

// CORS middleware
app.use(cors());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// routes
app.use("/api/v1/auth", authRoutes);

// server port
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
