/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "react-google-recaptcha",
      "react-async-script",
      "prop-types",
    ],
  },
};

module.exports = nextConfig;
