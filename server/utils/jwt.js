const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: user.id, username: user.username }, // payload
  process.env.JWT_SECRET,
  { expiresIn: "1h" },
);
