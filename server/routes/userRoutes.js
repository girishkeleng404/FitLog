const express = require("express");
const router = express.Router();
const { getUserWorkouts } = require("../controllers/userController");

router.get("/users/:id/workouts", getUserWorkouts);

module.exports = router;
