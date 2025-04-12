"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "username", {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "username", {
      type: Sequelize.STRING,
      unique: false,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      unique: false,
    });
  },
};
