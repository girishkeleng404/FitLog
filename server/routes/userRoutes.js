const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getUserWithWorkoutsController,
} = require("../controllers/userController");

// 🔐 Protected route to get a user's workouts
router.get("/users/workouts", authMiddleware, getUserWithWorkoutsController);

module.exports = router;
