const { URL } = require("url")
const { i18n } = require("./next-i18next.config")
const { webpackConfig } = require("./webpack-next.config")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  trailingSlash: true,
  webpack: webpackConfig,
}

module.exports = nextConfig
