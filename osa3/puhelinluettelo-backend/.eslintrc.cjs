/* eslint-env node */
module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import"],
    parserOptions: {
      project: true,
      tsconfigRootDir: __dirname,
    },
    rules: {
      "import/no-unused-modules": "error",
    },
    root: true,
  };
  