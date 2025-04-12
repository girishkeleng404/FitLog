const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define("Meal", {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    data: DataTypes.DATEONLY,
  });
  Meal.associate = (models) => {
    Meal.belongsTo(models.User);
  };
  return Meal;
};
