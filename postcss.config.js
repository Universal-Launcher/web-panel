module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-calc": {},
    "tailwindcss/nesting": {},
    "tailwindcss": {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
      },
    },
    "autoprefixer": {},
  },
}
