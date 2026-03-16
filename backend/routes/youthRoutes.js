import { Router } from "express";
import {
  createYouth,
  getAllYouth,
  checkInYouth,
  deleteYouth,
  searchYouthByPhone,
} from "../controllers/youthController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", createYouth);          // registration
router.get("/", auth, getAllYouth);    // list all
router.get("/search/:phone", auth, searchYouthByPhone); // search
router.patch("/:id/checkin", auth, checkInYouth);
router.delete("/:id", auth, deleteYouth);

export default router;