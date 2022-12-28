import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path, { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { DIRECTORIES, FILE_EXTENSIONS, FILE_NAMES } from './config.js';

import { deploy } from './deployment.config.js';

const GLOBAL_SCRIPT_PATH = resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	DIRECTORIES.ROOT,
	`${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`
);

const WEBFLOW_SCRIPT_PATH = resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	DIRECTORIES.ROOT,
	DIRECTORIES.WEBFLOW,
	`${FILE_NAMES.WEBFLOW}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`
);

const generateInput = ({ isWebflowMode }) => {
	if (isWebflowMode) {
		return {
			[FILE_NAMES.WEBFLOW]: WEBFLOW_SCRIPT_PATH,
		};
	}

	const componentsPath = resolve(DIRECTORIES.ROOT, DIRECTORIES.COMPONENTS);
	const componentsDirectories = readdirSync(componentsPath);

	const input = {
		[FILE_NAMES.GLOBAL]: GLOBAL_SCRIPT_PATH,
	};

	componentsDirectories.forEach((componentDirectory) => {
		input[componentDirectory] = resolve(
			path.dirname(fileURLToPath(import.meta.url)),
			componentsPath,
			componentDirectory,
			`${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`
		);
	});

	return input;
};

const generateEntryFileNames = ({ facadeModuleId }) => {
	const isWebflowScript = facadeModuleId === WEBFLOW_SCRIPT_PATH.replaceAll('\\', '/');
	if (isWebflowScript) {
		return `${FILE_NAMES.WEBFLOW}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`;
	}

	const isMainScript = facadeModuleId === GLOBAL_SCRIPT_PATH.replaceAll('\\', '/');
	if (isMainScript) {
		return `${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`;
	}

	return `${DIRECTORIES.COMPONENTS}/[name]/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`;
};

const generateAssetFileNames = ({ name }) => {
	const isMainStyle = name === `${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.STYLES}`;

	if (isMainStyle) {
		return name;
	}

	if (/\.(css)$/i.test(name ?? '')) {
		return `${DIRECTORIES.ASSETS}/${DIRECTORIES.STYLES}/[name].[extname]`;
	}

	if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name ?? '')) {
		return `${DIRECTORIES.ASSETS}/${DIRECTORIES.IMAGES}/[name][extname]`;
	}

	if (/\.(woff(2)?|ttf|eot)$/i.test(name ?? '')) {
		return `${DIRECTORIES.ASSETS}/${DIRECTORIES.FONTS}/[name][extname]`;
	}

	const extension = name.split('.').at(-1);

	return `${DIRECTORIES.ASSETS}/${extension}/[name][extname]`;
};

const rollupConfig = ({ modeDirectory, isDeployMode, isWebflowMode }) => ({
	input: generateInput({ isWebflowMode }),
	output: {
		format: 'es',
		entryFileNames: generateEntryFileNames,
		assetFileNames: generateAssetFileNames,
	},
	plugins: [
		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
		}),
		{
			name: 'db-ftp-deploy-plugin',
			writeBundle(options, bundle) {
				if (!isDeployMode) return;

				const files = Object.keys(bundle);

				deploy(modeDirectory, files);
			},
		},
	],
});

export default rollupConfig;
