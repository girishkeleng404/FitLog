// Workout model (workout.js)
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define("Workout", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },

    calories: {
      type: DataTypes.INTEGER, // Or DataTypes.FLOAT if you need decimals
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER, // Matching the type of 'id' in 'Users' table
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userWorkoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Add the association
  Workout.associate = (models) => {
    Workout.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE", // Ensures that workouts are deleted when the user is deleted
    });
  };

  return Workout;
};
