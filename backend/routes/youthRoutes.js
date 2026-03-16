import { Router } from "express";
import { createYouth, getAllYouth, checkInYouth } from "../controllers/youthController.js";
import auth from "../middleware/auth.js";

const router = Router();

// Registration route (no auth required)
router.post("/", createYouth);

// Protected routes
router.get("/", auth, getAllYouth);
router.patch("/:id/checkin", auth, checkInYouth);

export default router;