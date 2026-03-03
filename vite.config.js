import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@utils": path.resolve(dirname, "./src/utils"),
      "@components": path.resolve(dirname, "./src/components"),
      "@hooks": path.resolve(dirname, "./src/hooks"),
    },
  },
});
