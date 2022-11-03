const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

const colors = {
  "dark-blue": "#171C44",
  "light-blue": "#6DBCDB",
  "light-red": "#FC4349",
  "light-gray": "#D6DADB",
  "title-black": "#2E2E2E",
  "text-black": "#343434",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        "spread-shadow": `4px 4px 25px -4px ${colors["light-gray"]}`,
        "mild-shadow": `2px 4px 15px ${colors["light-gray"] + "61"}`,
      },
    },
  },
  plugins: [],
};
