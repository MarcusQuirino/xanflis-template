/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    "^(react|next?/?([a-zA-Z/]*))$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
};

export default config;
