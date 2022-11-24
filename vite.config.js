import { defineConfig } from 'vite';

import path from 'path';

import rollupConfig from './rollup.config';

const isProdMode = process.env.NODE_ENV === 'production';
const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/

export default defineConfig({
  root,
  base: './',
  server: {
    port: 6866,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      {
        find: /^~]/,
        replacement: '',
      },
      {
        find: '@root',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src', 'js'),
      },
    ],
    extensions: ['.css', '.scss', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: isProdMode,
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: !isProdMode,
    rollupOptions: rollupConfig,
    polyfillModulePreload: false,
    target: 'esnext',
  },
  plugins: [],
  css: {
    devSourcemap: true,
  },
});
