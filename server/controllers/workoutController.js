const { Workout } = require("../models");

const workoutService = require("../services/workoutService");

const addWorkout = async (req, res) => {
  const t = await Workout.sequelize.transaction();

  try {
    const userId = req.user.id;

    const workout = await workoutService.createWorkout(userId, req.body, t);
    await t.commit();

    res.status(201).json({
      id: workout.userWorkoutId,
      type: workout.type,
      duration: workout.duration,
      calories: workout.calories,
      date: workout.date,
      createdAt: workout.createdAt,
    });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to add workout" });
  }
};

const getAllWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const workouts = await workoutService.getWorkouts(userId);

    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch workouts" });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const updated = await workoutService.updateWorkout(
      req.user.id,
      parseInt(req.params.id),
      req.body,
    );

    res.json({
      id: updated.userWorkoutId,
      type: updated.type,
      duration: updated.duration,
      calories: updated.calories,
      date: updated.date,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout" });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    await workoutService.deleteWorkout(req.user.id, parseInt(req.params.id));
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete workout" });
  }
};

module.exports = { addWorkout, getAllWorkouts, updateWorkout, deleteWorkout };
