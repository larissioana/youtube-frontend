import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    compression({
      // Configure Gzip compression
      verbose: true,
      disable: false,
      threshold: 10240, // Compress files larger than 10kb
      algorithm: 'gzip',
      deleteOriginFile: false,
    }),
    compression({
      // Configure Brotli compression
      verbose: true,
      disable: false,
      threshold: 10240, // Compress files larger than 10kb
      algorithm: 'brotliCompress',
      deleteOriginFile: false,
    }),
  ],
  build: {
    minify: 'esbuild',
  },
})
