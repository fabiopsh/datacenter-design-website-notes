import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/datacenter-design-website-notes/',
  plugins: [
    react(),
    {
      name: 'redirect-base-without-trailing-slash',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/datacenter-design-website-notes') {
            _res.writeHead(301, { Location: '/datacenter-design-website-notes/' })
            _res.end()
            return
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.md'],
})
