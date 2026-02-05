/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      root: __dirname,
    },
    root: __dirname,
  },
};

module.exports = nextConfig;
