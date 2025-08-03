const express = require("express");
const blogController = require("../controllers/blogController");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const { validateBlog } = require("../validators/blogValidator");
const { validateComment } = require("../validators/commentValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Blog routes
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

// Comment routes - nested under blogs
router.get("/:blogId/comments", getComments);

router.post(
  "/:blogId/comments",
  protect,
  validateComment,
  handleValidationErrors,
  addComment
);

router.delete("/:blogId/comments/:commentId", protect, deleteComment);

module.exports = router;
