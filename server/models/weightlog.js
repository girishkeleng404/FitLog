const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const WeightLog = sequelize.define("WeightLog", {
    weight: DataTypes.FLOAT,
    date: DataTypes.DATEONLY,
  });
  WeightLog.associate = (models) => {
    WeightLog.belongsTo(models.User);
  };
  return WeightLog;
};
