import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // El HTML de cada ruta lo escribe scripts/prerender.mjs a partir de esta
    // plantilla, así que el build de cliente no debe vaciar dist en la segunda
    // pasada. Se limpia una sola vez, al inicio del pipeline.
    emptyOutDir: true,
    // Los mapas de origen no aportan en producción y pesan; el robots.txt ya
    // los bloquea por si acaso, pero mejor no publicarlos.
    sourcemap: false,
    rollupOptions: {
      output: {
        // Separar las dependencias del contenido hace que un cambio de copy no
        // invalide la caché de React ni la de framer-motion, que son la mayor
        // parte del peso y casi nunca cambian.
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            if (id.includes('/src/content/')) return 'content'
            return undefined
          }
          if (id.includes('framer-motion') || id.includes('popmotion') || id.includes('style-value-types')) return 'motion'
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) return 'react'
          return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  ssr: {
    // framer-motion y lenis se compilan dentro del bundle de SSR en vez de
    // resolverse como externos: así Vite les aplica las mismas condiciones de
    // exportación y no se rompe el render en Node.
    noExternal: ['framer-motion', 'lenis'],
  },
})
