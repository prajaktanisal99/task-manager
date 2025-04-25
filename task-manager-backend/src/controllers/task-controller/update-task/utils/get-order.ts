import { Task } from "src/models/task-model.js";
import { ORDER_INCREMENT } from "../../../../constants/index.js";

export const getOrder = async (order: number, prevTaskId?: string, nextTaskId?: string): Promise<number> => {
	let newOrder: number;
	if (!prevTaskId && !nextTaskId) {
		// No reordering needed
		newOrder = ORDER_INCREMENT;
	} else if (!prevTaskId) {
		// Moving to start
		const nextTask = await Task.findById(nextTaskId);
		newOrder = nextTask?.order ? nextTask.order / 2 : ORDER_INCREMENT;
	} else if (!nextTaskId) {
		// Moving to end
		const prevTask = await Task.findById(prevTaskId);
		newOrder = prevTask?.order ? prevTask.order + ORDER_INCREMENT : ORDER_INCREMENT;
	} else {
		// Moving between tasks
		const [prevTask, nextTask] = await Promise.all([Task.findById(prevTaskId), Task.findById(nextTaskId)]);

		if (prevTask && nextTask) {
			newOrder = prevTask.order + (nextTask.order - prevTask.order) / 2;
		} else {
			newOrder = ORDER_INCREMENT;
		}
	}
	return newOrder;
};
