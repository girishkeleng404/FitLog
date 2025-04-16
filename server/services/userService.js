const { User, Workout } = require("../models");

const getUserWithWorkouts = async (userId) => {
  return await User.findOne({
    where: { id: userId },
    attributes: ["id", "username"],
    include: {
      model: Workout,
      attributes: ["id", "type", "duration", "calories", "date"], // optional: choose fields
    },
  });
};
module.exports = {
  getUserWithWorkouts,
};
