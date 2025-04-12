const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ message: "User registerd", user });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      const value = error.errors[0].value;
      return res.status(400).json({
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" is already in use.`,
      });
    }

    console.error(error); // keep full logs for debugging
    return res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
    res.json({ message: "Login succussful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error });
  }
};
