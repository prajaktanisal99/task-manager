import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/index.ts";
import { taskRouter } from "./routes/index.ts";
import { requestLogger, allowCors } from "./middlewares/index.ts";
import { setLogLevel } from "./utils/logger.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

setLogLevel("trace");

// Connect to the database
connectDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setLogLevel("trace");
app.use(requestLogger);
app.use(allowCors);

// Root routes
// url : /
app.get("/", (req, res) => {
	console.log("Root route accessed");
	res.send("Welcome to the TaskBoard API.");
});

// task routes
// GET/tasks -> get all tasks
// POST/tasks -> create a new task
// POST/tasks/:id -> update task by id
// DELETE/tasks/:id -> delete task by id
app.use("/tasks", taskRouter);

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
