import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"

import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-constant-binary-expression": "off",
      "no-debugger": "warn",

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "off", // async click handlers
      "@typescript-eslint/no-unsafe-assignment": "off", // useOnLinkClick()
      "@typescript-eslint/no-unsafe-call": "off", // useOnLinkClick()
      "@typescript-eslint/no-namespace": "off", // types
    },
  },
  {
    ignores: ["build/", "node_modules/", ".react-router/", "*.cjs"],
  },
)
