import { Router } from "express";
import { getTasks, createTask, deleteTask, updateTask } from "../controllers/index.js";

export const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", createTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.put("/:id", updateTask);
