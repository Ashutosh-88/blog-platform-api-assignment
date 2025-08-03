const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/database");

const app = express();
// Connect to MongoDB
connectDB();

//Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

// Handle undefined routes (404 errors)
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.status = 404;
  next(err);
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
