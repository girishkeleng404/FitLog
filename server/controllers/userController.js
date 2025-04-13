const { getUserWithWorkouts } = require("../services/userService");

const getUserWithWorkoutsController = async (req, res) => {
  try {
    const requestedUserId = parseInt(req.params.id);
    const loggedInUserId = req.user.id;

    if (requestedUserId !== loggedInUserId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const userWithWorkouts = await getUserWithWorkouts(requestedUserId);
    res.json(userWithWorkouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserWithWorkoutsController };
