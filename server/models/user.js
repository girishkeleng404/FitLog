// User model (user.js)
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  // Add the association

  User.associate = (models) => {
    User.hasMany(models.Workout, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    User.hasMany(models.WeightLog, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    User.hasMany(models.Meal, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return User;
};
