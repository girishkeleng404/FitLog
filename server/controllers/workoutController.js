const { Workout } = require("../models");

const addWorkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, duration, date, calories } = req.body;

    // const workout = await Workout.create(req.body);
    const workout = await Workout.create({
      type,
      duration,
      date,
      calories,
      userId, // ✅ associate workout with the logged-in user
    });

    res.status(201).json(workout);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Faild to add workout" });
  }
};

const getAllWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;

    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch workouts" });
  }
};

module.exports = { addWorkout, getAllWorkouts };
