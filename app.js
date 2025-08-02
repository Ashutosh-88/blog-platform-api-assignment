const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/database");

const app = express();
// Connect to MongoDB
connectDB();

//Middleware to parse JSON bodies
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/users", userRoutes);

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
