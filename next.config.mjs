/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: true
    },
    images: {
      domains: ['example.com', 'image.tmdb.org'],
      unoptimized: process.env.NODE_ENV === 'development',
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
          },
        },
      });
      return config;
    },
    transpilePackages: ['framer-motion'],
  };
  
  export default nextConfig;