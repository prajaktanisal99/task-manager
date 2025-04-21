import mongoose from "mongoose";

export const connectDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_CONN_STRING as string);
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Database connection failed:", error);
		process.exit(1); // Exit the process with failure
	}
};
