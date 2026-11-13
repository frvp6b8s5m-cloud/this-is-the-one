import type { NextConfig } from "next";

// GitHub Pages serves this project from /this-is-the-one (rather than a domain root).
// Keep local development and other hosts at the root path.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  ...(isGitHubPages ? { basePath: "/this-is-the-one" } : {}),
};

export default nextConfig;
