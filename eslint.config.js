import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const config = tseslint.config(
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      "import/no-duplicates": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "import/no-unresolved": "off"
    }
  }
);

export default config;
