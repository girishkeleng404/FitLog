const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = (models) => {
    User.hasMany(models.Meal);
    User.hasMany(models.Workout);
    User.hasMany(models.WeightLog);
  };
  return User;
};
