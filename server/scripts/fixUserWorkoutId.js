//const { Workout, sequelize } = require("../models");
// scripts/fixUserWorkoutId.js
const { Workout, sequelize } = require("../models");

(async () => {
  const workouts = await Workout.findAll({
    order: [["userId"], ["createdAt"]],
  });

  const userCounters = {};

  for (const workout of workouts) {
    const userId = workout.userId;

    if (!userCounters[userId]) {
      userCounters[userId] = 1;
    }

    await workout.update({ userWorkoutId: userCounters[userId] });

    userCounters[userId]++;
  }

  console.log("✅ userWorkoutId values updated!");
  process.exit();
})();
