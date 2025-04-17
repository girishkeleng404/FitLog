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

async function getAllMeals(userId) {
  return await Meal.findAll({
    where: { userId },
    order: [["id", "DESC"]],
    attributes: [["userMealId", "id"], "type", "name", "calories", "date"],
  });
}

async function updateMeal(userId, mealId, data) {
  const meal = await Meal.findOne({
    where: {
      userMealId: mealId,
      userId: userId,
    },
  });
  if (!meal) throw new Error("not_found");

  console.log("Meal userId:", meal.userId); // Log the meal's userId
  console.log("Logged-in userId:", userId); // Log the logged-in userId
  if (meal.userId !== userId) throw new Error("forbidden");

  await meal.update({
    type: data.type,
    name: data.name,
    calories: data.calories,
    date: data.date,
  });

  return meal;
}

async function deleteMeal(userId, mealId) {
  const meal = await Meal.findOne({
    where: {
      userId,
      userMealId: mealId,
    },
  });

  if (!meal) throw new Error("not_found");
  if (meal.userId !== userId) throw new Error("forbidden");
  await meal.destroy();
}

module.exports = {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
};
