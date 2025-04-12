const { Workout } = require("../models");

const addWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Faild to add workout" });
  }
};

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch workouts" });
  }
};

module.exports = { addWorkout, getAllWorkouts };
