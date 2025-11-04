import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false, // Tắt để tránh double render với Leaflet MapContainer
}

const withMDX = createMDX({
  // MDX options
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
