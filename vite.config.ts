import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://3.38.3.226:8080',
        changeOrigin: true,
      },
    },
  },
});
