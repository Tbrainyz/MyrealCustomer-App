import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // In development, all /api calls are forwarded to the backend.
      // In production, set VITE_API_URL in your .env to point at your deployed backend.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
