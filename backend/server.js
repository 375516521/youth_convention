
// server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes (note the .js extension)
import authRoutes from "./routes/authRoutes.js";
import youthRoutes from "./routes/youthRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // remove trailing slash
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/youth", youthRoutes);

// Root route / health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));