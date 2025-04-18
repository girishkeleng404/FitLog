const express = require("express");
const router = express.Router();
const middleWare = require("../middleware/auth");
const weightController = require("../controllers/weightController");

router.use(middleWare);

router.post("/weight", weightController.addWeightLog);
router.put("/weight/update", weightController.updateWeight);

router.get("/weight/get", weightController.getWeight);
module.exports = router;
