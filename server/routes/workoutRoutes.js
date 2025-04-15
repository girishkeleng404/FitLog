const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const authMiddleWare = require("../middleware/auth");

router.post("/add", authMiddleWare, addWorkout);
router.get("/", authMiddleWare, getAllWorkouts);

router.put("/:id", authMiddleWare, updateWorkout);
router.delete("/:id", authMiddleWare, deleteWorkout);
module.exports = router;
