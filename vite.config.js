import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@styles": "/src/assets/styles",
      "@images": "/public/images",
      "@components": "/src/components",
      "@pages": "/src/pages",
    }
  },
  server:{
    port: 9999,
    open: true
  },
  preview:{
    port: 8080,
    open: true
  }
});