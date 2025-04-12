module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define("Workout", {
    type: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
  });
  Workout.associate = (models) => {
    Workout.belongsTo(models.User);
  };
  return Workout;
};
