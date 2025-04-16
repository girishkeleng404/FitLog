const { where } = require("sequelize");
const { Meal } = require("../models");

async function createMeal(userId, mealData) {
  const lastMeal = await Meal.findOne({
    where: { userId },
    order: [["userMealId", "DESC"]],
  });
  const newUserMealId = lastMeal ? lastMeal.userMealId + 1 : 1;

  return await Meal.create({
    ...mealData,
    userId,
    userMealId: newUserMealId,
  });
}

async function getAllMeals() {}

async function updateMeal() {}

async function deleteMeal() {}

module.exports = {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
};
