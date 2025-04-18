const path = require("path");
const express = require("express");
// const bodyParser = require("bodyParser");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const db = require("./models");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const weightRoutes = require("./routes/weightRoutes");

app.use(express.json());
// app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/workouts", workoutRoutes);

app.use("/api", userRoutes);

app.use("/api", mealRoutes);

app.use("/api", weightRoutes);

const PORT = process.env.PORT;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});
