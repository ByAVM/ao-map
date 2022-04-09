module.exports = {
  root: true,
  env: {
    "vue/setup-compiler-macros": true,
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "vue/require-default-prop": "off",
  },
};
