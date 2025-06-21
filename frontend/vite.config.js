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
      "@navigator": "/src/components/Navigator",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@data" : "/src/assets/data", 
      "@api": "/src/api",
      "data": "/src/assets/data",
    }
  },
  server:{
    port: 9999,
    open: true
  },
  preview:{
    port: 1111,
    open: true
  }
});