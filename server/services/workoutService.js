const { Workout } = require("../models");

// Add Workouts
async function createWorkout(userId, data, transaction) {
  const lastWorkout = await Workout.findOne({
    where: { userId },
    order: [["userWorkoutId", "DESC"]],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  const newUserWorkoutId = lastWorkout ? lastWorkout.userWorkoutId + 1 : 1;

  return await Workout.create(
    {
      ...data,
      userId,
      userWorkoutId: newUserWorkoutId,
    },
    { transaction },
  );
}

// Get All Workouts

async function getWorkouts(userId) {
  return await Workout.findAll({
    where: { userId },
    order: [["id", "DESC"]], // optional, to sort
    attributes: [
      ["userWorkoutId", "id"],
      "type",
      "duration",
      "calories",
      "date",
      //userId"
      "createdAt",
      "updatedAt",
    ],
  });
}
//  Update
async function updateWorkout(userId, workoutId, updateData) {
  const workout = await Workout.findOne({
    where: { userWorkoutId: workoutId },
  });

  if (!workout) throw new Error("not_found");
  if (workout.userId !== userId) throw new Error("forbidden");

  await workout.update({
    type: updateData.type,
    duration: updateData.duration,
    calories: updateData.calories,
    date: updateData.date,
  });

  return workout;
}

// Delete

async function deleteWorkout(userId, workoutId) {
  const workout = await Workout.findOne({
    where: { userWorkoutId: workoutId },
  });
  if (!workout) throw new Error("not_found");
  if (workout.userId !== userId) throw new Error("forbidden");

  await workout.destroy();
}

module.exports = {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
};
