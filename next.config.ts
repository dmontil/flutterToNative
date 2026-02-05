/** @type {import('next').NextConfig} */
const nextConfig = {
  // Especificar la raíz del proyecto para resolver problemas con lockfiles
  turbopack: {
    resolveAlias: {
      root: __dirname,
    },
    root: __dirname,
  },
};

module.exports = nextConfig;
