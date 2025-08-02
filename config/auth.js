const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d";

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
