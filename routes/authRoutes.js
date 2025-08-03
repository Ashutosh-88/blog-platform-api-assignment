const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../validators/userValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  handleValidationErrors,
  register
);
router.post("/login", validateLogin, handleValidationErrors, login);

module.exports = router;
