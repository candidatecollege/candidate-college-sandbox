/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['resource.candidatecollegeind.com', 'i.postimg.cc'],
    unoptimized: true,
  },
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cors-proxy-infinityfree.vercel.app/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
