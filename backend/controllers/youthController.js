const Youth = require("../models/Youth");

// Create youth
exports.createYouth = async (req, res) => {
  try {
    const youth = await Youth.create(req.body);
    res.status(201).json(youth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all youth
exports.getAllYouth = async (req, res) => {
  try {
    const youth = await Youth.find().sort({ createdAt: -1 });
    res.json(youth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-in youth
exports.checkInYouth = async (req, res) => {
  try {
    const youth = await Youth.findByIdAndUpdate(
      req.params.id,
      { checkedIn: true },
      { new: true }
    );
    res.json(youth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
