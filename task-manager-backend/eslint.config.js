// eslint.config.js
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "no-console": "off",
        },
    },
];