import Youth from "../models/Youth.js";
import jwt from "jsonwebtoken";

// Registration (unprotected)
export const createYouth = async (req, res) => {
  try {
    const youth = await Youth.create(req.body);
    const token = jwt.sign(
      { id: youth._id, fullName: youth.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ youth, token });
  } catch (err) {
    console.error("Youth registration error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all youth
export const getAllYouth = async (req, res) => {
  try {
    const youth = await Youth.find().sort({ createdAt: -1 });
    res.json(youth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check-in youth
export const checkInYouth = async (req, res) => {
  try {
    const youth = await Youth.findByIdAndUpdate(
      req.params.id,
      { checkedIn: true },
      { new: true }
    );
    res.json(youth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete youth
export const deleteYouth = async (req, res) => {
  try {
    await Youth.findByIdAndDelete(req.params.id);
    res.json({ message: "Youth deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search youth by phone
export const searchYouthByPhone = async (req, res) => {
  try {
    const youth = await Youth.find({ phone: req.params.phone });
    res.json(youth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};