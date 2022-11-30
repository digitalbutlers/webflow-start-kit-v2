// Documentation: https://vitejs.dev/config/

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

import rollupConfig from './rollup.config.js';


const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src');
const buildDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');


export default defineConfig(({ mode }) => {
	const isProductionMode = mode.includes('production');
	const isDeployMode = mode.includes('deploy');
	const modeDirectory = mode.replaceAll('-deploy', '');

	return {
		root: rootDirectory,
		base: './',
		server: { // not used rn, but may be needed in the future
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
			outDir: `${buildDirectory}/${modeDirectory}`,
			sourcemap: !isProductionMode,
			rollupOptions: rollupConfig({ modeDirectory, isDeployMode }),
			polyfillModulePreload: false,
			target: 'esnext',
		},
		plugins: [],
		css: {
			devSourcemap: true,
		},
	};
});
