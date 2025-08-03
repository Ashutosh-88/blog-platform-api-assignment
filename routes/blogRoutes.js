const express = require("express");
const blogController = require("../controllers/blogController");
const { validateBlog } = require("../validators/blogValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  validateBlog,
  handleValidationErrors,
  blogController.createBlogPost
);

router.get("/", blogController.getAllBlogs);

router.get("/:id", blogController.getBlogById);

router.put(
  "/:id",
  protect,
  validateBlog,
  handleValidationErrors,
  blogController.updateBlog
);

router.delete("/:id", protect, blogController.deleteBlog);

module.exports = router;
