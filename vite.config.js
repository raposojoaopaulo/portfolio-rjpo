import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('react-icons')) return 'react-icons';
            if (id.includes('i18next')) return 'i18n';
            if (id.includes('framer-motion')) return 'framer';
            return 'vendor'; 
          }
        }
      }
    }
  }
});
