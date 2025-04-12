const userService = require("../services/userService");

const getUserWorkouts = async (req, res) => {
  try {
    const user = await userService.getUserWithWorkouts(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  getUserWorkouts,
};
