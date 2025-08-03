const { body } = require("express-validator");

const validateComment = [
  body("text")
    .notEmpty()
    .withMessage("Comment text is required")
    .isString()
    .withMessage("Comment text must be a string")
    .isLength({ min: 3, max: 500 })
    .withMessage("Comment text must be between 3 and 500 characters"),

  body("blogId")
    .notEmpty()
    .withMessage("Blog ID is required")
    .isMongoId()
    .withMessage("Invalid Blog ID format"),
];

module.exports = { validateComment };
