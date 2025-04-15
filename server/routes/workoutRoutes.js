const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getAllWorkouts,
} = require("../controllers/workoutController");

const authMiddleWare = require("../middleware/auth");

router.post("/add", authMiddleWare, addWorkout);
router.get("/", authMiddleWare, getAllWorkouts);

module.exports = router;
