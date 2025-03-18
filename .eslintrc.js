module.exports = {
  extends: ["airbnb", "airbnb-typescript", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
  },
};
