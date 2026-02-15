import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Bu kısım sadece 'npm run dev' dediğinde (lokalde) çalışır
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  // Build aşamasında env değişkenlerinin doğru işlenmesi için ek güvenlik:
  define: {
    'process.env': {}
  }
});