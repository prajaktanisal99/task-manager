import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	plugins: [
		react(),
		eslint({
			include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
			emitWarning: true,
			emitError: true,
		}),
	],
});
