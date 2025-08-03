const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Add a comment to a blog post
exports.addComment = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { text } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  const comment = await Comment.create({
    text,
    blog: blogId,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// Get all comments for a blog post
exports.getComments = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;

  const comments = await Comment.find({ blog: blogId }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    success: true,
    data: comments,
  });
});

// Delete a comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const { blogId, commentId } = req.params;

  // Find the comment and verify it belongs to the specified blog
  const comment = await Comment.findOne({ _id: commentId, blog: blogId });

  if (!comment) {
    return next(
      new AppError("Comment not found or does not belong to this blog", 404)
    );
  }

  // Check if the user is the author of the comment
  if (comment.user.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to delete this comment", 403)
    );
  }

  await Comment.findByIdAndDelete(commentId);

  res.status(204).json({
    success: true,
    data: null,
  });
});
