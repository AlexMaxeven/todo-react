import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const base = isProd ? '/todo-react' : ''

  return {
    base: isProd ? '/todo-react/' : '/',
    plugins: [
      react(),
      {
        name: 'preview-base-and-spa',
        configurePreviewServer(server) {
          // 1) При base /todo-react/ — знімаємо префікс із запиту, щоб static знайшов файли в dist/ (і не було редіректів)
          if (base) {
            server.middlewares.use((req, res, next) => {
              const pathname = req.url?.split('?')[0] ?? ''
              if (pathname === base || pathname.startsWith(base + '/')) {
                const q = req.url?.includes('?') ? '?' + req.url.split('?')[1] : ''
                req.url = (pathname.slice(base.length) || '/') + q
              }
              next()
            })
          }
          // 2) SPA fallback: маршрути типу /tasks/:id → index.html
          server.middlewares.use((req, res, next) => {
            const path = (req.url?.split('?')[0] ?? '').replace(/\/$/, '') || '/'
            const isRoot = path === '/' || path === '/index.html'
            const isAsset = path.startsWith('/assets/')
            const hasExtension = path.includes('.') && !path.endsWith('.html')
            const isAppRoute = !isRoot && !isAsset && !hasExtension
            if (req.method === 'GET' && isAppRoute) {
              req.url = req.url?.includes('?') ? '/index.html?' + req.url.split('?')[1] : '/index.html'
            }
            next()
          })
        },

      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
