/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,

  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
