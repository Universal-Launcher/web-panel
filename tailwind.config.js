const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    // add custom variant for expanding sidebar
    plugin(({ addVariant }) => {
      addVariant("sidebar-expanded", `.sidebar-expanded &`)
    }),
  ],
}
