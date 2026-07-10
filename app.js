const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const authRoutes = require("./routes/auth-routes");
const taskRoutes = require("./routes/task_routes");
const { notFound, errorHandler } = require("./middleware/error-middleware-handler");

const app = express();

// security headers
app.use(helmet());

// body limit
app.use(express.json({ limit: "10kb" }));

// sanitize against NoSQL injection
app.use(mongoSanitize());

// general rate limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, try again later" },
});
app.use(generalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// error handling — always last
app.use(notFound);
app.use(errorHandler);

module.exports = app;