import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://integrate.api.nvidia.com/v1/chat/completions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
});