const Blog = require("../models/Blog");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Create a new blog post
exports.createBlogPost = catchAsync(async (req, res, next) => {
  // Set the author from the authenticated user
  req.body.author = req.user.id;
  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    data: blog,
  });
});

// Get all blog posts
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate("author", "name email");
  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

// Get a single blog post by ID
exports.getBlogById = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "name email"
  );
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }
  res.status(200).json({
    success: true,
    data: blog,
  });
});

// Update a blog post by ID
exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to update this blog", 403)
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("author", "name email");

  res.status(200).json({
    success: true,
    data: updatedBlog,
  });
});

// Delete a blog post by ID
exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to delete this blog", 403)
    );
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).json({
    success: true,
    data: null,
  });
});
