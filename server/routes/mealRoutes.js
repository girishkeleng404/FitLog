const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");
const authMiddleWare = require("../middleware/auth");

// Protect all meal routes
router.use(authMiddleWare);

router.post("/meals", mealController.createMeal);
router.get("/meals", mealController.getMeals);
router.put("/meals/:id", mealController.updateMeal);
// router.delete('/meals/:id', mealController.deleteMeal);

module.exports = router;
