import { reactRouter } from '@react-router/dev/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    reactRouter(),
    vanillaExtractPlugin(),
    tsconfigPaths()
  ],
});
