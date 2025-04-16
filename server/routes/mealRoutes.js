const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");
const authMiddleWare = require("../middleware/auth");

// Protect all meal routes
router.use(authMiddleWare);

router.post("/meals", mealController.createMeal);

module.exports = router;
