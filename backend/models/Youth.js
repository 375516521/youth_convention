import mongoose from "mongoose";

const youthSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    congregation: { type: String, required: true },
    talent: { type: String },
    phone: { type: String, required: true },
    emergencyContact: { type: String },
    allergies: { type: String },
    mpesaCode: { type: String },
    amountPaid: { type: Number },
    gender: { type: String, enum: ["Male", "Female"] },
    age: { type: Number },
    checkedIn: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Youth = mongoose.model("Youth", youthSchema);

export default Youth;