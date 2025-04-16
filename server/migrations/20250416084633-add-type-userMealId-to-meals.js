"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add `userId` as INTEGER with foreign key reference
    await queryInterface.addColumn("Meals", "userId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    // Step 2: Add `type` column as ENUM (for meal types)
    await queryInterface.addColumn("Meals", "type", {
      type: Sequelize.ENUM("breakfast", "lunch", "dinner", "snack"),
      allowNull: false,
    });

    // Step 3: Add `userMealId` column with default value of 1
    await queryInterface.addColumn("Meals", "userMealId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    // Step 4: Add unique constraint for `userId` and `userMealId`
    await queryInterface.addConstraint("Meals", {
      fields: ["userId", "userMealId"],
      type: "unique",
      name: "unique_user_meal_per_user",
    });
  },

  async down(queryInterface, Sequelize) {
    // Step 1: Remove unique constraint
    await queryInterface.removeConstraint("Meals", "unique_user_meal_per_user");

    // Step 2: Remove `userMealId` and `type` columns
    await queryInterface.removeColumn("Meals", "userMealId");
    await queryInterface.removeColumn("Meals", "type");

    // Step 3: Remove `userId` column
    await queryInterface.removeColumn("Meals", "userId");

    // Step 4: Drop ENUM type for `type` column if necessary
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Meals_type";',
    );
  },
};
