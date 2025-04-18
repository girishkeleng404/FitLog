const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const WeightLog = sequelize.define("WeightLog", {
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    userWeightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  WeightLog.associate = (models) => {
    WeightLog.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return WeightLog;
};
