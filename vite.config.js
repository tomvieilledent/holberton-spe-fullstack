/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages sert le site depuis un sous-dossier (/nom-du-repo/).
// Un chemin de base relatif garantit que les assets se chargent partout
// (Pages, `vite preview`, ouverture directe du build, conteneur nginx).
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { host: "0.0.0.0", port: 3000 },
  preview: { host: "0.0.0.0", port: 4173 },
  build: { outDir: "dist", sourcemap: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/test/**"],
    },
  },
});
