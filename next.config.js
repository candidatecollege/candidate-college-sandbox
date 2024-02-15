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
        source: '/:slug(api|uploads)/:path*',
        destination: 'https://cors-proxy-infinityfree.vercel.app/:slug/:path*',
      },
    ];
  },
}

module.exports = nextConfig
