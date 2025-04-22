import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/index.js";
import { taskRouter } from "./routes/index.js";
import { requestLogger, configuredCORS } from "./middlewares/index.js";
import { setLogLevel } from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

setLogLevel("trace");

// CORS middleware
app.use(configuredCORS);

// Connect to the database
connectDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setLogLevel("trace");
app.use(requestLogger);

// Root routes
app.get("/", (req, res) => {
	console.log("Root route accessed");
	res.send("Welcome to the TaskBoard API.");
});

// task routes
app.use("/tasks", taskRouter);

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
