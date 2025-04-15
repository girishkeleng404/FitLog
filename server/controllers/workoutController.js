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

    const workouts = await Workout.findAll({
      where: { userId },
      order: [["date", "DESC"]], // optional, to sort by date
    });
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch workouts" });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workoutId = parseInt(req.params.id);
    // console.log("Decoded user:", req.user);
    const loggedInUserId = req.user.id;

    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.userId !== loggedInUserId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await workout.update(req.body);
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: "Faild to update workout" });
  }
};

const deleteWorkout = async (req, res) => {
  const workoutId = parseInt(req.params.id);
  console.log("Decoded user:", req.user);
  const loggedInUserId = req.user.id;
  try {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.userId !== loggedInUserId) {
      return res.status(403).json({ message: "Access denied" });
    }
    await workout.destroy();
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete workout" });
  }
};

module.exports = { addWorkout, getAllWorkouts, updateWorkout, deleteWorkout };
