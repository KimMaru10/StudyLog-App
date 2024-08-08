import { createRequire } from "module";
const require = createRequire(import.meta.url);
const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default removeImports({
  ...nextConfig,
});
