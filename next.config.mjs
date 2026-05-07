import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
