"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("WeightLogs", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("WeightLogs", "userWeightId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });

    await queryInterface.addConstraint("WeightLogs", {
      fields: ["userId", "userWeightId"],
      type: "unique",
      name: "unique_user_weight_per_user",
    });

    await queryInterface.addColumn("WeightLogs", "note", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("WeightLogs", "date", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("WeightLogs", "date", {
      type: Sequelize.DATE,
      defaultValue: null,
    });

    await queryInterface.removeConstraint(
      "WeightLogs",
      "unique_user_weight_per_user",
    );
    await queryInterface.removeColumn("WeightLogs", "note");

    await queryInterface.removeColumn("WeightLogs", "userWeightId");

    await queryInterface.removeColumn("WeightLogs", "userId");
  },
};
