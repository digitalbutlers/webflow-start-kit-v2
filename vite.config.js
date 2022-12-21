/* eslint-disable import/no-extraneous-dependencies */

// Documentation: https://vitejs.dev/config/

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

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
		server: {
			// not used rn, but may be needed in the future
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
			assetsDir: `${DIRECTORIES.ASSETS}/${DIRECTORIES.SCRIPTS}`,
			minify: isProductionMode,
			outDir: `${buildDirectory}/${modeDirectory}`,
			sourcemap: !isProductionMode,
			rollupOptions: rollupConfig({ modeDirectory, isDeployMode, isWebflowMode }),
			assetsInlineLimit: 0,
			modulePreload: {
				polyfill: false,
			},
			target: 'esnext',
		},
		plugins: [
			eslint({
				fix: true,
				failOnError: true,
				failOnWarning: isProductionMode,
			}),
		],
		css: {
			devSourcemap: true,
		},
	};
});
