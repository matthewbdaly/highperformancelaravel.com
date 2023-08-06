// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    mdxRs: false,
    typedRoutes: true
  }
}

module.exports = nextConfig
