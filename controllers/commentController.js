const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Add a comment to a blog post
exports.addComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { blogId } = req.params;

  // Check if blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  // Create the comment
  const comment = await Comment.create({
    text,
    blog: blogId,
    user: req.user.id,
  });

  // Add comment to blog's comments array
  blog.comments.push(comment._id);
  await blog.save();

  // Populate user data for response
  await comment.populate("user", "username email");

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// Get all comments for a blog post
exports.getComments = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  // Check if blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// Delete a comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId, blogId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  // Check if user owns the comment
  if (comment.user.toString() !== req.user.id) {
    return next(new AppError("You can only delete your own comments", 403));
  }

  // Remove comment from blog's comments array
  await Blog.findByIdAndUpdate(blogId, {
    $pull: { comments: commentId },
  });

  // Delete the comment
  await Comment.findByIdAndDelete(commentId);

  res.status(204).json({
    success: true,
    data: null,
  });
});
