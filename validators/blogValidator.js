const { body } = require("express-validator");

const blogValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be min 3 and must not exceed 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 3, max: 1000 })
    .withMessage(
      "Description must be min 3 and must not exceed 1000 characters"
    ),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings")
    .custom((value) => {
      value.forEach((tag) => {
        if (typeof tag !== "string") {
          throw new Error("Each tag must be a string");
        }
      });
      return true;
    }),

  body("comments")
    .optional()
    .isArray()
    .withMessage("Comments must be an array of comment objects"),
];

module.exports = blogValidator;
