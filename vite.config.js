import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true, gzipSize: true, filename: 'dist/stats.html' })
  ],
  build: {
    // 🌟 Subimos el límite de 800 a 1850 kB únicamente para acomodar
    // vendor-mapbox-gl (~1.78MB), que ya está lazy-loaded vía MapView
    // y por lo tanto NO se descarga en la carga inicial del sitio.
    // Cualquier otro chunk que supere 1850 kB seguirá generando advertencia.
    chunkSizeWarningLimit: 1850,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Mantenemos el núcleo de React unido para evitar errores de contexto
          if (
            id.includes('node_modules/react/') || 
            id.includes('node_modules/react-dom/') || 
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'react-framework';
          }

          // 2. Separación dinámica por nombre de librería (Estrategia Detective)
          if (id.includes('node_modules')) {
            const modulesPath = id.toString().split('node_modules/')[1];
            const parts = modulesPath.split('/');

            // 🌟 Maneja paquetes con scope (ej: @mui/icons-material) para
            // que cada subpaquete tenga su propio chunk en vez de agruparse
            // todos bajo el nombre genérico del scope (@mui).
            const moduleName = parts[0].startsWith('@')
              ? `${parts[0]}/${parts[1]}`
              : parts[0];

            return `vendor-${moduleName}`;
          }
        }
      }
    }
  }
})