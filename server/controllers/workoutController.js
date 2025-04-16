const { where } = require("sequelize");
const { Workout } = require("../models");

const { Sequelize } = require("../models");

const addWorkout = async (req, res) => {
  const t = await Workout.sequelize.transaction();

  try {
    const userId = req.user.id;
    const { type, duration, date, calories } = req.body;

    const lastWorkout = await Workout.findOne({
      where: { userId },
      order: [["userWorkoutId", "DESC"]],
      transaction: t,
      lock: t.LOCK.UPDATE, // Prevent race condition
    });

    const newUserWorkoutId = lastWorkout ? lastWorkout.userWorkoutId + 1 : 1;

    const workout = await Workout.create(
      {
        type,
        duration,
        date,
        calories,
        userId,
        userWorkoutId: newUserWorkoutId,
      },
      { transaction: t },
    );

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

    const workouts = await Workout.findAll({
      where: { userId },
      order: [["date", "DESC"]], // optional, to sort by date
      attributes: [
        ["userWorkoutId", "id"],
        ["type", "type"],
        ["duration", "duration"],
        ["calories", "calories"],
        ["date", "date"],
        //["userId", "userId"],
        ["createdAt", "createdAt"],
        ["updatedAt", "updatedAt"],
      ],
    });
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not fetch workouts" });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const userWorkoutId = parseInt(req.params.id);
    console.log("Workout ID from params:", req.params.id);

    // console.log("Decoded user:", req.user);
    const loggedInUserId = req.user.id;
    const { type, duration, calories, date } = req.body;
    const workout = await Workout.findOne({
      where: {
        userWorkoutId,
      },
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    if (workout.userId !== loggedInUserId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await workout.update({
      type: type,
      duration: duration,
      calories: calories,
      date: date,
    });
    res.json({
      id: workout.userWorkoutId,
      type: workout.type,
      duration: workout.duration,
      calories: workout.calories,
      date: workout.date,
      updatedAt: workout.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout" });
  }
};

const deleteWorkout = async (req, res) => {
  const userWorkoutId = parseInt(req.params.id);
  console.log("Decoded user:", req.user);
  const loggedInUserId = req.user.id;
  try {
    const workout = await Workout.findOne({
      where: {
        userWorkoutId,
      },
    });

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
