import path from 'node:path'
import fs from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://oryzons.com').replace(/\/$/, '')

  function seoStaticFilesPlugin(): import('vite').Plugin {
    return {
      name: 'oryzons-seo-static',
      closeBundle() {
        const outDir = path.resolve(process.cwd(), 'dist')
        if (!fs.existsSync(outDir)) return

        const publicPaths = ['/', '/a-propos', '/services', '/FAQ', '/plan-du-site', '/cgu', '/cgv'] as const
        const urlEntries = publicPaths
          .map(p => {
            const loc = p === '/' ? `${siteUrl}/` : `${siteUrl}${p}`
            const priority = p === '/' ? '1.0' : '0.85'
            return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
          })
          .join('\n')

        fs.writeFileSync(
          path.join(outDir, 'robots.txt'),
          [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${siteUrl}/sitemap.xml`, ``].join('\n'),
        )
        fs.writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          [
            `<?xml version="1.0" encoding="UTF-8"?>`,
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
            urlEntries,
            `</urlset>`,
            ``,
          ].join('\n'),
        )
      },
    }
  }

  return {
    plugins: [react(), tailwindcss(), seoStaticFilesPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion-vendor': ['motion/react'],
          },
        },
      },
      chunkSizeWarningLimit: 400,
    },
  }
})
