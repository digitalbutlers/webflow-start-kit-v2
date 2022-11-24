// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

import rollupConfig from './rollup.config.js';


const isProductionMode = process.env.NODE_ENV === 'production';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src');
const buildDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');

// https://vitejs.dev/config/

export default defineConfig({
	root: rootDirectory,
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
				replacement: rootDirectory,
			},
		],
		extensions: ['.css', '.scss', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
	},
	build: {
		emptyOutDir: true,
		assetsDir: 'assets',
		minify: isProductionMode,
		outDir: buildDirectory,
		sourcemap: !isProductionMode,
		rollupOptions: rollupConfig,
		polyfillModulePreload: false,
		target: 'esnext',
	},
	plugins: [],
	css: {
		devSourcemap: true,
	},
});
