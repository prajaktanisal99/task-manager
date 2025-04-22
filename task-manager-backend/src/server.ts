import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/index.ts";
import { taskRouter } from "./routes/index.ts";
import { requestLogger, configuredCORS } from "./middlewares/index.ts";
import { setLogLevel } from "./utils/logger.ts";

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
