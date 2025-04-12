"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Workouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },

      calories: {
        type: Sequelize.INTEGER, // Or Sequelize.FLOAT if you need decimal values
        allowNull: true, // Make it nullable if you don't always have a value
      },
      date: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER, // Matching the type of 'id' in 'Users' table
        allowNull: false,
        references: {
          model: "Users", // Referring to the 'Users' table
          key: "id", // Referring to the 'id' column in 'Users'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Workouts");
  },
};
