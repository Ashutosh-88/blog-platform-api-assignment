const User = require("../models/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({ username, email, password });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Remove password from the response
  newUser.password = undefined;

  res.status(201).json({
    success: true,

    token,
    data: {
      user: newUser,
    },
  });
});

// Login a user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Remove password from the response
  user.password = undefined;

  res.status(200).json({
    success: true,
    token,
    data: {
      user,
    },
  });
});
