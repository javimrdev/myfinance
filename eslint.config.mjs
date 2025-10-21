import unusedImports from "eslint-plugin-unused-imports";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "build",
      "out",
      "coverage",
      "public",
    ],
  },
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next",
      "next/core-web-vitals",
      "next/typescript",
    ],
  }),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
