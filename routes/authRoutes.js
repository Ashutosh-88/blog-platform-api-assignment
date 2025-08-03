const express = require("express");
const { register, login } = require("../controllers/authControllers");
const {
  validateRegistration,
  validateLogin,
} = require("../validators/userValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");
const { validate } = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  handleValidationErrors,
  register
);
router.post("/login", validateLogin, handleValidationErrors, login);

module.exports = router;
