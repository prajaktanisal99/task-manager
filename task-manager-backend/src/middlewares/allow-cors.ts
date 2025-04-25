import cors from "cors";
import type { CorsOptions } from "cors";

const allowedOriginsDev = ["http://localhost:5173"];
const allowedOriginsProd = ["https://task-manager-frontend-0prx.onrender.com"];

const allowedOrigins = process.env.NODE_ENV === "production" ? allowedOriginsProd : allowedOriginsDev;

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) {
			return callback(null, true);
		}

		if (allowedOrigins.indexOf(origin) === -1) {
			const message = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
			return callback(new Error(message), true);
		}

		return callback(null, true);
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

export const configuredCORS = cors(corsOptions);
