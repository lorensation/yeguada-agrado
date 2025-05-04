/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'syfaiwgnspbngjetidej.supabase.co',
        pathname: '/storage/v1/s3/**',
      },
    ],
  },
}

export default nextConfig