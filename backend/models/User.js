// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "usher"], default: "usher" }
});

const User = mongoose.model("User", userSchema);

export default User; // ✅ default export for ES modules