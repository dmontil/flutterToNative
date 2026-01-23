/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Ignora errores de TypeScript durante la compilación
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
  // Especificar la raíz del proyecto para resolver problemas con lockfiles
  experimental: {
    turbo: {
      resolveAlias: {
        root: __dirname,
      },
    },
  },
};

module.exports = nextConfig;
