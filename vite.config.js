import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The 3D libraries live in their own chunk and are only downloaded when the
// (lazy-loaded) hero scene is needed, so the rest of the page loads fast.
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    // Don't preload the heavy 3D chunk on first paint
    modulePreload: {
      resolveDependencies: (_file, deps) => deps.filter((d) => !d.includes('three')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep Vite's tiny preload helper out of the heavy 3D chunk
          if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers')) return 'react'
          if (!id.includes('node_modules')) return
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run)\//.test(id)) return 'react'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (/node_modules\/(three|@react-three|three-stdlib|three-mesh-bvh|meshline|maath|suspend-react|zustand|its-fine|react-reconciler|its-fine|camera-controls|detect-gpu|stats\.js|tunnel-rat|hls\.js|troika|bidi-js|webgl-sdf-generator|potpack|@mediapipe)/.test(id)) return 'three'
        },
      },
    },
  },
})
