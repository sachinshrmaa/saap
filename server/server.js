import dotenv from "dotenv";
import express from "express";

// server configuration
dotenv.config();
const app = express();

// base test route
app.get("/", (req, res) => {});

// server started
app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
