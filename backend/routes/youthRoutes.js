import { Router } from "express";
import {
  createYouth,
  getAllYouth,
  checkInYouth,
  deleteYouth,
  searchYouthByPhone,
} from "../controllers/youthController.js";
import adminCheck from "../middleware/adminCheck.js";

const router = Router();

// Public registration route (anyone can register)
router.post("/", createYouth);

// Admin-protected routes
router.get("/", adminCheck, getAllYouth);
router.get("/search/:phone", adminCheck, searchYouthByPhone);
router.patch("/:id/checkin", adminCheck, checkInYouth);
router.delete("/:id", adminCheck, deleteYouth);

export default router;