// imports modules & dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// imports routes, middleware, and configs
const tasksRouter = require("./routes/api/tasks");
const { notFoundRoute, errorHandler } = require("./configs/errorHandler");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect Database
const connectDatabase = require("./db/connect");
connectDatabase();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS policy in your front-end
const corsOptions = {
  origin: process.env.APP_BASE_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// sets default route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Simple Task List Node.js application backend.",
  });
});

// Define Routes
app.use(process.env.APP_API_TASKS_PREFIX, tasksRouter);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

module.exports = app;
