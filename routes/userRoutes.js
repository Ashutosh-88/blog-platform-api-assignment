const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { validateUser } = require("../validators/userValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, validateUser, handleValidationErrors, updateUserProfile);

module.exports = router;
