"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Workouts", "userWorkoutId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    // Optional: Add unique constraint per user
    await queryInterface.addConstraint("Workouts", {
      fields: ["userId", "userWorkoutId"],
      type: "unique",
      name: "unique_user_workout_per_user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Workouts",
      "unique_user_workout_per_user",
    );
    await queryInterface.removeColumn("Workouts", "userWorkoutId");
  },
};
