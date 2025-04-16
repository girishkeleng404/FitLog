const { Meal } = require("../models");
const mealService = require("../services/mealService");

exports.createMeal = async (req, res) => {
  try {
    const meal = await mealService.createMeal(req.user.id, req.body);

    res.status(201).json({ message: "Meal created successfully", meal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create meal" });
  }
};
