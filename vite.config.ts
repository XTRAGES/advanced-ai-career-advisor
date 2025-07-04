import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Add this line to ensure correct relative paths for deployment
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
