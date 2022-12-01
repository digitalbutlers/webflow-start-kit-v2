// Documentation: https://vitejs.dev/config/

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

import rollupConfig from './rollup.config.js';

import { MODES, DEPLOY_POSTFIX, DIRECTORIES } from './config.js';


const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), DIRECTORIES.ROOT);
const buildDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), DIRECTORIES.BUILD);


export default defineConfig(({ mode }) => {
	const isDeployMode = mode.endsWith(DEPLOY_POSTFIX);
	const isWebflowMode = mode === MODES.WEBFLOW;
	const isProductionMode = mode.includes(MODES.PRODUCTION) || isWebflowMode;

	const modeDirectory = mode.replaceAll(DEPLOY_POSTFIX, '');

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
			rollupOptions: rollupConfig({ modeDirectory, isDeployMode, isWebflowMode }),
			modulePreload: {
				polyfill: false,
			},
			target: 'esnext',
		},
		plugins: [],
		css: {
			devSourcemap: true,
		},
	};
});
