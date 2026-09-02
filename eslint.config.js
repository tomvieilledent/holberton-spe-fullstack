import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

const vitestGlobals = {
  describe: "readonly",
  it: "readonly",
  test: "readonly",
  expect: "readonly",
  vi: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
};

export default [
  { ignores: ["dist/**", "coverage/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ["error", "always"],
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
  {
    files: ["**/*.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["**/*.{test,spec}.{js,jsx}", "src/test/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...vitestGlobals },
    },
  },
];
