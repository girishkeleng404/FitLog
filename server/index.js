const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const db = require("./models");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});
