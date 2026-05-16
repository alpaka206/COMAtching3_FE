import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 384, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  webpack(config, { webpack }) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-router-dom': path.resolve(
        __dirname,
        'src/lib/react-router-dom.tsx',
      ),
    }

    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      fs: false,
      net: false,
      'supports-color': false,
      tls: false,
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(''),
      }),
    )

    return config
  },
}

export default withVanillaExtract(nextConfig)
