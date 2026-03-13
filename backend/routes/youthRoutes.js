const express = require("express");
const router = express.Router();
const {
  createYouth,
  getAllYouth,
  checkInYouth
} = require("../controllers/youthController");

router.post("/", createYouth);
router.get("/", getAllYouth);
router.patch("/:id/checkin", checkInYouth);

const auth = require("../middleware/auth");
router.post("/", auth, createYouth);
router.get("/", auth, getAllYouth);

module.exports = router;
