const { getUserWithWorkouts } = require("../services/userService");

const getUserWithWorkoutsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const userWithWorkouts = await getUserWithWorkouts(userId);
    res.json(userWithWorkouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserWithWorkoutsController };
