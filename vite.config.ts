import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      tsconfigPaths(),
      svgr(),
    ],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Connection', 'keep-alive');
              proxyReq.setHeader('Origin', env.VITE_API_URL);
            });
          },
        },
      },
    },
  };
});
