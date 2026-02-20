import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()];
  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    } catch {
      // lovable-tagger opcional; no bloquea el build en CI/Railway
    }
  }
  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    // Optimizaciones para Railway: reducir uso de memoria durante el build
    chunkSizeWarningLimit: 1000, // Aumentar límite de advertencia para chunks grandes
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-motion": ["framer-motion"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
          ],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    cssCodeSplit: true,
    sourcemap: mode !== "production",
    // Optimización para assets grandes: no inlinar imágenes grandes
    assetsInlineLimit: 4096, // Solo inlinar assets menores a 4KB
    // Reducir uso de memoria durante el build
    minify: "esbuild", // Usar esbuild en lugar de terser (más rápido y usa menos memoria)
    // Optimizar el proceso de build para Railway
    reportCompressedSize: false, // Deshabilitar cálculo de tamaño comprimido (ahorra tiempo y memoria)
  },
  // Configuración para servir archivos de public correctamente
  publicDir: "public",
  };
});
