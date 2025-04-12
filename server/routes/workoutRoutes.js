const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getAllWorkouts,
} = require("../controllers/workoutController");

router.post("/add", addWorkout);
router.get("/", getAllWorkouts);

module.exports = router;
