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

exports.getMeals = async (req, res) => {
  try {
    const meals = await mealService.getAllMeals(req.user.id);
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update meal" });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const updated = await mealService.updateMeal(
      req.user.id,
      parseInt(req.params.id),
      req.body,
    );
    res.status(200).json({
      id: updated.userMealID,
      type: updated.type,
      name: updated.name,
      calories: updated.calories,
      date: updated.date,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update meal" });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    await mealService.deleteMeal(req.user.id, parseInt(req.params.id));
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {}
};
