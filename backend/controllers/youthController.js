// controllers/youthController.js
import Youth from "../models/Youth.js";
import jwt from "jsonwebtoken";

// -----------------------------
// Create youth (registration) ✅ generates JWT
// -----------------------------
export const createYouth = async (req, res) => {
  try {
    // 1️⃣ Create new youth in DB
    const youth = await Youth.create(req.body);

    // 2️⃣ Generate JWT token for frontend
    const token = jwt.sign(
      { id: youth._id, fullName: youth.fullName }, // use the correct field from your model
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // token valid for 1 hour
    );

    // 3️⃣ Send both youth data and token to frontend
    res.status(201).json({ youth, token });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------
// Get all youth (protected route)
// -----------------------------
export const getAllYouth = async (req, res) => {
  try {
    const youth = await Youth.find().sort({ createdAt: -1 });
    res.json(youth);
  } catch (error) {
    console.error("Error fetching youth:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------
// Check-in youth (protected route)
// -----------------------------
export const checkInYouth = async (req, res) => {
  try {
    const youth = await Youth.findByIdAndUpdate(
      req.params.id,
      { checkedIn: true },
      { new: true }
    );
    res.json(youth);
  } catch (error) {
    console.error("Error checking in youth:", error.message);
    res.status(500).json({ message: error.message });
  }
};